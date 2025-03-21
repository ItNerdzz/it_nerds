import { FC } from 'react';

import { Wrapper } from '@/components/layout';
import { Title } from '@/components/ui';
import { Tabs } from '@/components/common';
import { ServiceItem } from '@/components/home';

import styles from './Services.module.css';

const Services: FC = () => {
  const servicesData = [
    {
      tabTitle: 'Разработка',
      content: (
        <ul className={styles.list}>
          {[
            {
              title: 'Визитка',
              description:
                'Компактный сайт для быстрого представления вашей компании. Включает информацию о деятельности и контактные данные.',
            },
            {
              title: 'Лендинг',
              description:
                'Одностраничный сайт для сбора заявок, регистрации или продаж. Раскрывает преимущества продукта, выстраивает доверие и мотивирует посетителей к действию.',
            },
            {
              title: 'Информационный сайт',
              description:
                'Полноценное представительство компании в интернете. Подходит для размещения услуг, преимуществ, новостей, продукции, условий сотрудничества и контактов.',
            },
            {
              title: 'Сайт-каталог',
              description:
                'Структурированная платформа для демонстрации товаров и услуг. Включает карточки товаров, категории, фильтры и форму заказа без онлайн-оплаты',
            },
            {
              title: 'Интернет магазин',
              description:
                'Полноценная онлайн-платформа для продажи товаров или услуг. Включает карточки товаров, категории, фильтрацию, онлайн-оплату, систему управления заказами и дополнительные интеграции. Также предусмотрены возможности для управления ценами, скидками, импорта/экспорта продукции, а также наличие онлайн-консультанта и других виджетов для удобства покупателей.',
            },
          ].map(item => (
            <ServiceItem key={item.title} serviceItem={item} />
          ))}
        </ul>
      ),
    },
    {
      tabTitle: 'Продвижение',
      content: (
        <ul className={styles.list}>
          {[
            {
              title: 'SEO продвижение',
              description:
                'Комплексный анализ вашего сайта и конкурентов. Определяем точки роста и реализуем все технические задачи нашей командой.',
            },
            {
              title: 'Таргет',
              description: 'Настройка рекламы бесплатно — вы платите только за ведение рекламной кампании.',
            },
          ].map(item => (
            <ServiceItem key={item.title} serviceItem={item} />
          ))}
        </ul>
      ),
    },
    {
      tabTitle: 'Другие услуги',
      content: (
        <ul className={styles.list}>
          {[
            {
              title: 'Чат-бот для мессенджера',
              description: 'Создание чат-бота под ваши задачи и цели.',
            },
            {
              title: 'Оформление GetCourse',
              description:
                'Разработка современного дизайна для ключевых страниц и блоков вашей образовательной платформы.',
            },
          ].map(item => (
            <ServiceItem key={item.title} serviceItem={item} />
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section className={styles.root} id={'services'}>
      <Wrapper>
        <div className={styles.inner}>
          <Title className={styles.title} size={'medium'} as={'h2'}>
            Наши услуги
          </Title>
          <Tabs tabItems={servicesData} />
        </div>
      </Wrapper>
    </section>
  );
};

export default Services;
