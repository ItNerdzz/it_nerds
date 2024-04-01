'use client';
import { FC, useState, useEffect } from 'react';
import clsx from 'clsx';

import Wrapper from '@/components/layout/Wrapper';
import Logo from '@/components/ui/Logo';
import BurgerButton from '@/components/ui/BurgerButton';
import Button, { ButtonSizes } from '@/components/ui/Button';
import MainNav from '@/components/ui/MainNav';
import Socials from '@/components/ui/Socials';

import Config from '@/config.json';

import styles from './Header.module.css';

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
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(false);

  const mobileMenuClassNames = clsx(
    styles.mobileMenu,
    isMenuOpened && styles.mobileMenuOpened
  );

  const rootClassNames = clsx([
    styles.root,
    isScrolled && styles.scrolled,
    isScrolled && isScrollTop && styles.show,
  ]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleMediaChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleMediaChange();

    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 0 && currentScrollY < prevScrollY) {
        setIsScrollTop(true);
      } else {
        setIsScrollTop(false);
      }

      prevScrollY = currentScrollY;
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    window.addEventListener('scroll', handleScroll);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.addEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={rootClassNames}>
      <Wrapper>
        <div className={styles.inner}>
          <Logo />
          {isMobile ? (
            <BurgerButton
              onClick={() => {
                setIsMenuOpened(!isMenuOpened);
              }}
            />
          ) : (
            <>
              <MainNav className={styles.nav} menuItems={menuItems} />
              <div className={styles.buttonsContainer}>
                <Socials className={styles.socials} />
                <Button
                  className={styles.callbackButton}
                  size={ButtonSizes.SMALL}
                  onClick={() => {
                    console.log('popup callback');
                  }}
                  href={Config.Telegram}
                  target="_blank"
                  asLink={true}
                >
                  Свзяаться
                </Button>
              </div>
            </>
          )}
        </div>
        {isMobile ? (
          <div className={mobileMenuClassNames}>
            <MainNav className={styles.nav} menuItems={menuItems} />
            <div className={styles.mobileMenuBottomContainer}>
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
