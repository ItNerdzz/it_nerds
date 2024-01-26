import { FC } from 'react';
import clsx from 'clsx';
import styles from './button.module.css';

interface IButtonProps {
  children?: React.ReactNode;
  className?: string;
  size: string;
  isAlt?: boolean;
}

const ButtonSizes = {
  BIG: 'big',
  SMALL: 'small',
};

const Button: FC<IButtonProps> = ({ children, className, size, isAlt }) => {
  const buttonClassNames = clsx(
    styles.Button,
    className,
    styles[`Button__${size}`],
    isAlt && styles.Button__alt
  );

  return <button className={buttonClassNames}>{children}</button>;
};

export { Button, ButtonSizes };
