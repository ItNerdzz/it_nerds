'use client';

import { FC, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Wrapper } from '@/components/layout';
import { BurgerButton, MainNav, Socials } from '@/components/common';
import { Button, Logo } from '@/components/ui';
import useCallbackModalStore from '@/store/useCallbackModalStore';

import styles from './Header.module.css';

const menuItems = [
  {
    text: 'О нас',
    link: '/#about-us',
  },
  {
    text: 'Услуги',
    link: '/#Services',
  },
  {
    text: 'Проекты',
    link: '/#Cases',
  },
];

const Header: FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(false);

  const openModal = useCallbackModalStore(state => state.openModal);

  useEffect(() => {
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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.addEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={clsx([
        styles.root,
        isScrolled && !isMenuOpened && styles.scrolled,
        isScrolled && isScrollTop && styles.show,
      ])}
    >
      <Wrapper>
        <div className={styles.inner}>
          <Logo />
          <BurgerButton
            className={styles.burger}
            onClick={() => {
              setIsMenuOpened(!isMenuOpened);
            }}
          />
          <div className={clsx(styles.menu, isMenuOpened && styles.menuOpened)}>
            <MainNav
              className={styles.nav}
              menuItems={menuItems}
              isTabPossible={isMenuOpened}
              onLinkClick={() => setIsMenuOpened(false)}
            />
            <div className={styles.buttonsContainer}>
              <Socials className={styles.socials} />
              <Button className={styles.callbackButton} size={'small'} onClick={openModal}>
                Свзяаться
              </Button>
            </div>
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
