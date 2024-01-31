'use client';
import { FC, useState, useEffect } from 'react';
import styles from './header.module.css';
import clsx from 'clsx';
import BurgerButton from '@/components/ui/burger-button/burger-button';
import Wrapper from '../wrapper/wrapper';
import Logo from '@/components/ui/logo/logo';
import { Button, ButtonSizes } from '@/components/ui/button/button';
import MainNav from '@/components/ui/main-nav/main-nav';
import Socials from '@/components/ui/socials/socials';

const menuItems = [
  {
    text: 'О нас',
    link: '/#about-us',
  },
  {
    text: 'Услуги',
    link: '/#services',
  },
  {
    text: 'Проекты',
    link: '/#cases',
  },
];

const Header: FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 767px)').matches
      : false
  );

  const mobileMenuClassNames = clsx(
    styles.Header_MobileMenu,
    isMenuOpened && styles.Header_MobileMenu__opened
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleMediaChange = (evt: MediaQueryListEvent) => {
      setIsMobile(evt.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return (
    <header className={styles.Header}>
      <Wrapper>
        <div className={styles.Header_Inner}>
          <Logo />
          {isMobile ? (
            <BurgerButton
              onClick={() => {
                setIsMenuOpened(!isMenuOpened);
              }}
            />
          ) : (
            <>
              <MainNav className={styles.Header_Nav} menuItems={menuItems} />
              <div className={styles.Header_ButtonsContainer}>
                <Socials className={styles.Header_Socials} />
                <Button
                  className={styles.Header_CallbackButton}
                  size={ButtonSizes.SMALL}
                  onClick={() => {
                    console.log('popup callback');
                  }}
                >
                  Свзяаться
                </Button>
              </div>
            </>
          )}
        </div>
        {isMobile ? (
          <div className={mobileMenuClassNames}>
            <MainNav className={styles.Header_MainNav} menuItems={menuItems} />
            <div className={styles.Hedaer_MobileMenuBottomContainer}>
              <Socials />
              <Button
                size={ButtonSizes.SMALL}
                onClick={() => {
                  console.log('popup callback');
                }}
              >
                Свзяаться
              </Button>
            </div>
          </div>
        ) : null}
      </Wrapper>
    </header>
  );
};

export default Header;
