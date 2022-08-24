import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  app: {
    baseURL: '/2022-lightning-talk/',
  },
  nitro: {
    prerender: {
      routes: ['/404.html'],
    },
  },
})
