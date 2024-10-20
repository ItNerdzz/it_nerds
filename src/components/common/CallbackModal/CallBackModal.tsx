'use client';

import React, { FC, useRef } from 'react';
import clsx from 'clsx';

import useCallbackModalStore from '@/store/useCallbackModalStore';

import CloseIcon from '/public/assets/images/icons/cross.svg';

import { Title } from '@/components/ui';
import { CallbackForm } from '@/components/common';

import styles from './CallbackModal.module.css';

const CallBackModal: FC = () => {
  const isOpen = useCallbackModalStore(state => state.isOpen);
  const closeModal = useCallbackModalStore(state => state.closeModal);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (evt: React.MouseEvent<HTMLElement>) => {
    if (evt.target !== modalRef.current) return;

    closeModal();
  };

  const classNames = clsx(styles.root, isOpen && styles.opened);

  return (
    <section className={classNames} onClick={handleOutsideClick} ref={modalRef}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <Title className={styles.title} size={'small'}>
            Оставьте свои контактные данные
          </Title>
          <button className={styles.close} onClick={closeModal}>
            <CloseIcon className={styles.closeIcon} />
          </button>
        </div>
        <div className={styles.contnet}>
          <CallbackForm />
        </div>
      </div>
    </section>
  );
};

export default CallBackModal;
