'use client';
import { FC, useState } from 'react';
import clsx from 'clsx';

import { Ul } from '@/components/elements';
import Button, { ButtonSizes } from '@/components/ui/Button';

import { ITabsProps } from './interface';
import styles from './Tabs.module.css';

const Tabs: FC<ITabsProps> = ({ tabItems }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <Ul className={styles.buttonsList}>
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
