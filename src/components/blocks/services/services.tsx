import { FC } from 'react';
import styles from './services.module.css';
import { IServicesData, IServicesProps, IGeneratedTabItems } from './interface';
import Wrapper from '@/components/layout/wrapper/wrapper';
import { Title, TitleSizes } from '@/components/ui/title/title';
import Tabs from '@/components/ui/tabs/tabs';
import ServiceItem from '@/components/ui/service-item/service-item';
import Ul from '@/components/elements/Ul';

const generateTabItems = (data: IServicesData[]) => {
  const newData: IGeneratedTabItems[] = [];

  data.forEach((item) => {
    newData.push({
      tabTitle: item.category,
      content: (
        <Ul className={styles.Services_ItemsList}>
          {item.items.map((item) => (
            <ServiceItem
              key={item.id}
              serviceItem={{
                title: item.title,
                description: item.description,
                price: item.price,
              }}
            />
          ))}
        </Ul>
      ),
    });
  });

  return newData;
};

const Services: FC<IServicesProps> = ({ servicesData }) => {
  return (
    <section id={'services'}>
      <Wrapper>
        <div className={styles.Services_Inner}>
          <Title className={styles.Services_Title} size={TitleSizes.MEDIUM}>
            Наши услуги
          </Title>
          <Tabs tabItems={generateTabItems(servicesData)} />
        </div>
      </Wrapper>
    </section>
  );
};

export default Services;
