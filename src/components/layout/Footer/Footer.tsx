import { FC } from 'react';
import Link from 'next/link';

import { Wrapper } from '@/components/layout';
import { Logo } from '@/components/ui/';
import { Socials } from '@/components/common';

import styles from './Footer.module.css';

const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <Wrapper>
        <div className={styles.inner}>
          <Logo />
          <div className={styles.info}>
            <Link className={styles.privacy} href={'/privacy/'}>
              Политика конфиденциальности
            </Link>
            <span>{new Date().getFullYear()} ©</span>
          </div>
          <Socials />
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
