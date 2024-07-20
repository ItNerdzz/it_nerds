'use client';

import {FC, useRef, useEffect} from 'react';

import Wrapper from '@/components/layout/Wrapper';
import Title, {TitleSizes} from '@/components/ui/Title';
import Subtitle from '@/components/ui/Subtitle';
import Button, {ButtonSizes} from '@/components/ui/Button';
import startParticlesAnimation from "@/utils/particles";

import Config from '@/config.json';

import styles from './CallToAction.module.css';


const CallToAction: FC = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    startParticlesAnimation(canvas);
  }, [canvasRef.current]);

  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.textContainer}>
            <Title className={styles.title} size={TitleSizes.MEDIUM} as={'h2'}>
              Обсудим ваш проект?
            </Title>
            <Subtitle className={styles.subtitle}>
              Поделитесь своей идей, а мы предложим оптимальное решение
            </Subtitle>
          </div>
          <Button
            size={ButtonSizes.BIG}
            href={Config.Telegram}
            target="_blank"
            asLink={true}
          >
            Связаться
          </Button>
        </div>
      </Wrapper>
      <div className={styles.animationWrapper}>
        <canvas className={styles.canvas} ref={canvasRef}/>
      </div>
    </section>
  );
};

export default CallToAction;
