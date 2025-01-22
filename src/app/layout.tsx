import React, { Suspense, StrictMode } from 'react';
import { Roboto } from 'next/font/google';

import { CallToAction } from '@/components/common';
import { Footer, Header } from '@/components/layout';
import { CallBackModal } from '@/components/common';
import ReferralProvider from '@/providers/ReferralProvider';

import type { Metadata } from 'next';

import './styles/globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'IT Nerds',
  description: 'Команда веб разработки',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <body className={roboto.className}>
        <StrictMode>
          <Suspense fallback={'loading..'}>
            <ReferralProvider>
              <Header />
              <main>
                {children}
                <CallToAction />
              </main>
              <Footer />
              <CallBackModal />
            </ReferralProvider>
          </Suspense>
        </StrictMode>
      </body>
    </html>
  );
}
