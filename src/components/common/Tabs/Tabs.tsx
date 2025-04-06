'use client';

import React, { FC, useState } from 'react';
import clsx from 'clsx';

import { Button } from '@/components/ui';

import { ITabsProps } from './interface';
import styles from './Tabs.module.css';

const Tabs: FC<ITabsProps> = ({ tabItems }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <ul className={styles.buttonsList}>
        {tabItems &&
          tabItems.length &&
          tabItems.map((tabItem, index) => (
            <li className={styles.buttonsItem} key={tabItem.tabTitle}>
              <Button
                isAlt={activeTabIndex === index}
                className={styles.tabsButton}
                size={'small'}
                onClick={() => setActiveTabIndex(index)}
                disabled={activeTabIndex === index}
              >
                {tabItem.tabTitle}
              </Button>
            </li>
          ))}
      </ul>
      {tabItems.map((tabItem, index) => (
        <div
          className={clsx(styles.tabContent, index === activeTabIndex && styles.tabContentActive)}
          key={tabItem.tabTitle}
        >
          {tabItem.content}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
