import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

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
        src: 'favicon.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
    ],
  }
}
