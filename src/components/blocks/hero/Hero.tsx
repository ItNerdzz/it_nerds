import type { FC } from 'react';

import Wrapper from '@/components/layout/Wrapper';
import Title, { TitleSizes } from '@/components/ui/Title';
import Subtitle from '@/components/ui/Subtitle';
import Button, { ButtonSizes } from '@/components/ui/Button';
import SphereCanvas from '@/components/ui/AnimatedSphere';

import styles from './Hero.module.css';

const Hero: FC = () => {
  return (
    <section className={styles.hero}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.textContainer}>
            <Title className={styles.title} size={TitleSizes.BIG}>
              Разработка <span className={styles.coloredText}>сайтов</span>
              <br />
              любого уровня сложности
            </Title>
            <Subtitle className={styles.subtitle}>
              Исследуем рынок, дизайним, разрабатываем продукт
            </Subtitle>
            <Button size={ButtonSizes.BIG}>Получить консультацию</Button>
          </div>
          <div className={styles.animationContainer}>
            <SphereCanvas className={styles.canvas} />
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Hero;
