'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

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

    // Blade-level noise speckle — now deterministic (hash of pixel position),
    // not Math.random(), so this stays pure and safe inside useMemo/render
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

function InviteGlow({ ballRef, isDragging }) {
  const glowRef = useRef();
  const pulse = useRef(0);

  useFrame((state, delta) => {
    if (!glowRef.current || !ballRef.current) return;
    const ball = ballRef.current;
    glowRef.current.position.x = ball.position.x;
    glowRef.current.position.z = ball.position.z;

    const ballScale = ball.scale.x;

    pulse.current += delta;
    const base = (isDragging ? 1.6 : 1.15 + Math.sin(pulse.current * 2) * 0.15) * ballScale;
    glowRef.current.scale.set(base, base, base);
    glowRef.current.material.opacity = isDragging ? 0.55 : 0.28 + Math.sin(pulse.current * 2) * 0.08;
  });

  return (
    <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]}>
      <circleGeometry args={[0.9, 32]} />
      <meshBasicMaterial color="#ffe27a" transparent opacity={0.3} depthWrite={false} />
    </mesh>
  );
}

// function LawnBowl({ bounds, onDragChange, meshRefOut }) {
//   const meshRef = useRef();
//   meshRefOut.current = meshRef;
//   const velocity = useRef(new THREE.Vector3(0, 0, 0));
//   const dragStart = useRef(null);
//   const isDragging = useRef(false);
//   const activePointerId = useRef(null); // track which finger/pointer owns the drag
//   const mouseTarget = useRef(new THREE.Vector3(0, 0, 1.5));

//   const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
//   const MIN_SCALE = 0.4;
//   const MAX_SCALE = 1.25;

//   useFrame((state, delta) => {
//     const mesh = meshRef.current;
//     if (!mesh) return;

//     if (!isDragging.current) {
//       velocity.current.multiplyScalar(0.985);
//       mesh.position.x += velocity.current.x * delta;
//       mesh.position.z += velocity.current.z * delta;

//       if (velocity.current.length() < 0.05) {
//         mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, mouseTarget.current.x, 0.02);
//         mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, mouseTarget.current.z, 0.02);
//       }

//       const r = 0.55;
//       mesh.rotation.x += (velocity.current.z / r) * delta;
//       mesh.rotation.z -= (velocity.current.x / r) * delta;
//     }

//     mesh.position.x = clamp(mesh.position.x, bounds.xMin, bounds.xMax);
//     mesh.position.z = clamp(mesh.position.z, bounds.zMin, bounds.zMax);
//     if (mesh.position.x === bounds.xMin || mesh.position.x === bounds.xMax) velocity.current.x *= -0.5;
//     if (mesh.position.z === bounds.zMin || mesh.position.z === bounds.zMax) velocity.current.z *= -0.5;

//     const t = (mesh.position.z - bounds.zMin) / (bounds.zMax - bounds.zMin);
//     const scale = THREE.MathUtils.lerp(MIN_SCALE, MAX_SCALE, THREE.MathUtils.clamp(t, 0, 1));
//     mesh.scale.setScalar(scale);
//   });

//   const handlePointerMove = (e) => {
//     // Ignore stray moves from a second finger while one is already dragging
//     if (isDragging.current && e.pointerId !== activePointerId.current) return;

//     const clampedZ = clamp(e.point.z, bounds.zMin, bounds.zMax);
//     const clampedX = clamp(e.point.x, bounds.xMin, bounds.xMax);
//     mouseTarget.current.set(clampedX, 0, clampedZ);
//     if (isDragging.current && meshRef.current) {
//       meshRef.current.position.x = clampedX;
//       meshRef.current.position.z = clampedZ;
//     }
//   };

//   const handlePointerDown = (e) => {
//     // Already dragging with another finger — ignore additional touches
//     if (isDragging.current) return;

//     isDragging.current = true;
//     activePointerId.current = e.pointerId;
//     dragStart.current = { x: e.point.x, z: e.point.z, time: performance.now() };
//     velocity.current.set(0, 0, 0);
//     onDragChange?.(true);

//     // Pointer capture — keeps move/up events targeted at this element even if
//     // the finger slides fast or briefly leaves the hit area (main mobile fix)
//     e.target?.setPointerCapture?.(e.pointerId);
//   };

//   const handlePointerUp = (e) => {
//     if (e.pointerId !== undefined && e.pointerId !== activePointerId.current) return;

//     if (isDragging.current && dragStart.current) {
//       const dt = Math.max((performance.now() - dragStart.current.time) / 1000, 0.05);
//       const dx = e.point.x - dragStart.current.x;
//       const dz = e.point.z - dragStart.current.z;
//       const dist = Math.hypot(dx, dz);
//       if (dist > 0.01) {
//         const speed = Math.min(9, dist / dt);
//         velocity.current.set((dx / dist) * speed, 0, (dz / dist) * speed);
//       }
//     }
//     isDragging.current = false;
//     activePointerId.current = null;
//     dragStart.current = null;
//     onDragChange?.(false);
//   };

//   return (
//     <>
//       <mesh
//         rotation={[-Math.PI / 2, 0, 0]}
//         position={[0, -0.5, 0]}
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerUp={handlePointerUp}
//         onPointerCancel={handlePointerUp}
//         onPointerOut={handlePointerUp}
//       >
//         <planeGeometry args={[26, 26]} />
//         <meshBasicMaterial visible={false} />
//       </mesh>

//       <mesh ref={meshRef} position={[0, 0, 1.5]} castShadow>
//         <sphereGeometry args={[0.55, 64, 64]} />
//         <meshPhysicalMaterial
//           color="#8a2332"
//           roughness={0.2}
//           metalness={0.05}
//           clearcoat={1}
//           clearcoatRoughness={0.08}
//           envMapIntensity={1.8}
//         />
//         <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.53]}>
//           <ringGeometry args={[0.1, 0.24, 32]} />
//           <meshStandardMaterial color="#FFD93D" side={THREE.DoubleSide} roughness={0.3} />
//         </mesh>
//       </mesh>
//     </>
//   );
// }

function LawnBowl({ bounds, onDragChange, ballRef }) {
  // No local meshRef, no effect, no copying — ballRef IS the mesh ref.
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const dragStart = useRef(null);
  const isDragging = useRef(false);
  const activePointerId = useRef(null);
  const mouseTarget = useRef(new THREE.Vector3(0, 0, 1.5));

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const MIN_SCALE = 0.4;
  const MAX_SCALE = 1.25;
  const GRAB_RADIUS = 1.4;

  useFrame((state, delta) => {
    const mesh = ballRef.current;
    if (!mesh) return;

    if (!isDragging.current) {
      velocity.current.multiplyScalar(0.985);
      mesh.position.x += velocity.current.x * delta;
      mesh.position.z += velocity.current.z * delta;

      if (velocity.current.length() < 0.05) {
        mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, mouseTarget.current.x, 0.02);
        mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, mouseTarget.current.z, 0.02);
      }

      const r = 0.55;
      mesh.rotation.x += (velocity.current.z / r) * delta;
      mesh.rotation.z -= (velocity.current.x / r) * delta;
    }

    mesh.position.x = clamp(mesh.position.x, bounds.xMin, bounds.xMax);
    mesh.position.z = clamp(mesh.position.z, bounds.zMin, bounds.zMax);
    if (mesh.position.x === bounds.xMin || mesh.position.x === bounds.xMax) velocity.current.x *= -0.5;
    if (mesh.position.z === bounds.zMin || mesh.position.z === bounds.zMax) velocity.current.z *= -0.5;

    const t = (mesh.position.z - bounds.zMin) / (bounds.zMax - bounds.zMin);
    const scale = THREE.MathUtils.lerp(MIN_SCALE, MAX_SCALE, THREE.MathUtils.clamp(t, 0, 1));
    mesh.scale.setScalar(scale);
  });

  const handlePointerMove = (e) => {
    if (isDragging.current && e.pointerId !== activePointerId.current) return;

    const clampedZ = clamp(e.point.z, bounds.zMin, bounds.zMax);
    const clampedX = clamp(e.point.x, bounds.xMin, bounds.xMax);

    if (e.pointerType !== 'touch') {
      mouseTarget.current.set(clampedX, 0, clampedZ);
    }

    if (isDragging.current && ballRef.current) {
      ballRef.current.position.x = clampedX;
      ballRef.current.position.z = clampedZ;
    }
  };

  const handlePointerDown = (e) => {
    if (isDragging.current || !ballRef.current) return;

    const dx = e.point.x - ballRef.current.position.x;
    const dz = e.point.z - ballRef.current.position.z;
    const distToBall = Math.hypot(dx, dz);

    if (e.pointerType === 'touch' && distToBall > GRAB_RADIUS) {
      return;
    }

    isDragging.current = true;
    activePointerId.current = e.pointerId;
    dragStart.current = { x: e.point.x, z: e.point.z, time: performance.now() };
    velocity.current.set(0, 0, 0);
    onDragChange?.(true);
    e.target?.setPointerCapture?.(e.pointerId);
  };

  const handlePointerUp = (e) => {
    if (e.pointerId !== undefined && e.pointerId !== activePointerId.current) return;

    if (isDragging.current && dragStart.current) {
      const dt = Math.max((performance.now() - dragStart.current.time) / 1000, 0.05);
      const dx = e.point.x - dragStart.current.x;
      const dz = e.point.z - dragStart.current.z;
      const dist = Math.hypot(dx, dz);
      if (dist > 0.01) {
        const speed = Math.min(9, dist / dt);
        velocity.current.set((dx / dist) * speed, 0, (dz / dist) * speed);
      }
    }
    isDragging.current = false;
    activePointerId.current = null;
    dragStart.current = null;
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

      <mesh ref={ballRef} position={[0, 0, 1.5]} castShadow>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial
          color="#8a2332"
          roughness={0.2}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.8}
        />
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.53]}>
          <ringGeometry args={[0.1, 0.24, 32]} />
          <meshStandardMaterial color="#FFD93D" side={THREE.DoubleSide} roughness={0.3} />
        </mesh>
      </mesh>
    </>
  );
}

// export default function Scene3D({ onDragChange, dragging }) {
//   // zMin pushed much further back so the ball can travel all the way to the
//   // top of the visible field; zMax kept close to camera for the "big" end.
//   const bounds = { xMin: -4.5, xMax: 4.5, zMin: -8, zMax: 4.8 };
//   const meshRefOut = useRef(null);

//   return (
//     <Canvas
//        shadows
//   camera={{ position: [0, 7.5, 9.5], fov: 50 }}
//   style={{ position: 'absolute', inset: 0, touchAction: 'none' }}
//   dpr={[1, 2]}
//   gl={{ antialias: true, alpha: false }}
//   onCreated={({ gl }) => gl.setClearColor('#bfe9ff')}
//     >
//       <hemisphereLight args={['#bfe9ff', '#3c7a3f', 0.9]} />
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[5, 9, 4]} intensity={1.8} castShadow color="#fff8e7" />
//       <pointLight position={[-4, 2, 2]} intensity={1.2} color="#a7c7ff" />
//       <pointLight position={[3, 1.5, 5]} intensity={1.0} color="#ffe1b8" />

//       <GrassGround />
//       <LawnBowl bounds={bounds} onDragChange={onDragChange} meshRefOut={meshRefOut} />
//       <InviteGlow targetRef={meshRefOut} isDragging={dragging} />

//       <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={20} blur={2.2} far={3} />
//     </Canvas>
//   );
// }

export default function Scene3D({ onDragChange, dragging }) {
  const bounds = { xMin: -4.5, xMax: 4.5, zMin: -8, zMax: 4.8 };
  const ballRef = useRef(null); // the single source of truth — created once, here
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
      <LawnBowl bounds={bounds} onDragChange={onDragChange} ballRef={ballRef} />
      <InviteGlow ballRef={ballRef} isDragging={dragging} />

      <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={20} blur={2.2} far={3} />
    </Canvas>
  );
}