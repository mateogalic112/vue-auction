import './index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Nora from '@primeuix/themes/nora'

const app = createApp(App)
  .use(router)
  .use(VueQueryPlugin)
  .use(PrimeVue, {
    theme: {
      preset: Nora,
    },
  })
  .use(ToastService)

app.mount('#app')
