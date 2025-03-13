'use client';

import React, { FC, useRef, useEffect } from 'react';
import clsx from 'clsx';

import setupAnimation from '@/animations/flame';

import styles from './Flame.module.css';

interface IFlameProps {
  className?: string;
}

const Flame: FC<IFlameProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    setupAnimation(canvasRef.current);

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1';
    }, 500);
  }, [canvasRef.current]);

  return (
    <canvas className={clsx(className, styles.root)} ref={canvasRef} width={800} height={600} style={{ opacity: 0 }} />
  );
};

export default Flame;
