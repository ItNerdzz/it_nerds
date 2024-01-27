import { useState, useRef } from 'react';
import styles from './burger-button.module.css';
import clsx from 'clsx';
import { Button, ButtonSizes } from '../button/button';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import BurgerData from './burger.json';

interface IBurgerButtonProps {
  onClick: () => void;
  className?: string;
}

const BurgerButton: React.FC<IBurgerButtonProps> = ({ onClick, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState<number>(1);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const burgerButtonClassNames = clsx(styles.BurgerButton, className);

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
      size={ButtonSizes.SMALL}
      onClick={() => {
        setDirection(direction * -1);
        toggleAnimation();
        onClick();
      }}
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
