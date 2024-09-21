import { FC } from 'react';

import {Wrapper} from '@/components/layout';
import {Title} from '@/components/ui';
import {Tabs} from '@/components/common';
import {ServiceItem} from '@/components/home';

import { IServicesData, IServicesProps, IGeneratedTabItems } from './interface';
import styles from './Services.module.css';

const generateTabItems = (data: IServicesData[]) => {
  const newData: IGeneratedTabItems[] = [];

  data.forEach((item) => {
    newData.push({
      tabTitle: item.category,
      content: (
        <ul className={styles.list}>
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
        </ul>
      ),
    });
  });

  return newData;
};

const Services: FC<IServicesProps> = ({ servicesData }) => {
  return (
    <section id={'services'}>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'medium'} as={'h2'}>
            Наши услуги
          </Title>
          <Tabs tabItems={generateTabItems(servicesData)} />
        </div>
      </Wrapper>
    </section>
  );
};

export default Services;
