import { FC } from 'react';

import { Wrapper } from '@/components/layout';
import { Title } from '@/components/ui';
import { HowWeWorksItem, IconCloud } from '@/components/home';

import styles from './HowWeWorks.module.css';

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
    <section>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'medium'} as={'h2'}>
            Как мы работаем
          </Title>
          <div className={styles.content}>
            <ul className={styles.steps}>
              {steps &&
                steps.length &&
                steps.map((stepItem, index) => (
                  <HowWeWorksItem animationDelay={0.5 + index / 2} key={index} number={index + 1} item={stepItem} />
                ))}
            </ul>
            <div className={styles.technologies}>
              <IconCloud className={styles.cloud} />
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default HowWeWorks;
