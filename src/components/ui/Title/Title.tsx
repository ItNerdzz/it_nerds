import { FC } from 'react';
import clsx from 'clsx';

import styles from './Title.module.css';

interface ITitleProps {
  children: React.ReactNode;
  size: 'extra-large' | 'large' | 'medium' | 'small' | 'extra-small';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Title: FC<ITitleProps> = ({ children, size = 'medium', className, as: Tag = 'h1' }) => {
  const titleClassNames = clsx(className, styles.title, styles[size]);

  return <Tag className={titleClassNames}>{children}</Tag>;
};

export default Title;
