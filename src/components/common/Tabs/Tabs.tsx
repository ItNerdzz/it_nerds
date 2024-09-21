'use client';
import { FC, useState } from 'react';
import clsx from 'clsx';

import {Button} from '@/components/ui';

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
                isAlt={activeTabIndex === index ? false : true}
                className={clsx([
                  activeTabIndex === index && styles.buttonActive,
                  styles.tabsButton,
                ])}
                size={'small'}
                onClick={() => setActiveTabIndex(index)}
              >
                {tabItem.tabTitle}
              </Button>
            </li>
          ))}
      </ul>
      {tabItems[activeTabIndex].content && tabItems[activeTabIndex].content}
    </div>
  );
};

export default Tabs;
