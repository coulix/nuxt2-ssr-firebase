import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../assets/styles/main.css'


import _6f6c098b from '../layouts/default.vue'

const layouts = { "_default": _6f6c098b }



export default {
  head: {"title":"Nuxtjs SSR on Firebase Functions","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Nuxt.js project"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"nuxt-ssr-firebase-source"},{"hid":"theme-color","name":"theme-color","content":"#3B8070"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"nuxt-ssr-firebase-source"},{"hid":"og:description","name":"og:description","property":"og:description","content":"\u003E Nuxt.js project"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdn.muicss.com\u002Fmui-0.9.35\u002Fcss\u002Fmui.min.css"},{"rel":"manifest","href":"\u002Fassets\u002Fmanifest.18c4f7f1.json"},{"rel":"shortcut icon","href":"\u002Fassets\u002Ficons\u002Ficon_64.9qid3ZBUcQn.png"},{"rel":"apple-touch-icon","href":"\u002Fassets\u002Ficons\u002Ficon_512.9qid3ZBUcQn.png","sizes":"512x512"}],"style":[],"script":[],"htmlAttrs":{"lang":"en"}},
  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  methods: {

    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },


    setLayout(layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      return Promise.resolve(layouts['_' + layout])
    }

  },
  components: {
    NuxtLoading
  }
}
