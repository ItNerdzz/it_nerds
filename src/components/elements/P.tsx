import { FC } from 'react';
import clsx from 'clsx';
import styles from './Elements.module.css';

interface IPProps {
  className?: string;
  children?: React.ReactNode;
}

const P: FC<IPProps> = ({ children, className }) => {
  const pClassNames = clsx(styles.p, className);

  return <p className={pClassNames}>{children}</p>;
};

export default P;
