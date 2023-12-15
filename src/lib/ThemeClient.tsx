'use client';

import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../themes/defaultTheme';

export default function ThemeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}
