import { FC } from 'react';
import Link from 'next/link';

import LogoSVG from '/public/assets/images/logo.svg';

import styles from './Logo.module.css';

const Logo: FC = () => {
  return (
    <Link className={styles.logo} href={'/'}>
      <LogoSVG />
    </Link>
  );
};

export default Logo;
