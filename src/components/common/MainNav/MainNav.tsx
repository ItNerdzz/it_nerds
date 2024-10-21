import React, { FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './MainNav.module.css';

interface IMainNavItem {
  text: string;
  link: string;
}

interface IMainNavProps {
  menuItems: IMainNavItem[];
  className?: string;
  isTabPossible?: boolean;
  onLinkClick: () => void;
}

const MainNav: FC<IMainNavProps> = ({ menuItems, className, isTabPossible, onLinkClick }) => {
  const mainNavClassName = clsx(className, styles.mainNav);
  return (
    <ul className={mainNavClassName}>
      {menuItems &&
        menuItems.length &&
        menuItems.map((item, index) => (
          <li className={styles.menuItem} key={index}>
            <Link className={styles.link} href={item.link} tabIndex={isTabPossible ? 0 : -1} onClick={onLinkClick}>
              {item.text}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default MainNav;
