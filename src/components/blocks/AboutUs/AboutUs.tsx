import { FC } from 'react';

import Wrapper from '@/components/layout/Wrapper';
import Title, { TitleSizes } from '@/components/ui/Title';
import Subtitle from '@/components/ui/Subtitle';
import { Ul } from '@/components/elements';
import Text from '@/components/ui/Text';

import styles from './AboutUs.module.css';

interface IAboutUsFeaturesItem {
  numbers: string;
  symbol?: string;
  text: string;
}

const aboutUsFeatures: IAboutUsFeaturesItem[] = [
  {
    numbers: '00',
    text: 'Отрицательных отзывов',
  },
  {
    numbers: '63',
    symbol: '%',
    text: 'Экономии при сотрудничестве',
  },
  {
    numbers: '100',
    symbol: '%',
    text: 'Проектов сдано вовремя',
  },
  {
    numbers: '112',
    text: 'Выполненных проектов',
  },
];

const AboutUs: FC = () => {
  return (
    <section className={styles.aboutUs} id="about-us">
      <Wrapper>
        <div className={styles.textContainer}>
          <Title size={TitleSizes.MEDIUM} as={'h2'}>
            Коротко о нас
          </Title>
          <Subtitle className={styles.subtitle}>
            IT Nerds — команда веб-разработки. Создаем эффективные цифровые
            решения для оффлайн и онлайн бизнеса. Помогаем нашим клиентам
            повысить известность компании и привлечь новых клиентов из
            интернета. Создаем сайты с современным дизайном, продуманной
            структурой и использованием новейших технологий.
          </Subtitle>
        </div>
        <Ul className={styles.features}>
          {aboutUsFeatures &&
            aboutUsFeatures.length &&
            aboutUsFeatures.map((feature, index) => (
              <li className={styles.featuresItem} key={index}>
                <span className={styles.featuresNumber}>
                  {feature.numbers}
                  {feature.symbol}
                </span>
                <Text className={styles.featuresText}>{feature.text}</Text>
              </li>
            ))}
        </Ul>
      </Wrapper>
    </section>
  );
};

export default AboutUs;
