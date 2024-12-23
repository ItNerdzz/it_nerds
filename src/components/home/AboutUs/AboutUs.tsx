'use client';

import { FC, useRef, useEffect } from 'react';
import { motion, animate, useMotionValue, useTransform, useInView } from 'framer-motion';

import { Wrapper } from '@/components/layout';
import { Title, Subtitle, Text } from '@/components/ui';

import styles from './AboutUs.module.css';

interface IAboutUsFeaturesItem {
  value: string;
  symbol?: string;
  title: string;
  text: string;
}

const aboutUsFeatures: IAboutUsFeaturesItem[] = [
  {
    value: '40',
    symbol: '+',
    title: 'Довольных клиентов',
    text: 'Нас рекомендуют, потому что \nмы оправдываем ожидания',
  },
  {
    value: '34',
    symbol: '%',
    title: 'Экономии при сотрудничестве',
    text: 'Уменьшаем затраты на поддержку, \nне\u00a0теряя в качестве',
  },
  {
    value: '100',
    symbol: '%',
    title: 'Соблюдение сроков',
    text: 'Мы знаем цену времени \nи соблюдаем сроки',
  },
];

const AnimatedNumber: FC<{ target: number }> = ({ target }) => {
  const from = 0;
  const to = target;

  const count = useMotionValue(from);
  const value = useTransform(count, latest => Math.floor(latest));
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration: 1.5 });
    } else {
      animate(count, from, { duration: 0 });
    }

    console.log(value);
  }, [count, isInView, from, to]);

  return <motion.span ref={ref}>{value}</motion.span>;
};

const AboutUs: FC = () => {
  return (
    <section className={styles.aboutUs} id='about-us'>
      <Wrapper>
        <div className={styles.textContainer}>
          <Title size={'medium'} as={'h2'}>
            Почему выбирают IT Nerds?
          </Title>
          <Subtitle className={styles.subtitle}>
            IT Nerds: команда, которая сделает ваш бизнес заметным. Мы помогаем компаниям укреплять свою репутацию,
            увеличивать охват и привлекать новых клиентов через интернет. Наши проекты выделяются современным дизайном,
            интуитивной структурой и использованием передовых технологий, обеспечивая результат, который действительно
            работает.
          </Subtitle>
        </div>
        <ul className={styles.features}>
          {aboutUsFeatures.map((feature, index) => (
            <li className={styles.featuresItem} key={index}>
              <span className={styles.featuresNumber}>
                <AnimatedNumber target={parseInt(feature.value)} />
                <span>{feature.symbol}</span>
              </span>
              <Title className={styles.featuresTitle} size={'small'} as={'h3'}>
                {feature.title}
              </Title>
              <Text className={styles.featuresText}>{feature.text}</Text>
            </li>
          ))}
        </ul>
      </Wrapper>
    </section>
  );
};

export default AboutUs;
