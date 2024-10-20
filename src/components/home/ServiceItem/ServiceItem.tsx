'use client';

import { FC, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Title, Button, Text } from '@/components/ui';
import Config from '@/config.json';

import styles from './ServiceItem.module.css';

interface IServiceItemProps {
  serviceItem: {
    title: string;
    description: string;
    price: number;
  };
}

const ServiceItem: FC<IServiceItemProps> = ({ serviceItem }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isLongText, setIsLongText] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current === null) return;

    const offsetHeight = textRef.current.offsetHeight;
    const scrollHeight = textRef.current.scrollHeight;

    setIsLongText(offsetHeight < scrollHeight);
  }, [textRef]);

  useEffect(() => {
    if (contentRef.current === null || textRef.current === null) return;

    contentRef.current.style.height = textRef.current.offsetHeight + 'px';
  }, [isOpened]);

  return (
    <li className={clsx(styles.root, isOpened && styles.opened)}>
      <div className={styles.conteiner}>
        <Title size={'small'} as={'h3'}>
          {serviceItem.title}
        </Title>
        <div className={styles.textContainer}>
          <div className={styles.textAccordion}>
            <div className={styles.content} ref={contentRef}>
              <Text className={styles.text} ref={textRef}>
                {serviceItem.description}
              </Text>
            </div>
          </div>
          {isLongText && (
            <span className={styles.moreButton} onClick={() => setIsOpened(!isOpened)}>
              {isOpened ? ' Свернуть' : ' Подробнее'}
            </span>
          )}
        </div>
      </div>

      <div className={styles.orderContainer}>
        <span className={styles.price}>от {serviceItem.price.toLocaleString('ru-RU')} ₽</span>
        <Button size={'small'} asLink={true} href={Config.Telegram} target='_blank'>
          Связаться
        </Button>
      </div>
    </li>
  );
};

export default ServiceItem;
