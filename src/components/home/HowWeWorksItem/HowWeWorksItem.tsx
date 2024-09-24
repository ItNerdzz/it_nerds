'use client';
import { FC } from 'react';
import { motion } from 'framer-motion';

import { Title, Text } from '@/components/ui';

import styles from './HowWeWorksItem.module.css';

interface IHowItWorksStepsItemProps {
  number: number;
  item: {
    title: string;
    text: string;
  };
  animationDelay: number;
}

const HowWeWorksItem: FC<IHowItWorksStepsItemProps> = ({ number, animationDelay, item }) => {
  return (
    <li className={styles.root}>
      <motion.div
        className={styles.header}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 1,
          delay: animationDelay,
          ease: 'easeInOut',
        }}
        variants={{
          hidden: { color: 'var(--basic)' },
          visible: { color: 'var(--primary)' },
        }}
      >
        <span className={styles.number}>{number}</span>
        <Title size={'small'} as={'h3'}>
          {item.title}
        </Title>
      </motion.div>
      <div className={styles.progress}>
        <motion.div
          className={styles.bar}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1,
            delay: animationDelay,
            ease: 'easeInOut',
          }}
          variants={{
            hidden: { height: '0' },
            visible: { height: '100%' },
          }}
        ></motion.div>
      </div>
      <Text className={styles.text}>{item.text}</Text>
    </li>
  );
};

export default HowWeWorksItem;
