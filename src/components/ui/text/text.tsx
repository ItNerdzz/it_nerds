import { FC } from 'react';
import P from '@/components/elements/P';
import clsx from 'clsx';
import styles from './text.module.css';

interface ITextProps {
  children: React.ReactNode;
  className?: string;
}

const Text: FC<ITextProps> = ({ children, className }) => {
  const textClassNames = clsx(styles.Text, className);

  return <P className={textClassNames}>{children}</P>;
};

export default Text;
