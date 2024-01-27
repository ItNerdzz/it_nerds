import { FC } from 'react';
import styles from './footer.module.css';
import Wrapper from '../wrapper/wrapper';
import Logo from '@/components/ui/logo/logo';
import Socials from '@/components/ui/socials/socials';

const Footer: FC = () => {
  return (
    <footer className={styles.Footer}>
      <Wrapper>
        <div className={styles.Footer_Inner}>
          <Logo />
          <span className={styles.Copyright}>2023 ©</span>
          <Socials />
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
