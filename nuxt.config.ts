// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],
  css: [
    'normalize.css',
    '~/css/scrollbar.css',
    '~/css/global.css',
  ],
})
