import { FC } from 'react';
import Wrapper from '@/components/layout/wrapper/wrapper';
import { Title, TitleSizes } from '@/components/ui/title/title';
import Text from '@/components/ui/text/text';
import styles from './cases.module.css';

const Cases: FC = () => {
  return (
    <section className={styles.Cases} id={'cases'}>
      <Wrapper>
        <div className={styles.Cases_Inner}>
          <Title
            className={styles.Cases_Title}
            size={TitleSizes.MEDIUM}
            as={'h2'}
          >
            Проекты с нашим участием
          </Title>
          <Text>Обновляем кейсы, скоро они появятся..</Text>
        </div>
      </Wrapper>
    </section>
  );
};

export default Cases;
