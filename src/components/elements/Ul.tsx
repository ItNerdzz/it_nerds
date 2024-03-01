import { FC } from 'react';
import clsx from 'clsx';
import styles from './Elements.module.css';

interface IUlProps {
  className?: string;
  children?: React.ReactNode;
}

const Ul: FC<IUlProps> = ({ children, className }) => {
  const UlClassNames = clsx(styles.ul, className);

  return <ul className={UlClassNames}>{children}</ul>;
};

export default Ul;
