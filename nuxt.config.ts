export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  alias: {
    css: '/<rootDir>/assets/scss',
  },
  vite: {
    logLevel: 'error',
  },
  modules: ['@nuxt/image', '@nuxt/icon'],

  css: ['@/assets/styles.scss'],

  app: {
    head: {
      title: 'Cubos',
      htmlAttrs: {
        lang: 'pt',
      },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        { hid: 'description', name: 'description', content: 'Cubos' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'copyright', content: 'All rights reserved' },
        { name: 'keywords', content: 'Cubos' },
        // Metas Facebook
        { property: 'og:article:author', content: 'Cubos' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Cubos' },
        { property: 'og:updated_time', content: '1440432930' },
        { property: 'og:title', content: 'Cubos' },
        { property: 'og:description', content: 'Cubos' },
        {
          property: 'og:image',
          content: `/img/logo-cubos.svg`,
        },
        { property: 'og:url', content: `'Cubos'` },
      ],
      charset: 'utf-8',
      viewport:
        'width=device-width, initial-scale=1.0, user-scalable=yes, content="user-scalable=no", viewport-fit=cover',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `/img/logo-cubos.svg`,
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200;12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Manrope:wght@200;300;400;500;600;700;800&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Marcellus&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Marcellus&display=swap',
        },
      ],
    },
  },
})
