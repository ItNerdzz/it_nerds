import { FC } from 'react';

import Wrapper from '@/components/layout/Wrapper';
import Title, { TitleSizes } from '@/components/ui/Title';
import Subtitle from '@/components/ui/Subtitle';
import Button, { ButtonSizes } from '@/components/ui/Button';

import styles from './CallToAction.module.css';

const CallToAction: FC = () => {
  return (
    <section className={styles.callToAction}>
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
          <Button size={ButtonSizes.BIG}>Связаться</Button>
        </div>
      </Wrapper>
    </section>
  );
};

export default CallToAction;
