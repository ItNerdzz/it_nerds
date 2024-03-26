import { FC } from 'react';
import dynamic from 'next/dynamic';

import Wrapper from '@/components/layout/Wrapper';
import Title, { TitleSizes } from '@/components/ui/Title';
import Subtitle from '@/components/ui/Subtitle';
import Button, { ButtonSizes } from '@/components/ui/Button';

import Config from '@/config.json';

import styles from './CallToAction.module.css';

const Trunk = dynamic(
  () => {
    return import('@/components/ui/Trunk');
  },
  { ssr: false }
);

const CallToAction: FC = () => {
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
        <Trunk />
      </div>
    </section>
  );
};

export default CallToAction;
