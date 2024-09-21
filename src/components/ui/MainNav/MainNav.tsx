import { FC } from 'react';
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
}

const MainNav: FC<IMainNavProps> = ({ menuItems, className }) => {
  const mainNavClassName = clsx(className, styles.mainNav);
  return (
    <ul className={mainNavClassName}>
      {menuItems &&
        menuItems.length &&
        menuItems.map((item, index) => (
          <li className={styles.menuItem} key={index}>
            <Link className={styles.link} href={item.link}>
              {item.text}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default MainNav;
