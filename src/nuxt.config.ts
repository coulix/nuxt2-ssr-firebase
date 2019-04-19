import NuxtConfiguration from "@nuxt/config";
// const pkg = require("./package");

const config: NuxtConfiguration = {
  mode: "spa",
  debug: true,

  head: {
    title: "Nuxt.js 2 - SSR on Firebase Functions",

    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        property: "og:title",
        content: "Nuxt.js 2 - SSR on Firebase Functions"
      },
      {
        property: "og:description",
        content:
          "Nuxt.js 2 app with SSR using Firebase Cloud Functions and Firebase Hosting. Made by David Royer"
      },
      {
        property: "og:image",
        content: "https://nuxt2ssrfire.firebaseapp.com/site.jpg"
      },
      {
        property: "twitter:card",
        content: "summary_large_image"
      },
      {
        property: "twitter:site",
        content: "@davidroyer_"
      },
      {
        property: "twitter:creator",
        content: "@davidroyer_"
      },
      {
        hid: "description",
        name: "description",
        content:
          "Nuxt.js 2 app with SSR using Firebase Cloud Functions and Firebase Hosting. Made by David Royer"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto"
      },
      {
        rel: "stylesheet",
        href: "https://cdn.muicss.com/mui-0.9.35/css/mui.min.css"
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: "#3B8070"
  },

  manifest: {
    theme_color: "#3B8070"
  },
  /*
   ** Modules
   */
  modules: [],

  /*
   ** Global CSS
   */
  css: ["~/assets/styles/main.css"],
  buildDir: "./../prod/server/nuxt",
  build: {
    publicPath: "/assets/",
    cache: true,

    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },

    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        if (!config.module) return;
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            configFile: '.eslintrc.js'
          }
        });
      }
    }
  }
};

export default config;
