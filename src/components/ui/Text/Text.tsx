import { FC } from 'react';
import clsx from 'clsx';

import styles from './Text.module.css';

interface ITextProps {
  children: React.ReactNode;
  className?: string;
}

const Text: FC<ITextProps> = ({ children, className }) => {
  const textClassNames = clsx(styles.text, className);

  return <p className={textClassNames}>{children}</p>;
};

export default Text;
