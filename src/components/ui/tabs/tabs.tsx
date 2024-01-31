'use client';
import { FC, useState } from 'react';
import { ITabsProps } from './interface';
import Ul from '@/components/elements/Ul';
import { Button, ButtonSizes } from '../button/button';
import styles from './tabs.module.css';

const Tabs: FC<ITabsProps> = ({ tabItems }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <Ul className={styles.Tabs_ButtonsList}>
        {tabItems &&
          tabItems.length &&
          tabItems.map((tabItem, index) => (
            <li className={styles.Tabs_ButtonsItem} key={tabItem.tabTitle}>
              <Button
                isAlt={activeTabIndex === index ? false : true}
                className={styles.Tabs_Button}
                size={ButtonSizes.SMALL}
                onClick={() => setActiveTabIndex(index)}
              >
                {tabItem.tabTitle}
              </Button>
            </li>
          ))}
      </Ul>
      {tabItems[activeTabIndex].content && tabItems[activeTabIndex].content}
    </div>
  );
};

export default Tabs;
