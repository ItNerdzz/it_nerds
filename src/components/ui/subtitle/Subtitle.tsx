import { FC } from 'react';
import clsx from 'clsx';

import styles from './Subtitle.module.css';

interface ISubtitleProps {
  children: React.ReactNode;
  className?: string;
}

const Subtitle: FC<ISubtitleProps> = ({ children, className }) => {
  const subtitleClassNames = clsx(styles.subtitle, className);

  return <p className={subtitleClassNames}>{children}</p>;
};

export default Subtitle;
