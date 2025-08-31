/* Importamos la libreria de coreIU */
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
/* pinia */
import { createPinia } from 'pinia'
// Importa TODOS los íconos de CoreUI
import { CIcon } from '@coreui/icons-vue'
import * as iconSet from '@coreui/icons'
import '@/assets/styles/palet.css'

const pinia = createPinia();
const app = createApp(App)

app.component('CIcon', CIcon)
app.provide('icons', iconSet)

app.use(router)
.use(pinia)
.mount('#app')
