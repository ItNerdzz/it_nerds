import { FC } from 'react';

import { Wrapper } from '@/components/layout';
import { Title } from '@/components/ui';
import { HowWeWorksItem, IconCloud } from '@/components/home';

import styles from './HowWeWorks.module.css';

const steps = [
  {
    title: 'Планирование',
    text: 'Проводим брифинг. \nСоставляем техническое задание исходя из ваших требований.',
  },
  {
    title: 'Проектирование',
    text: 'Разрабатываем прототип проекта. Прорабатываем пользовательский опыт, чтобы ваш сайт был интуитивно\u00a0понятным.',
  },
  {
    title: 'Дизайн',
    text: 'Разрабатываем дизайн соответствующий лидеру рынка исходя\u00a0из\u00a0анализа ниши и\u00a0предоставленных\u00a0референсов.',
  },
  {
    title: 'Разработка',
    text: 'Адаптивная, кроссбраузерная вёрстка. Интеграция с системой управления, подключение необходимых интеграций.',
  },
  {
    title: 'Тестирование',
    text: 'Тестируем проект на\u00a0наличие ошибок\u00a0и\u00a0вносим правки.',
  },
  {
    title: 'Продвижение',
    text: 'Помогаем вашим потенциальным клиентам узнать о вас',
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
