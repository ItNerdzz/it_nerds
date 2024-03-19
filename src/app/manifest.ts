import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IT Nerds | Разработка сайтов любого уровня сложности',
    short_name: 'IT Nerds | Разработка сайтов',
    description: 'Разработка сайтов любого уровня сложности',
    start_url: '/',
    display: 'standalone',
    background_color: '#282828',
    theme_color: '#282828',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      { src: './favicons/192.png', type: 'image/png', sizes: '192x192' },
      { src: './favicons/512.png', type: 'image/png', sizes: '512x512' },
    ],
  };
}
