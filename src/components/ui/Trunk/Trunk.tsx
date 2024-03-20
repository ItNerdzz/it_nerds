'use client';
import React, { FC, useState, useEffect, useRef } from 'react';
import p5 from 'p5';
import * as THREE from 'three';
import TRUNK from 'vanta/dist/vanta.trunk.min';

import styles from './Trunk.module.css';

const Trunk: FC = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  const getVantaOptions = () => {
    const options = {
      el: myRef.current,
      THREE,
      p5,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x727272,
      backgroundColor: 0x171717,
      chaos: 1.0,
      yOffset: 10.0,
    };

    return options;
  };

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(TRUNK(getVantaOptions()));
    }
    return () => {
      // @ts-ignore
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div className={styles.root} ref={myRef} />;
};

export default Trunk;
