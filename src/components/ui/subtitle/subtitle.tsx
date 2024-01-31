import { FC } from 'react';
import clsx from 'clsx';
import P from '../../elements/P';
import styles from './subtitle.module.css';

interface ISubtitleProps {
  children: React.ReactNode;
  className?: string;
}

const Subtitle: FC<ISubtitleProps> = ({ children, className }) => {
  const subtitleClassNames = clsx(styles.Subtitle, className);

  return <P className={subtitleClassNames}>{children}</P>;
};

export default Subtitle;
