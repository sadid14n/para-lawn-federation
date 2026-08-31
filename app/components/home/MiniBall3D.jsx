'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingBall() {
  const ballRef = useRef();
  const t = useRef(0);

  useFrame((state, delta) => {
    if (!ballRef.current) return;
    t.current += delta;
    ballRef.current.rotation.y += delta * 0.4;
    ballRef.current.rotation.x += delta * 0.15;
    ballRef.current.position.y = Math.sin(t.current * 0.8) * 0.15;
  });

  return (
    <mesh ref={ballRef} castShadow>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color="#EF7D20"
        roughness={0.22}
        metalness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1.6}
      />
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.97]}>
        <ringGeometry args={[0.16, 0.4, 32]} />
        <meshStandardMaterial color="#FFD93D" side={THREE.DoubleSide} roughness={0.3} />
      </mesh>
    </mesh>
  );
}

export default function MiniBall3D() {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 4.2], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <hemisphereLight args={['#ffffff', '#1E2265', 0.7]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.6} castShadow color="#fff8e7" />
      <pointLight position={[-3, 1, 2]} intensity={1.2} color="#a7c7ff" />

      <FloatingBall />
      <ContactShadows position={[0, -1.1, 0]} opacity={0.4} scale={6} blur={2.4} far={2} />
    </Canvas>
  );
}