import { FC } from 'react';
import styles from './call-to-action.module.css';
import Wrapper from '@/components/layout/wrapper/wrapper';
import { Title, TitleSizes } from '@/components/ui/title/title';
import Subtitle from '@/components/ui/subtitle/subtitle';
import { Button, ButtonSizes } from '@/components/ui/button/button';

const CallToAction: FC = () => {
  return (
    <section className={styles.CallToAction}>
      <Wrapper>
        <div className={styles.CallToAction_Inner}>
          <div className={styles.CallToAction_TextContainer}>
            <Title size={TitleSizes.MEDIUM}>Обсудим ваш проект?</Title>
            <Subtitle>
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
