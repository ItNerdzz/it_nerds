'use client';

import React, { FC, useEffect, useState } from 'react';

import { Button, Title } from '@/components/ui';
import useCallbackModalStore from '@/store/useCallbackModalStore';

import styles from './DelayedCTA.module.css';

interface DelayedCTAProps {
  delay: number;
}

const DelayedCTA: FC<DelayedCTAProps> = ({ delay }) => {
  const [isOpened, setIsOpened] = useState(false);
  const openModal = useCallbackModalStore(state => state.openModal);

  useEffect(() => {
    setTimeout(() => setIsOpened(true), delay);
  }, []);

  if (!isOpened) return null;

  return (
    <section className={styles.root}>
      <button className={styles.close} onClick={() => setIsOpened(false)}>
        +
      </button>
      <Title className={styles.title} size={'extra-small'}>
        Расскажите о вашем проекте — мы поможем!
      </Title>
      <Button size={'small'} onClick={openModal}>
        Получить консультацию
      </Button>
    </section>
  );
};

export default DelayedCTA;
