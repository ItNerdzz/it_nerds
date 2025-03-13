'use client';

import { FC, useRef, useEffect } from 'react';

import { Wrapper } from '@/components/layout';
import { Title, Subtitle, Button } from '@/components/ui';
import startParticlesAnimation from '@/animations/particles';
import useCallbackModalStore from '@/store/useCallbackModalStore';

import styles from './CallToAction.module.css';

const CallToAction: FC = () => {
  const canvasRef = useRef(null);
  const openModal = useCallbackModalStore(state => state.openModal);

  useEffect(() => {
    const canvas = canvasRef.current;

    startParticlesAnimation(canvas);
  }, [canvasRef]);

  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.textContainer}>
            <Title className={styles.title} size={'medium'} as={'h2'}>
              Обсудим ваш проект?
            </Title>
            <Subtitle className={styles.subtitle}>Поделитесь своей идей, а мы предложим оптимальное решение</Subtitle>
          </div>
          <Button size={'big'} onClick={openModal}>
            Связаться
          </Button>
        </div>
      </Wrapper>
      <div className={styles.animationWrapper}>
        <canvas className={styles.canvas} ref={canvasRef} />
      </div>
    </section>
  );
};

export default CallToAction;
