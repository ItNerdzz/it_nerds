'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import styles from './Gallery.module.css';

interface GalleryProps {
  images: string[];
}

const Gallery: FC<GalleryProps> = ({ images }) => {
  return (
    <div className={styles.root}>
      <Swiper
        className={styles.swiper}
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={'auto'}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        loop={true}
        grabCursor={true}
        pagination={{ type: 'bullets' }}
      >
        {images.map(item => (
          <SwiperSlide key={item}>
            <Image className={styles.galleryImage} src={item} width={900} height={415} alt={' '} key={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
