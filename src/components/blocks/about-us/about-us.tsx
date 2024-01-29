import { FC } from 'react';
import styles from './about-us.module.css';
import Wrapper from '@/components/layout/wrapper/wrapper';
import { Title, TitleSizes } from '@/components/ui/title/title';
import Subtitle from '@/components/ui/subtitle/subtitle';
import Ul from '@/components/elements/Ul';
import Text from '@/components/ui/text/text';

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
    <section className={styles.AboutUs} id='about-us'>
      <Wrapper>
        <div className={styles.AboutUs_TextContainer}>
          <Title size={TitleSizes.MEDIUM} as={'h2'}>
            Коротко о нас
          </Title>
          <Subtitle className={styles.AboutUs_Subtitle}>
            IT Nerds — команда веб-разработки. Создаем эффективные цифровые
            решения для оффлайн и онлайн бизнеса. Помогаем нашим клиентам
            повысить известность компании и привлечь новых клиентов из
            интернета. Создаем сайты с современным дизайном, продуманной
            структурой и использованием новейших технологий.
          </Subtitle>
        </div>
        <Ul className={styles.AboutUs_Features}>
          {aboutUsFeatures &&
            aboutUsFeatures.length &&
            aboutUsFeatures.map((feature, index) => (
              <li className={styles.AboutUs_FeaturesItem} key={index}>
                <span className={styles.AboutUs_FeaturesItemNumber}>
                  {feature.numbers}
                  {feature.symbol}
                </span>
                <Text className={styles.AboutUs_FeaturesItemText}>
                  {feature.text}
                </Text>
              </li>
            ))}
        </Ul>
      </Wrapper>
    </section>
  );
};

export default AboutUs;
