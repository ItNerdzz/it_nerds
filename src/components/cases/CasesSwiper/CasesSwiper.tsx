'use client';

import React, { FC, useRef } from 'react';
import clsx from 'clsx';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import ArrowIcon from '/public/assets/images/icons/arrow.svg';

import { Wrapper } from '@/components/layout';
import { Button, Title } from '@/components/ui';
import CasePreview from '@/components/cases/CasePreview/CasePreview';
import { casesData } from '@/data';

import styles from './CasesSwiper.module.css';

const CasesSwiper: FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!casesData || !casesData.length) return null;

  return (
    <section className={styles.root} id={'cases'}>
      <Wrapper>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <Title size={'medium'} as={'h2'}>
              Проекты в которых мы участвовали
            </Title>
            <div className={styles.swiperNav}>
              <Button
                className={clsx(styles.swiperNavButton, styles.swiperNavButtonPrev)}
                onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
                size={'big'}
                isAlt={true}
              >
                <ArrowIcon />
              </Button>
              <Button
                className={clsx(styles.swiperNavButton, styles.swiperNavButtonNext)}
                onClick={() => swiperRef.current && swiperRef.current.slideNext()}
                size={'big'}
                isAlt={true}
              >
                <ArrowIcon />
              </Button>
            </div>
          </div>
          <Swiper
            className={styles.swiper}
            spaceBetween={20}
            slidesPerView={'auto'}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
              1440: {
                slidesPerView: 4,
              },
            }}
            onBeforeInit={swiper => {
              swiperRef.current = swiper;
            }}
          >
            {casesData
              .slice()
              .reverse()
              .map(casesItem => (
                <SwiperSlide key={casesItem.id}>
                  <CasePreview className={styles.preview} casesPost={casesItem} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </Wrapper>
    </section>
  );
};

export default CasesSwiper;
