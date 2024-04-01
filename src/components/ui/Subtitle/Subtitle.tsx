import { FC } from 'react';
import clsx from 'clsx';

import { P } from '@/components/elements';

import styles from './Subtitle.module.css';

interface ISubtitleProps {
  children: React.ReactNode;
  className?: string;
}

const Subtitle: FC<ISubtitleProps> = ({ children, className }) => {
  const subtitleClassNames = clsx(styles.subtitle, className);

  return <P className={subtitleClassNames}>{children}</P>;
};

export default Subtitle;
