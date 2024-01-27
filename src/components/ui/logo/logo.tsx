import { FC } from 'react';
import styles from './logo.module.css';
import LogoSVG from '/public/assets/images/logo.svg';
import Link from 'next/link';

const Logo: FC = () => {
  return (
    <Link className={styles.Logo} href={'/'}>
      <LogoSVG />
    </Link>
  );
};

export default Logo;
