'use client';
import type { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import AnimatedSphere from '../../ui/animated-sphere/AnimatedSphere';
import styles from './Hero.module.css';
import Wrapper from '../../layout/wrapper/Warpper';
import { Title, TitleSizes } from '../../ui/title/Title';

const Hero: FC = () => {
  return (
    <section className={styles.hero}>
      <Wrapper>
        <Title size={TitleSizes.BIG}>
          Разработка{' '}
          <span className={styles.hero__titleColoredText}>сайтов</span> любого
          уровня сложности
        </Title>
        <Canvas shadows={true}>
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
      </Wrapper>
    </section>
  );
};

export default Hero;
