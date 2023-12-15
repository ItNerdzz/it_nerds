import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import StyledComponentsRegistry from '../lib/StyledComponentsRegistry';
import ThemeClient from '../lib/ThemeClient';
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
    <html lang='en'>
      <body className={roboto.className}>
        <StyledComponentsRegistry>
          <ThemeClient>{children}</ThemeClient>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
