'use client';

import React, { FC, PropsWithChildren } from 'react';

import useCallbackModalStore from '@/store/useCallbackModalStore';

const CallbackSpan: FC<PropsWithChildren> = ({ children }) => {
  const openModal = useCallbackModalStore(state => state.openModal);

  return (
    <span className={'accent-link'} onClick={openModal} style={{ cursor: 'pointer' }}>
      {children}
    </span>
  );
};

export default CallbackSpan;
