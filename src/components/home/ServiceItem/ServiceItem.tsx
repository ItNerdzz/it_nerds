'use client';

import { FC } from 'react';

import { Title, Button, Text } from '@/components/ui';
import useCallbackModalStore from '@/store/useCallbackModalStore';

import styles from './ServiceItem.module.css';

interface IServiceItemProps {
  serviceItem: {
    title: string;
    description: string;
  };
}

const ServiceItem: FC<IServiceItemProps> = ({ serviceItem }) => {
  const openModal = useCallbackModalStore(state => state.openModal);

  return (
    <li className={styles.root}>
      <div className={styles.textContainer}>
        <Title size={'small'} as={'h3'}>
          {serviceItem.title}
        </Title>
        <Text className={styles.text}>{serviceItem.description}</Text>
      </div>
      <div className={styles.buttons}>
        <Button className={styles.button} size={'small'} isAlt={true} onClick={openModal}>
          Подробнее
        </Button>
        <Button className={styles.button} size={'small'} onClick={openModal}>
          Узнать стоимость
        </Button>
      </div>
    </li>
  );
};

export default ServiceItem;
