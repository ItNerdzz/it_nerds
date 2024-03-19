'use client';
import React, { FC, useState, useEffect, useRef } from 'react';
//@ts-ignore
import HALO from 'vanta/dist/vanta.halo.min';

import styles from './Halo.module.css';

const Halo: FC = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  const getVantaOptions = () => {
    const windowWidth = window.innerWidth;

    let size = 0.8;
    let xOffset = 0;
    let yOffset = 0.15;

    if (windowWidth >= 1024) {
      size = 1;
      xOffset = 0.2;
      yOffset = 0.1;
    }

    const options = {
      el: myRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      baseColor: 0x7c3aed,
      backgroundColor: 0x171717,
      amplitudeFactor: 3.0,
      size: size,
      xOffset: xOffset,
      yOffset: yOffset,
    };

    return options;
  };

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(HALO(getVantaOptions()));
    }
    return () => {
      //@ts-ignore
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return <div className={styles.root} ref={myRef} />;
};

export default Halo;
