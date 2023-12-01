// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],
  css: [
    'normalize.css',
    'simple-global-scrollbar.css',
    '~/assets/css/global.css',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh',
      },
    },
  },
})
