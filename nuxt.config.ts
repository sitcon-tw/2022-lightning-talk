import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  app: {
    baseURL: '/2022-lightning-talk/',
    head: {
      link: [
        // Favicon
        {
          rel: 'icon',
          type: 'image/svg',
          href: '/2022-lightning-talk/favicon.svg',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/2022-lightning-talk/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/2022-lightning-talk/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/2022-lightning-talk/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/2022-lightning-talk/site.webmanifest' },
        // Google Fonts
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'true',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Barlow:wght@500&family=Noto+Sans+TC:wght@100;300;400',
          crossorigin: 'true',
        },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ['/404.html'],
    },
  },
})
