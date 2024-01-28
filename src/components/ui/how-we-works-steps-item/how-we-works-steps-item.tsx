import { FC } from 'react';
import styles from './how-we-works-steps-item.module.css';
import { Title, TitleSizes } from '../title/title';
import Text from '../text/text';

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
      <div className={styles.HowItWorksStepsItem_Header}>
        <span className={styles.HowItWorksStepsItem_Number}>{number}</span>
        <Title size={TitleSizes.SMALL} as={'h3'}>
          {item.title}
        </Title>
      </div>
      <Text>{item.text}</Text>
    </li>
  );
};

export default HowItWorksStepsItem;
