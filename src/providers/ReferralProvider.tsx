'use client';

import React, { FC, PropsWithChildren } from 'react';
import { setCookie, hasCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';

const ReferralProvider: FC<PropsWithChildren> = ({ children }) => {
  const params = useSearchParams();
  const referrer = params.get('r');

  if (referrer && !hasCookie('referrer')) setCookie('referrer', referrer);

  return <>{children}</>;
};

export default ReferralProvider;
