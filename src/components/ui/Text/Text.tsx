import React, { forwardRef } from 'react';
import clsx from 'clsx';

import styles from './Text.module.css';

interface ITextProps {
  children: React.ReactNode;
  className?: string;
}

const Text = forwardRef<HTMLParagraphElement, ITextProps>(({ children, className }, ref) => {
  const textClassNames = clsx(styles.text, className);

  return (
    <p className={textClassNames} ref={ref}>
      {children}
    </p>
  );
});

Text.displayName = 'Text';

export default Text;
