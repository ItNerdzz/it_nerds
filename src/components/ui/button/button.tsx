import { FC, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './button.module.css';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  target?: string;
  size: string;
  isAlt?: boolean;
}

const ButtonSizes = {
  BIG: 'big',
  SMALL: 'small',
};

const Button: FC<IButtonProps> = ({
  className,
  href,
  onClick,
  type,
  children,
  target,
  size,
  isAlt,
}) => {
  const buttonClassNames = clsx(
    styles.Button,
    className,
    styles[`Button__${size}`],
    isAlt && styles.Button__alt
  );

  return (
    <button
      className={buttonClassNames}
      onClick={onClick}
      {...(href && { href })}
      {...(target && { target })}
      {...(type && { type })}
    >
      {children}
    </button>
  );
};

export { Button, ButtonSizes };
