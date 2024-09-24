'use client';

import { useState, useRef } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

import { Button } from '@/components/ui';

import BurgerData from './burger.json';
import styles from './BurgerButton.module.css';

interface IBurgerButtonProps {
  onClick: () => void;
  className?: string;
}

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const BurgerButton: React.FC<IBurgerButtonProps> = ({ onClick, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState<number>(1);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const burgerButtonClassNames = clsx(styles.burgerButton, className);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
    setDirection(direction * -1);
    if (lottieRef.current) {
      if (direction > 0) {
        lottieRef.current.setDirection(1);
      } else {
        lottieRef.current.setDirection(-1);
      }
      lottieRef.current.play();
    }
  };

  return (
    <Button
      className={burgerButtonClassNames}
      onClick={() => {
        setDirection(direction * -1);
        toggleAnimation();
        onClick();
      }}
      size={'small'}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={BurgerData}
        loop={false}
        autoplay={false}
        style={{ height: 32, width: 32 }}
      />
    </Button>
  );
};

export default BurgerButton;
