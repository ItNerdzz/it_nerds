import { FC } from 'react';

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
      <div className={styles.header}>
        <span className={styles.number}>{number}</span>
        <Title size={TitleSizes.SMALL} as={'h3'}>
          {item.title}
        </Title>
      </div>
      <Text>{item.text}</Text>
    </li>
  );
};

export default HowItWorksStepsItem;
