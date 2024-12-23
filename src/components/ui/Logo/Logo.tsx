import { FC } from 'react';
import Link from 'next/link';

import LogoSVG from '/public/assets/images/logo.svg';

import clsx from 'clsx';

import styles from './Logo.module.css';

const Logo: FC<{ className: string }> = ({ className }) => {
  return (
    <Link className={clsx(styles.logo, className)} href={'/'}>
      <LogoSVG />
    </Link>
  );
};

export default Logo;
