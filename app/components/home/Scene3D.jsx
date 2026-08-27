'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// --- Grass texture (unchanged from before) ---
function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function useBowlsGreenTexture() {
  return useMemo(() => {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#2c6b33';
    ctx.fillRect(0, 0, size, size);

    const rinkCount = 6;
    const rinkWidth = size / rinkCount;
    for (let i = 0; i < rinkCount; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.045)';
      ctx.fillRect(i * rinkWidth, 0, rinkWidth, size);
    }

    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 16;
    for (let r = 50; r < size * 0.75; r += 46) {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    const imgData = ctx.getImageData(0, 0, size, size);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const px = (i / 4) % size;
      const py = Math.floor(i / 4 / size);
      const n = (hash(px, py) - 0.5) * 16;
      imgData.data[i] += n;
      imgData.data[i + 1] += n;
      imgData.data[i + 2] += n;
    }
    ctx.putImageData(imgData, 0, 0);

    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 3;
    for (let i = 1; i < rinkCount; i++) {
      ctx.beginPath();
      ctx.moveTo(i * rinkWidth, 0);
      ctx.lineTo(i * rinkWidth, size);
      ctx.stroke();
    }

    const ditch = size * 0.035;
    ctx.fillStyle = '#5a4632';
    ctx.fillRect(0, 0, size, ditch);
    ctx.fillRect(0, size - ditch, size, ditch);
    ctx.fillRect(0, 0, ditch, size);
    ctx.fillRect(size - ditch, 0, ditch, size);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.strokeRect(ditch, ditch, size - ditch * 2, size - ditch * 2);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 8;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function GrassGround() {
  const grassTexture = useBowlsGreenTexture();
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.51, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial map={grassTexture} roughness={0.92} metalness={0} />
    </mesh>
  );
}

// --- Ball roster: original burgundy ball + 4 more, each a distinct color ---
const BALL_RADIUS = 0.55;
const BALL_COLORS = [
  { body: '#8a2332', ring: '#FFD93D' }, // burgundy — original
  { body: '#122a52', ring: '#FFD93D' }, // navy
  { body: '#1b4d3e', ring: '#FFD93D' }, // forest green
  { body: '#4a2545', ring: '#FFD93D' }, // plum
  { body: '#2b2b2b', ring: '#FFD93D' }, // charcoal
];
// const INITIAL_POSITIONS = [
//   [0, 0, 1.5],
//   [-2.4, 0, -1.2],
//   [2.2, 0, 0.4],
//   [-1.3, 0, 3.0],
//   [1.8, 0, -3.2],
// ];
const INITIAL_POSITIONS = [
  [0, 0, 1.5],     // near, center — original
  [-2.8, 0, -5.5], // far back, left — top section
  [2.4, 0, -6.5],  // far back, right — top section
  [-1.3, 0, -2.0], // mid
  [1.8, 0, 3.6],   // near, right
];

// --- Glow that follows whichever ball is currently active (or the first ball at rest) ---
function InviteGlow({ ballRef, activeIndexRef, isDragging }) {
  const glowRef = useRef();
  const pulse = useRef(0);
  const smoothed = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (!glowRef.current) return;
    const idx = activeIndexRef.current;
    const mesh = idx !== null ? ballRef.current[idx] : ballRef.current[0];
    if (!mesh) return;

    const target = new THREE.Vector3(mesh.position.x, -0.49, mesh.position.z);
    smoothed.current.lerp(target, idx !== null ? 1 : 0.05);
    glowRef.current.position.copy(smoothed.current);

    const ballScale = mesh.scale.x;
    pulse.current += delta;
    const base = (isDragging ? 1.6 : 1.15 + Math.sin(pulse.current * 2) * 0.15) * ballScale;
    glowRef.current.scale.set(base, base, base);
    glowRef.current.material.opacity = isDragging ? 0.55 : 0.22 + Math.sin(pulse.current * 2) * 0.06;
  });

  return (
    <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.9, 32]} />
      <meshBasicMaterial color="#ffe27a" transparent opacity={0.3} depthWrite={false} />
    </mesh>
  );
}

// --- Manages all balls: movement, bounds, depth-scale, collisions, and drag input ---
function BallsField({ bounds, onDragChange, ballRef, activeIndexRef }) {
  const { gl } = useThree();
  const velocities = useRef(INITIAL_POSITIONS.map(() => new THREE.Vector3()));
  const activePointerIdRef = useRef(null);
  const dragStartRef = useRef(null);

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const MIN_SCALE = 0.4;
  const MAX_SCALE = 1.25;
  const GRAB_RADIUS = 1.1;
  const RESTITUTION = 0.7; // 1 = perfectly bouncy, 0 = balls stop dead on impact

    const releaseActiveBall = () => {
    const idx = activeIndexRef.current;
    if (idx === null) return;
    activeIndexRef.current = null;
    activePointerIdRef.current = null;
    dragStartRef.current = null;
    onDragChange?.(false);
  };

  useEffect(() => {
    // Listens on the whole window, not just the canvas — catches pointerup/cancel
    // events that fire outside the canvas bounds (e.g. finger drags off-screen)
    window.addEventListener('pointerup', releaseActiveBall);
    window.addEventListener('pointercancel', releaseActiveBall);
    return () => {
      window.removeEventListener('pointerup', releaseActiveBall);
      window.removeEventListener('pointercancel', releaseActiveBall);
    };
  }, []);

  useFrame((state, delta) => {
    const balls = ballRef.current;
    const vels = velocities.current;
    const FRICTION_PER_SECOND = 0.985;


    // Move, apply friction, clamp to field bounds — skip the ball currently being dragged
    balls.forEach((mesh, i) => {
      if (!mesh || activeIndexRef.current === i) return;


    //   vels[i].multiplyScalar(0.985);
    vels[i].multiplyScalar(Math.pow(FRICTION_PER_SECOND, delta * 60));
      mesh.position.x += vels[i].x * delta;
      mesh.position.z += vels[i].z * delta;

      const r = BALL_RADIUS;
      mesh.rotation.x += (vels[i].z / r) * delta;
      mesh.rotation.z -= (vels[i].x / r) * delta;

      mesh.position.x = clamp(mesh.position.x, bounds.xMin, bounds.xMax);
      mesh.position.z = clamp(mesh.position.z, bounds.zMin, bounds.zMax);
      if (mesh.position.x === bounds.xMin || mesh.position.x === bounds.xMax) vels[i].x *= -0.5;
      if (mesh.position.z === bounds.zMin || mesh.position.z === bounds.zMax) vels[i].z *= -0.5;
    });

    // Depth-based scale — every ball, including the dragged one
    balls.forEach((mesh) => {
      if (!mesh) return;
      const t = (mesh.position.z - bounds.zMin) / (bounds.zMax - bounds.zMin);
      const scale = THREE.MathUtils.lerp(MIN_SCALE, MAX_SCALE, THREE.MathUtils.clamp(t, 0, 1));
      mesh.scale.setScalar(scale);
    });

    // Pairwise collision — cheap at 5 balls (10 pairs/frame)
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i];
        const b = balls[j];
        if (!a || !b) continue;

        const dx = b.position.x - a.position.x;
        const dz = b.position.z - a.position.z;
        const dist = Math.hypot(dx, dz);
        const minDist = BALL_RADIUS * a.scale.x + BALL_RADIUS * b.scale.x;

        if (dist > 0 && dist < minDist) {
          const nx = dx / dist;
          const nz = dz / dist;
          const overlap = minDist - dist;
          const aFixed = activeIndexRef.current === i;
          const bFixed = activeIndexRef.current === j;

          // Push apart along the collision normal — never displace the ball the user is dragging
          if (!aFixed) {
            a.position.x -= nx * overlap * (bFixed ? 1 : 0.5);
            a.position.z -= nz * overlap * (bFixed ? 1 : 0.5);
          }
          if (!bFixed) {
            b.position.x += nx * overlap * (aFixed ? 1 : 0.5);
            b.position.z += nz * overlap * (aFixed ? 1 : 0.5);
          }

          // Elastic bounce — equal-mass 2D collision response
          const va = vels[i];
          const vb = vels[j];
          const relVelAlongNormal = (vb.x - va.x) * nx + (vb.z - va.z) * nz;

          if (relVelAlongNormal < 0) {
            const impulse = (-(1 + RESTITUTION) * relVelAlongNormal) / 2;
            if (!aFixed) { va.x -= impulse * nx; va.z -= impulse * nz; }
            if (!bFixed) { vb.x += impulse * nx; vb.z += impulse * nz; }
          }
        }
      }
    }
  });

  const findNearestBall = (point) => {
    let nearestIdx = null;
    let nearestDist = Infinity;
    ballRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const dist = Math.hypot(point.x - mesh.position.x, point.z - mesh.position.z);
      if (dist < nearestDist) { nearestDist = dist; nearestIdx = i; }
    });
    return { nearestIdx, nearestDist };
  };

  const handlePointerMove = (e) => {
    const idx = activeIndexRef.current;
    if (idx === null || e.pointerId !== activePointerIdRef.current) return;
    const mesh = ballRef.current[idx];
    if (!mesh) return;
    mesh.position.x = clamp(e.point.x, bounds.xMin, bounds.xMax);
    mesh.position.z = clamp(e.point.z, bounds.zMin, bounds.zMax);
  };

//   const handlePointerDown = (e) => {
//     if (activeIndexRef.current !== null) return;
//     const { nearestIdx, nearestDist } = findNearestBall(e.point);
//     if (nearestIdx === null || nearestDist > GRAB_RADIUS) return;

//     activeIndexRef.current = nearestIdx;
//     activePointerIdRef.current = e.pointerId;
//     dragStartRef.current = { x: e.point.x, z: e.point.z, time: performance.now() };
//     velocities.current[nearestIdx].set(0, 0, 0);
//     onDragChange?.(true);
//     e.target?.setPointerCapture?.(e.pointerId);
//   };

 const handlePointerDown = (e) => {
    if (activeIndexRef.current !== null) return;
    const { nearestIdx, nearestDist } = findNearestBall(e.point);
    if (nearestIdx === null || nearestDist > GRAB_RADIUS) return;

    activeIndexRef.current = nearestIdx;
    activePointerIdRef.current = e.pointerId;
    dragStartRef.current = { x: e.point.x, z: e.point.z, time: performance.now() };
    velocities.current[nearestIdx].set(0, 0, 0);
    onDragChange?.(true);

    // Capture on the REAL canvas DOM element, not e.target
    gl.domElement.setPointerCapture?.(e.pointerId);
  };

  const handlePointerUp = (e) => {
    if (e.pointerId !== undefined && e.pointerId !== activePointerIdRef.current) return;
    const idx = activeIndexRef.current;

    if (idx !== null && dragStartRef.current) {
      const dt = Math.max((performance.now() - dragStartRef.current.time) / 1000, 0.05);
      const dx = e.point.x - dragStartRef.current.x;
      const dz = e.point.z - dragStartRef.current.z;
      const dist = Math.hypot(dx, dz);
      if (dist > 0.01) {
        const speed = Math.min(9, dist / dt);
        velocities.current[idx].set((dx / dist) * speed, 0, (dz / dist) * speed);
      }
    }

    activeIndexRef.current = null;
    activePointerIdRef.current = null;
    dragStartRef.current = null;
    onDragChange?.(false);
  };

  return (
    <>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerOut={handlePointerUp}
      >
        <planeGeometry args={[26, 26]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {INITIAL_POSITIONS.map((pos, i) => (
        <mesh key={i} ref={(el) => (ballRef.current[i] = el)} position={pos} castShadow>
          <sphereGeometry args={[BALL_RADIUS, 48, 48]} />
          <meshPhysicalMaterial
            color={BALL_COLORS[i].body}
            roughness={0.2}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.08}
            envMapIntensity={1.8}
          />
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, BALL_RADIUS - 0.02]}>
            <ringGeometry args={[0.1, 0.24, 32]} />
            <meshStandardMaterial color={BALL_COLORS[i].ring} side={THREE.DoubleSide} roughness={0.3} />
          </mesh>
        </mesh>
      ))}
    </>
  );
}

// --- Camera dollies in and reframes toward whichever ball is being played ---
function CameraRig({ activeIndexRef, ballRef }) {
  const { camera } = useThree();
  const defaultPos = useMemo(() => new THREE.Vector3(0, 7.5, 9.5), []);
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const idx = activeIndexRef.current;
    const mesh = idx !== null ? ballRef.current[idx] : null;

    let targetPos = defaultPos;
    let targetLook = new THREE.Vector3(0, 0, 0);

    if (mesh) {
      targetPos = new THREE.Vector3(
        THREE.MathUtils.clamp(mesh.position.x * 0.3, -2, 2),
        6.0,
        7.2
      );
      targetLook = new THREE.Vector3(mesh.position.x, 0, mesh.position.z);
    }

    camera.position.lerp(targetPos, 0.06);
    lookTarget.current.lerp(targetLook, 0.06);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

// export default function Scene3D({ onDragChange, dragging }) {
//   const bounds = { xMin: -4.5, xMax: 4.5, zMin: -8, zMax: 4.8 };
//   const ballRef = useRef([]);
//   const activeIndexRef = useRef(null);
//   const isDraggingRef = useRef(false);

//   useEffect(() => {
//     isDraggingRef.current = dragging;
//   }, [dragging]);

//   return (
//     <Canvas
//       shadows
//       camera={{ position: [0, 7.5, 9.5], fov: 50 }}
//       style={{ position: 'absolute', inset: 0, touchAction: 'pan-y' }}
//       dpr={[1, 2]}
//       gl={{ antialias: true, alpha: false }}
//       onCreated={({ gl }) => {
//         gl.setClearColor('#bfe9ff');
//         const canvas = gl.domElement;
//         const onTouchMove = (e) => {
//           if (isDraggingRef.current) e.preventDefault();
//         };
//         canvas.addEventListener('touchmove', onTouchMove, { passive: false });
//       }}
//     >
//       <hemisphereLight args={['#bfe9ff', '#3c7a3f', 0.9]} />
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 9, 4]} intensity={1.8} castShadow color="#fff8e7" />
//       <pointLight position={[-4, 2, 2]} intensity={1.2} color="#a7c7ff" />
//       <pointLight position={[3, 1.5, 5]} intensity={1.0} color="#ffe1b8" />

//       <GrassGround />
//       <BallsField bounds={bounds} onDragChange={onDragChange} ballRef={ballRef} activeIndexRef={activeIndexRef} />
//       <InviteGlow ballRef={ballRef} activeIndexRef={activeIndexRef} isDragging={dragging} />
//       <CameraRig activeIndexRef={activeIndexRef} ballRef={ballRef} />

//       <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={20} blur={2.2} far={3} />
//     </Canvas>
//   );
// }

export default function Scene3D({ onDragChange, dragging }) {
  const bounds = { xMin: -4.5, xMax: 4.5, zMin: -8, zMax: 4.8 };
  const ballRef = useRef([]);
  const activeIndexRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    isDraggingRef.current = dragging;
  }, [dragging]);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 7.5, 9.5], fov: 50 }}
      style={{ position: 'absolute', inset: 0, touchAction: 'pan-y' }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => {
        gl.setClearColor('#bfe9ff');
        const canvas = gl.domElement;
        const onTouchMove = (e) => {
          if (isDraggingRef.current) e.preventDefault();
        };
        canvas.addEventListener('touchmove', onTouchMove, { passive: false });
      }}
    >
      <hemisphereLight args={['#bfe9ff', '#3c7a3f', 0.9]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 9, 4]} intensity={1.8} castShadow color="#fff8e7" />
      <pointLight position={[-4, 2, 2]} intensity={1.2} color="#a7c7ff" />
      <pointLight position={[3, 1.5, 5]} intensity={1.0} color="#ffe1b8" />

      <GrassGround />
      <BallsField bounds={bounds} onDragChange={onDragChange} ballRef={ballRef} activeIndexRef={activeIndexRef} />
      <InviteGlow ballRef={ballRef} activeIndexRef={activeIndexRef} isDragging={dragging} />
      {/* CameraRig removed — camera now stays fixed, so drag input mapping never shifts mid-play */}

      <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={20} blur={2.2} far={3} />
    </Canvas>
  );
}