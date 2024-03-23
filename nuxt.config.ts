import { pwa } from './config/pwa';
import { appDescription, appName } from './constants/index'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    'nuxt-lucide-icons',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    "nuxt-build-cache",
  ],
  experimental: {
    watcher: 'parcel', // 'chokidar' or 'parcel' are also options
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      routes: [
        '/'
      ],
    },
  },
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#F4F4F5' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#09090B' },
      ],
    },

  },
  site: {
    url: 'https://example.com',
    name: appName,
    description: appDescription,
    defaultLocale: 'fa', // not needed if you have @nuxtjs/i18n installed
  },
  robots: {
    // provide simple disallow rules for all robots `user-agent: *`
    disallow: [],
    allow: '*',
  },
  ogImage: {
    defaults: {
      component: 'NuxtSeo',
      props: {
        colorMode: 'dark',
      },
    },

  },
  pwa,
  lucide: {
    namePrefix: 'Icon',
  },
  colorMode: {
    classSuffix: '',
  },
  tailwindcss: {
    viewer: false,
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
})
