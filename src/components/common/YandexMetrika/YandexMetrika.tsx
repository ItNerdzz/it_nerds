'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = `${pathname}?${searchParams}`;
    // @ts-ignore
    window.ym('96660916', 'hit', url);
  }, [pathname, searchParams]);

  return null;
}
