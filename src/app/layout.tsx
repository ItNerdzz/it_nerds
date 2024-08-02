import {Suspense, StrictMode} from 'react';
import type {Metadata} from 'next';
import {Roboto} from 'next/font/google';

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

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
    <body className={roboto.className}>
    <StrictMode>
      <Suspense fallback={'loading..'}>{children}</Suspense>
    </StrictMode>
    <script type="text/javascript" id="hs-script-loader" async defer
            src="//js-eu1.hs-scripts.com/145084163.js"></script>
    </body>
    </html>
  );
}
