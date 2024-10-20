import { FC } from 'react';

import { Wrapper } from '@/components/layout';
import { Logo } from '@/components/ui/';
import { Socials } from '@/components/common';

import styles from './Footer.module.css';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper>
        <div className={styles.inner}>
          <Logo />
          <span>2024 ©</span>
          <Socials />
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
