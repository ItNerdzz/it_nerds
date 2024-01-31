import { FC } from 'react';
import Wrapper from '@/components/layout/wrapper/wrapper';
import { Title, TitleSizes } from '@/components/ui/title/title';
import Ul from '@/components/elements/Ul';
import HowItWorksStepsItem from '@/components/ui/how-we-works-steps-item/how-we-works-steps-item';
import IconCloud from '@/components/ui/icon-cloud/icon-cloud';
import styles from './how-we-works.module.css';

const steps = [
  {
    title: 'Планирование',
    text: 'Проводим брифинг. Составляем техническое задание исходя из ваших требований.',
  },
  {
    title: 'Проектирование',
    text: 'Разрабатываем прототип проекта. Прорабатываем пользовательский опыт, чтобы ваш сайт был интуитивно понятным.',
  },
  {
    title: 'Дизайн',
    text: 'Разрабатываем дизайн соответствующий лидеру рынка исходя из анализа ниши и предоставленных референсов.',
  },
  {
    title: 'Разработка',
    text: 'Адаптивная, кроссбраузерная вёрстка. Интеграция с системой управления, подключение необходимых интеграций.',
  },
  {
    title: 'Тестирование',
    text: 'Тестируем проект на наличие ошибок и вносим правки.',
  },
  {
    title: 'Продвижение',
    text: 'SEO, таргет, контекст, рассылки.',
  },
];

const HowWeWorks: FC = () => {
  return (
    <section className={styles.HowWeWorks}>
      <Wrapper>
        <div className={styles.HowWeWorks_Inner}>
          <Title
            className={styles.HowWeWorks_Title}
            size={TitleSizes.MEDIUM}
            as={'h2'}
          >
            Как мы работаем
          </Title>
          <div className={styles.HowWeWorks_Content}>
            <Ul className={styles.HowWeWorks_Steps}>
              {steps &&
                steps.length &&
                steps.map((stepItem, index) => (
                  <HowItWorksStepsItem
                    key={index}
                    number={index + 1}
                    item={stepItem}
                  />
                ))}
            </Ul>
            <div className={styles.HowWeWorks_Technologies}>
              <IconCloud />
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default HowWeWorks;
