'use client';

import React, { FC, useRef, useEffect } from 'react';
import clsx from 'clsx';
import setupAnimation from "@/utils/flame";

import styles from './Flame.module.css';

interface IFlameProps {
  className?: string;
}

const Flame:FC<IFlameProps> = ({ className }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    setupAnimation(canvas)
  }, []);

  return <canvas className={clsx(className, styles.root)} ref={canvasRef} width={800} height={600} />;
};

export default Flame;
