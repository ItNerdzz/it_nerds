'use client';

import React, { FC, HTMLAttributes, useEffect, useRef } from 'react';
import clsx from 'clsx';

import setupBallsAnimation from '@/animations/balls';

import styles from './Balls.module.css';

const Balls: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = canvasContainerRef.current;
    if (!container) return;

    setupBallsAnimation(container);
  }, []);

  return <div className={clsx(className, styles.root)} ref={canvasContainerRef} />;
};

export default Balls;
