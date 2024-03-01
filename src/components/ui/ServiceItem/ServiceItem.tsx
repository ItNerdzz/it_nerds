'use client';
import { FC, useState, useEffect } from 'react';

import Title, { TitleSizes } from '@/components/ui/Title';
import Button, { ButtonSizes } from '@/components/ui/Button';
import Text from '@/components/ui/Text';

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
  const fullText = serviceItem.description;

  useEffect(() => {
    if (fullText.length > 123) {
      setShortText(`${minifyText(serviceItem.description)}..`);
      setIsShowFullText(false);
    }
  }, [serviceItem.description, fullText.length]);

  return (
    <li className={styles.serviceItem}>
      <div className={styles.textContainer}>
        <Title size={TitleSizes.SMALL}>{serviceItem.title}</Title>
        <Text className={styles.text}>
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
      <div className={styles.orderContainer}>
        <span className={styles.price}>
          от {formatePrice(serviceItem.price)} ₽
        </span>
        <Button size={ButtonSizes.SMALL}>Заказать</Button>
      </div>
    </li>
  );
};

export default ServiceItem;
