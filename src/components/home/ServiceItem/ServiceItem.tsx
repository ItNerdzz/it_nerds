'use client';

import { FC, useState, useRef, useEffect } from 'react';

import {Title, Button, Text} from '@/components/ui';

import Config from '@/config.json';

import styles from './ServiceItem.module.css';

interface IServiceItemProps {
  serviceItem: {
    title: string;
    description: string;
    price: number;
  };
}

interface IFormatePrice {
  (price: number): string;
}

const formatePrice: IFormatePrice = (price) => {
  return price.toLocaleString('ru-RU');
};

interface IMinifyText {
  (text: string): string;
}

const minifyText: IMinifyText = (text) => {
  return text.slice(0, 112);
};

const ServiceItem: FC<IServiceItemProps> = ({ serviceItem }) => {
  const [isShowFullText, setIsShowFullText] = useState(false);
  const [shortText, setShortText] = useState('');
  const [itemHeight, setItemHeight] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);

  const fullText = serviceItem.description;

  const resizeItem = () => {
    const height = textRef.current?.offsetHeight;

    if (height) {
      setItemHeight(height);
    }
  };

  useEffect(() => {
    resizeItem();
  }, [isShowFullText, shortText]);

  useEffect(() => {
    if (fullText.length > 123) {
      setShortText(`${minifyText(serviceItem.description)}..`);
      setIsShowFullText(false);
    }

    window.addEventListener('resize', resizeItem);

    return () => {
      window.removeEventListener('resize', resizeItem);
    };
  }, []);

  return (
    <li className={styles.serviceItem}>
      <div className={styles.textContainer}>
        <Title size={'small'}>{serviceItem.title}</Title>
        <div className={styles.text} style={{ height: `${itemHeight}px` }}>
          <div ref={textRef}>
            <Text>
              {shortText && !isShowFullText ? shortText : fullText}
              {shortText ? (
                <span
                  className={styles.moreButton}
                  onClick={() => setIsShowFullText(!isShowFullText)}
                >
                  {isShowFullText ? ' Свернуть' : ' Подробнее'}
                </span>
              ) : null}
            </Text>
          </div>
        </div>
      </div>
      <div className={styles.orderContainer}>
        <span className={styles.price}>
          от {formatePrice(serviceItem.price)} ₽
        </span>
        <Button
          size={'small'}
          asLink={true}
          href={Config.Telegram}
          target="_blank"
        >
          Заказать
        </Button>
      </div>
    </li>
  );
};

export default ServiceItem;
