import { FC } from 'react';
import clsx from 'clsx';
import styles from './title.module.css';

interface ITitleProps {
  children: React.ReactNode;
  size: string;
  className?: string;
}

const TitleSizes = {
  BIG: 'big',
  MEDIUM: 'medium',
  SMALL: 'small',
};

const Title: FC<ITitleProps> = ({ children, size, className }) => {
  const titleClassNames = clsx(
    styles.Title,
    styles[`Title__${size}`],
    className
  );

  return <h1 className={titleClassNames}>{children}</h1>;
};

export { Title, TitleSizes };
