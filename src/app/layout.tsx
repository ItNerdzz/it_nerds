import React, { Suspense, StrictMode } from 'react';
import { Roboto } from 'next/font/google';
import Script from 'next/script';

import { CallToAction, YandexMetrika } from '@/components/common';
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
        <Script id='metrika-counter' strategy='afterInteractive'>
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
 
              ym(96660916, "init", {
                    defer: true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
              });`}
        </Script>
        <StrictMode>
          <Suspense fallback={<></>}>
            <YandexMetrika />
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
