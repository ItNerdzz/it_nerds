'use client';
import { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import AnimatedSphere from './animated-sphere';

interface ISphereCanvasProps {
  className?: string;
}

const SphereCanvas: FC<ISphereCanvasProps> = ({ className }) => {
  return (
    <Canvas className={className} shadows={true}>
      <PerspectiveCamera
        makeDefault={true}
        fov={100}
        near={0.2}
        far={100}
        position={[0, 0, 5]}
      />
      <fog attach='fog' args={[0x000000, 10, 950]} />
      <hemisphereLight
        color={0xffffff}
        groundColor={0x000000}
        intensity={0.15}
      />
      <directionalLight
        color={0xff8f16}
        intensity={0.5}
        position={[0, 6, 5]}
        castShadow={true}
      />
      <directionalLight
        color={0xfff150}
        intensity={0.8}
        position={[-6, 3, 3]}
      />
      <directionalLight
        color={0xfff150}
        intensity={0.2}
        position={[0, -3, 3]}
      />
      <AnimatedSphere />
    </Canvas>
  );
};

export default SphereCanvas;
