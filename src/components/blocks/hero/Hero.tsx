import type { FC } from 'react';
import Wrapper from '../../layout/wrapper/wrapper';
import { Title, TitleSizes } from '../../ui/title/title';
import Subtitle from '../../ui/subtitle/subtitle';
import { Button, ButtonSizes } from '../../ui/button/button';
import SphereCanvas from '@/components/ui/animated-sphere/sphere-canvas';
import styles from './hero.module.css';

const Hero: FC = () => {
  return (
    <section className={styles.Hero}>
      <Wrapper>
        <div className={styles.Hero_Inner}>
          <div className={styles.Hero_TextContainer}>
            <Title className={styles.Hero_Title} size={TitleSizes.BIG}>
              Разработка{' '}
              <span className={styles.Title_coloredText}>сайтов</span>
              <br />
              любого уровня сложности
            </Title>
            <Subtitle className={styles.Hero_Subtitle}>
              Исследуем рынок, дизайним, разрабатываем продукт
            </Subtitle>
            <Button size={ButtonSizes.BIG}>Получить консультацию</Button>
          </div>
          <div className={styles.Hero_AnimationContainer}>
            <SphereCanvas className={styles.Canvas} />
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Hero;
