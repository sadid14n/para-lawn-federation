'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const grassVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const grassFragment = `
  varying vec2 vUv;
  uniform float uTime;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      v += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 base = vec3(0.16, 0.42, 0.20);
    vec3 dark = vec3(0.10, 0.30, 0.15);
    vec3 light = vec3(0.28, 0.56, 0.26);

    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center);

    float rings = sin(dist * 60.0) * 0.5 + 0.5;
    float ringBand = smoothstep(0.4, 0.6, rings);
    float stripe = step(0.5, mod(floor(vUv.x * 10.0 + vUv.y * 2.0), 2.0));

    vec3 color = mix(base, dark, stripe * 0.3);
    color = mix(color, light, ringBand * 0.18);

    float blades = fbm(vUv * 220.0) * 0.12;
    float coarse = fbm(vUv * 30.0 + uTime * 0.02) * 0.05;
    color += blades + coarse;

    float sheen = smoothstep(0.0, 1.0, vUv.y) * 0.08;
    color += sheen;

    color *= smoothstep(0.98, 0.2, dist) * 0.4 + 0.75;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function GrassGround() {
  const matRef = useRef();
  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.51, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={grassVertex}
        fragmentShader={grassFragment}
        uniforms={{ uTime: { value: 0 } }}
      />
    </mesh>
  );
}

function InviteGlow({ targetRef, isDragging }) {
  const glowRef = useRef();
  const pulse = useRef(0);

  useFrame((state, delta) => {
    if (!glowRef.current || !targetRef.current?.current) return;
    const ball = targetRef.current.current;
    glowRef.current.position.x = ball.position.x;
    glowRef.current.position.z = ball.position.z;

    // Glow scales down with the ball so it stays proportionate at a distance
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

function LawnBowl({ bounds, onDragChange, meshRefOut }) {
  const meshRef = useRef();
  meshRefOut.current = meshRef;
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const dragStart = useRef(null);
  const isDragging = useRef(false);
  const mouseTarget = useRef(new THREE.Vector3(0, 0, 1.5));

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  // Depth-based scale: small & far near zMin (top of screen), large & near at zMax (bottom)
  const MIN_SCALE = 0.4;
  const MAX_SCALE = 1.25;

  useFrame((state, delta) => {
    const mesh = meshRef.current;
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

    // Apply depth scale every frame based on current z within bounds
    const t = (mesh.position.z - bounds.zMin) / (bounds.zMax - bounds.zMin);
    const scale = THREE.MathUtils.lerp(MIN_SCALE, MAX_SCALE, THREE.MathUtils.clamp(t, 0, 1));
    mesh.scale.setScalar(scale);
  });

  const handlePointerMove = (e) => {
    const clampedZ = clamp(e.point.z, bounds.zMin, bounds.zMax);
    const clampedX = clamp(e.point.x, bounds.xMin, bounds.xMax);
    mouseTarget.current.set(clampedX, 0, clampedZ);
    if (isDragging.current && meshRef.current) {
      meshRef.current.position.x = clampedX;
      meshRef.current.position.z = clampedZ;
    }
  };

  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.point.x, z: e.point.z, time: performance.now() };
    velocity.current.set(0, 0, 0);
    onDragChange?.(true);
  };

  const handlePointerUp = (e) => {
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
    dragStart.current = null;
    onDragChange?.(false);
  };

  return (
    <>
      {/* Catcher plane sized to cover the full extended play field */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
      >
        <planeGeometry args={[26, 26]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      <mesh ref={meshRef} position={[0, 0, 1.5]} castShadow>
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

export default function Scene3D({ onDragChange, dragging }) {
  // zMin pushed much further back so the ball can travel all the way to the
  // top of the visible field; zMax kept close to camera for the "big" end.
  const bounds = { xMin: -4.5, xMax: 4.5, zMin: -8, zMax: 4.8 };
  const meshRefOut = useRef(null);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 7.5, 9.5], fov: 50 }}
      style={{ position: 'absolute', inset: 0 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => gl.setClearColor('#bfe9ff')}
    >
      <hemisphereLight args={['#bfe9ff', '#3c7a3f', 0.9]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 9, 4]} intensity={1.8} castShadow color="#fff8e7" />
      <pointLight position={[-4, 2, 2]} intensity={1.2} color="#a7c7ff" />
      <pointLight position={[3, 1.5, 5]} intensity={1.0} color="#ffe1b8" />

      <GrassGround />
      <LawnBowl bounds={bounds} onDragChange={onDragChange} meshRefOut={meshRefOut} />
      <InviteGlow targetRef={meshRefOut} isDragging={dragging} />

      <ContactShadows position={[0, -0.5, 0]} opacity={0.5} scale={20} blur={2.2} far={3} />
    </Canvas>
  );
}