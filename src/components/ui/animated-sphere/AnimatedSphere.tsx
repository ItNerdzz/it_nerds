'use client';

import { FC } from 'react';
import { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh } from 'three';

const AnimatedSphere: FC = () => {
  const [distortValue, setDistortValue] = useState(0.2);
  const [isMoving, setIsMoving] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const gumRef = useRef<Mesh>(null);

  let mouseMoveTimer: number;

  const handleMouseMove = (event: MouseEvent) => {
    setMouseX(event.clientX);
    setMouseY(event.clientY);
    setIsMoving(true);

    clearTimeout(mouseMoveTimer);
    mouseMoveTimer = window.setTimeout(() => {
      setIsMoving(false);
    }, 1000);
  };

  const touchMove = (event: TouchEvent) => {
    setIsMoving(true);

    clearTimeout(mouseMoveTimer);
    mouseMoveTimer = window.setTimeout(() => {
      setIsMoving(false);
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', touchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', touchMove);
    };
  }, []);

  useFrame(() => {
    const gum = gumRef.current;
    const currentDistort = gum ? gum.material.distort : null;
    if (isMoving) {
      setDistortValue(Math.min(currentDistort + 0.01, 0.45));
      if (!gum) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;

      gum.rotation.x = (deltaY / centerY) * Math.PI * 0.25;
      gum.rotation.y = (deltaX / centerX) * Math.PI * 0.25;
    } else {
      setDistortValue(Math.max(currentDistort - 0.002, 0.2));
    }
  });

  return (
    <Sphere
      ref={gumRef}
      args={[2.5, 100, 200]}
      castShadow={true}
      receiveShadow={false}
    >
      <MeshDistortMaterial
        emissive={0x7c3aed}
        emissiveIntensity={0.8}
        roughness={0.61}
        metalness={0.21}
        distort={distortValue}
        speed={2.5}
      />
    </Sphere>
  );
};

export default AnimatedSphere;
