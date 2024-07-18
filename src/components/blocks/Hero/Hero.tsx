'use client';
import { FC } from 'react';

import Wrapper from '@/components/layout/Wrapper';
import Title, { TitleSizes } from '@/components/ui/Title';
import Subtitle from '@/components/ui/Subtitle';
import Button, { ButtonSizes } from '@/components/ui/Button';

import Config from '@/config.json';
// import SphereCanvas from '@/components/ui/AnimatedSphere';
// import Halo from '@/components/ui/Halo';
import styles from './Hero.module.css';
import Flame from "@/components/blocks/Flame";

const Hero: FC = () => {
  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.textContainer}>
            <Title className={styles.title} size={TitleSizes.BIG}>
              Разработка <span className={styles.coloredText}>сайтов</span>
              <br />
              любого уровня сложности
            </Title>
            <Subtitle className={styles.subtitle}>
              Исследуем рынок, готовим дизайн, разрабатываем продукт
            </Subtitle>
            <Button
              className={styles.button}
              size={ButtonSizes.BIG}
              href={Config.Telegram}
              target="_blank"
              asLink={true}
            >
              Получить консультацию
            </Button>
          </div>
        </div>
      </Wrapper>
      <div className={styles.animationContainer}>
        {/* <SphereCanvas className={styles.canvas} /> */}
        {/*<Halo />*/}
        <Flame />
      </div>
    </section>
  );
};

export default Hero;
