'use client';

import { FC } from 'react';

import useCallbackModalStore from "@/store/useCallbackModalStore";
import {Wrapper} from '@/components/layout';
import {Title, Subtitle, Button} from '@/components/ui';
import {Flame} from "@/components/home";

import styles from './Hero.module.css';

const Hero: FC = () => {
  const openModal = useCallbackModalStore(state => state.openModal);

  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.textContainer}>
            <Title className={styles.title} size={'big'}>
              Разработка <span className={styles.coloredText}>сайтов</span>
              <br />
              любого уровня сложности
            </Title>
            <Subtitle className={styles.subtitle}>
              Исследуем рынок, готовим дизайн, разрабатываем продукт
            </Subtitle>
            <Button
              className={styles.button}
              size={'big'}
              onClick={openModal}
            >
              Получить консультацию
            </Button>
          </div>
        </div>
      </Wrapper>
      <div className={styles.animationContainer}>
        <Flame />
      </div>
    </section>
  );
};

export default Hero;
