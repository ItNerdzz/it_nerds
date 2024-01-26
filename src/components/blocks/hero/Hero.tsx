'use client';
import type { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import AnimatedSphere from '../../ui/animated-sphere/animated-sphere';
import styles from './hero.module.css';
import Wrapper from '../../layout/wrapper/wrapper';
import { Title, TitleSizes } from '../../ui/title/title';
import Subtitle from '../../ui/subtitle/subtitle';
import { Button, ButtonSizes } from '../../ui/button/button';

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
            <Canvas className={styles.Canvas} shadows={true}>
              <PerspectiveCamera
                makeDefault={true}
                fov={100}
                near={0.2}
                far={100}
                position={[0, 0, 5]}
              />
              <fog attach='fog' args={[0x000000, 10, 950]} />
              <hemisphereLight
                color={0xffffff}
                groundColor={0x000000}
                intensity={0.15}
              />
              <directionalLight
                color={0xff8f16}
                intensity={0.5}
                position={[0, 6, 5]}
                castShadow={true}
              />
              <directionalLight
                color={0xfff150}
                intensity={0.8}
                position={[-6, 3, 3]}
              />
              <directionalLight
                color={0xfff150}
                intensity={0.2}
                position={[0, -3, 3]}
              />
              <AnimatedSphere />
            </Canvas>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Hero;
