import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  app: {
    baseURL: '/2022-lightning-talk/',
    head: {
      link: [
        // Favicon
        {
          rel: 'icon',
          href: '/2022-lightning-talk/icon.png',
        },
        { rel: 'manifest', href: '/2022-lightning-talk/site.webmanifest' },
        // normalize css
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
        },
        // Style
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css',
        },
        // Google Fonts
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'true',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Barlow:wght@500&family=Noto+Sans+TC:wght@100;300;400;700&display=swap',
          crossorigin: 'true',
        },
      ],
    },
  },
  ssr: false,
  nitro: {
    prerender: {
      routes: ['/404.html'],
    },
  },
})
