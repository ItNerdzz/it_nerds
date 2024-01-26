import { FC } from 'react';
import clsx from 'clsx';
import styles from './elements.module.css';

interface IPProps {
  className?: string;
  children?: React.ReactNode;
}

const P: FC<IPProps> = ({ children, className }) => {
  const pClassNames = clsx(styles.P, className);

  return <p className={pClassNames}>{children}</p>;
};

export default P;
