import { FC, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './Button.module.css';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  target?: string;
  size: string;
  isAlt?: boolean;
  asLink?: boolean;
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
  asLink,
}) => {
  const buttonClassNames = clsx(
    styles.button,
    className,
    styles[size],
    isAlt && styles.alt
  );

  const Tag = asLink ? 'a' : 'button';

  return (
    <Tag
      className={buttonClassNames}
      onClick={onClick}
      {...(href && { href })}
      {...(target && { target })}
      {...(type && { type })}
    >
      {children}
    </Tag>
  );
};

export { ButtonSizes };
export default Button;
