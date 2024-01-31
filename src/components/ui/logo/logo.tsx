import { FC } from 'react';
import LogoSVG from '/public/assets/images/logo.svg';
import Link from 'next/link';
import styles from './logo.module.css';

const Logo: FC = () => {
  return (
    <Link className={styles.Logo} href={'/'}>
      <LogoSVG />
    </Link>
  );
};

export default Logo;
