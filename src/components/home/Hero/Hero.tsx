'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';

import useCallbackModalStore from '@/store/useCallbackModalStore';
import { Wrapper } from '@/components/layout';
import { Title, Subtitle, Button } from '@/components/ui';

import styles from './Hero.module.css';

const Balls = dynamic(() => import('@/components/home/Balls/Balls'), { ssr: false });
// const Flame = dynamic(() => import('@/components/home/Flame/Flame'), { ssr: false });

const Hero: FC = () => {
  // const [isNarrow, setIsNarrow] = useState<null | boolean>(null);
  const openModal = useCallbackModalStore(state => state.openModal);
  //
  // useEffect(() => {
  //   if (typeof window === 'undefined') return;
  //   setIsNarrow(window.matchMedia('(max-width: 768px)').matches);
  //   const handleResize = () => setIsNarrow(window.matchMedia('(max-width: 1023px)').matches);
  //   window.addEventListener('resize', handleResize);
  //
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  return (
    <section className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.textContainer}>
            <Title className={styles.title} size={'big'}>
              Разработка <span className={styles.coloredText}>сайта </span>
              для&nbsp;<span className={styles.coloredText}>вашего&nbsp;бизнеса</span>
            </Title>
            <Subtitle className={styles.subtitle}>
              Анализируем рынок, создаем продуманный дизайн и&nbsp;увеличиваем конверсию.
              Ваш&nbsp;сайт&nbsp;—&nbsp;не&nbsp;просто&nbsp;картинка, а&nbsp;инструмент для&nbsp;роста&nbsp;продаж
            </Subtitle>
            <Button className={styles.button} size={'big'} onClick={openModal}>
              Получить беспланый аудит
            </Button>
          </div>
        </div>
      </Wrapper>
      <div className={styles.animationContainer}>
        {/*{isNarrow ? <Balls /> : <Flame />}*/}
        <Balls />
        <div className={styles.logo}>IT Nerds</div>
      </div>
    </section>
  );
};

export default Hero;
