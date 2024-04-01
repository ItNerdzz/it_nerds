import { FC } from 'react';

import Wrapper from '@/components/layout/Wrapper';
import Title, { TitleSizes } from '@/components/ui/Title';
import Text from '@/components/ui/Text';

import styles from './Cases.module.css';

const Cases: FC = () => {
  return (
    <section id={'cases'}>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={TitleSizes.MEDIUM} as={'h2'}>
            Проекты с нашим участием
          </Title>
          <Text>Обновляем кейсы, скоро они появятся..</Text>
        </div>
      </Wrapper>
    </section>
  );
};

export default Cases;
