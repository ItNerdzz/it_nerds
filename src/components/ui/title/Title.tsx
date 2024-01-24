import { FC } from 'react';
import styles from './title.module.css';

interface ITitleProps {
  children: React.ReactNode;
  size: string;
}

const TitleSizes = {
  BIG: 'big',
  MEDIUM: 'medium',
  SMALL: 'small',
};

const Title: FC<ITitleProps> = ({ children, size }) => {
  return (
    <h1 className={`${styles.Title} ${styles[`Title_${size}`]}`}>{children}</h1>
  );
};

export { Title, TitleSizes };
