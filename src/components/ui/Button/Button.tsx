import React, { FC, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './Button.module.css';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  target?: string;
  size: 'large' | 'big' | 'small';
  isAlt?: boolean;
  disabled?: boolean;
}

const Button: FC<IButtonProps> = ({
  className,
  href,
  onClick,
  type,
  children,
  target,
  size,
  isAlt,
  disabled,
  tabIndex,
}) => {
  const buttonClassNames = clsx(styles.button, className, styles[size], isAlt && styles.alt);

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      className={buttonClassNames}
      onClick={onClick}
      {...(href && { href })}
      {...(target && { target })}
      {...(type && { type })}
      {...(disabled && { disabled })}
      tabIndex={tabIndex}
    >
      {children}
    </Tag>
  );
};

export default Button;
