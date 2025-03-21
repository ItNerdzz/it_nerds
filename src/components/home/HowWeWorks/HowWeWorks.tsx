import { FC } from 'react';

import { Wrapper } from '@/components/layout';
import { Title } from '@/components/ui';
import { HowWeWorksItem, IconCloud } from '@/components/home';

import styles from './HowWeWorks.module.css';

const steps = [
  {
    title: 'Планирование',
    text: 'Проводим брифинг, чтобы глубже понять ваш\u00a0бизнес. Формируем четкое техническое задание, учитывая все\u00a0требования',
  },
  {
    title: 'Проектирование',
    text: 'Создаём прототип сайта, продумывая удобную навигацию и пользовательский опыт, чтобы сделать его максимально интуитивным',
  },
  {
    title: 'Дизайн',
    text: 'Разрабатываем современный и стильный дизайн, ориентируясь аналитику ниши и\u00a0ваши\u00a0референсы',
  },
  {
    title: 'Разработка',
    text: 'Верстаем адаптивный, кроссбраузерный сайт, интегрируем с CMS и\u00a0подключаем все\u00a0необходимые сервисы.',
  },
  {
    title: 'Тестирование',
    text: 'Проверяем сайт на\u00a0ошибки, скорость загрузки и\u00a0корректную работу',
  },
  {
    title: 'Продвижение',
    text: 'Помогаем вам\u00a0привлечь клиентов, используя SEO, рекламу и\u00a0аналитику для\u00a0роста бизнеса',
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
