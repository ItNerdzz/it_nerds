'use client';
import { FC } from 'react';
import { motion } from 'framer-motion';

import Title, { TitleSizes } from '@/components/ui/Title';
import Text from '@/components/ui/Text';

import styles from './HowWeWorksItem.module.css';

interface IHowItWorksStepsItemProps {
  number: number;
  item: {
    title: string;
    text: string;
  };
}

const HowItWorksStepsItem: FC<IHowItWorksStepsItemProps> = ({
  number,
  item,
}) => {
  return (
    <li>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 1,
          ease: 'easeInOut',
        }}
        variants={{
          hidden: { color: 'var(--basic)' },
          visible: { color: 'var(--primary)' },
        }}
        className={styles.header}
      >
        <span className={styles.number}>{number}</span>
        <Title size={TitleSizes.SMALL} as={'h3'}>
          {item.title}
        </Title>
      </motion.div>
      <Text>{item.text}</Text>
    </li>
  );
};

export default HowItWorksStepsItem;
