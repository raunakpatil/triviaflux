
import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TriviaFlux Knowledge Engine',
    short_name: 'TriviaFlux',
    description: 'Retro-Futuristic Knowledge Engine. Real-time data comparison game.',
    start_url: '/',
    display: 'standalone',
    background_color: '#08090E',
    theme_color: '#00E5A0',
    icons: [
      {
        src: 'https://picsum.photos/seed/tf-icon/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/tf-icon-large/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
