import { FC } from 'react';
import Wrapper from '@/components/layout/wrapper/wrapper';
import { Title, TitleSizes } from '@/components/ui/title/title';
import Subtitle from '@/components/ui/subtitle/subtitle';
import { Button, ButtonSizes } from '@/components/ui/button/button';
import styles from './call-to-action.module.css';

const CallToAction: FC = () => {
  return (
    <section className={styles.CallToAction}>
      <Wrapper>
        <div className={styles.CallToAction_Inner}>
          <div className={styles.CallToAction_TextContainer}>
            <Title
              className={styles.CallToAction_Title}
              size={TitleSizes.MEDIUM}
              as={'h2'}
            >
              Обсудим ваш проект?
            </Title>
            <Subtitle className={styles.CallToAction_Subtitle}>
              Поделитесь своей идей, а мы предложим оптимальное решение
            </Subtitle>
          </div>
          <Button size={ButtonSizes.BIG}>Связаться</Button>
        </div>
      </Wrapper>
    </section>
  );
};

export default CallToAction;
