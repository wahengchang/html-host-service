const pkg = require('./package')

module.exports = {
  mode: 'spa',

  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DB_URL: process.env.FIREBASE_DB_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_MESSAGEING_ID: process.env.FIREBASE_MESSAGEING_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', sizes: '180x180', href: '/site.webmanifest' },
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  pwa: {
    workbox: {
    },
    manifest: {
      "name": "HackerWeb",
      "short_name": "HackerWeb",
      "start_url": ".",
      "display": "standalone",
      "background_color": "#222",
      "description": "A simply readable Hacker News app.",
      "icons": [{
        "src": "/android-chrome-192x192",
        "sizes": "48x48",
        "type": "image/png"
      }, {
        "src": "/android-chrome-192x192",
        "sizes": "72x72",
        "type": "image/png"
      }, {
        "src": "/android-chrome-192x192",
        "sizes": "96x96",
        "type": "image/png"
      }, {
        "src": "/android-chrome-192x192",
        "sizes": "144x144",
        "type": "image/png"
      }, {
        "src": "/android-chrome-192x192",
        "sizes": "168x168",
        "type": "image/png"
      }, {
        "src": "/android-chrome-192x192",
        "sizes": "192x192",
        "type": "image/png"
      }]
    }
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
