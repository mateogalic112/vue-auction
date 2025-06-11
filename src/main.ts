import './index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App).use(router).use(VueQueryPlugin)

app.mount('#app')
