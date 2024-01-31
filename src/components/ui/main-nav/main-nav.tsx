import { FC } from 'react';
import Ul from '@/components/elements/Ul';
import Link from 'next/link';
import styles from './main-nav.module.css';

interface IMainNavItem {
  text: string;
  link: string;
}

interface IMainNavProps {
  menuItems: IMainNavItem[];
}

const MainNav: FC<IMainNavProps> = ({ menuItems }) => {
  return (
    <Ul className={styles.MainNav}>
      {menuItems &&
        menuItems.length &&
        menuItems.map((item, index) => (
          <li className={styles.MainNav_MenuItem} key={index}>
            <Link className={styles.MainNav_Link} href={item.link}>
              {item.text}
            </Link>
          </li>
        ))}
    </Ul>
  );
};

export default MainNav;
