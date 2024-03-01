import { FC } from 'react';

import Wrapper from '@/components/layout/Wrapper';
import Logo from '@/components/ui/Logo';
import Socials from '@/components/ui/Socials';

import styles from './Footer.module.css';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper>
        <div className={styles.inner}>
          <Logo />
          <span>2023 ©</span>
          <Socials />
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
