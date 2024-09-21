import { FC } from 'react';

import {Wrapper} from '@/components/layout';
import {Title, Text} from '@/components/ui';

import styles from './Cases.module.css';

const Cases: FC = () => {
  return (
    <section id={'cases'}>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'medium'} as={'h2'}>
            Проекты с нашим участием
          </Title>
          <Text>Обновляем кейсы, скоро они появятся..</Text>
        </div>
      </Wrapper>
    </section>
  );
};

export default Cases;
