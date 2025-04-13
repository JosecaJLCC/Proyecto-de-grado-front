/* Importamos la libreria de coreIU */
/* import '@coreui/coreui/dist/css/coreui.min.css' */
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
/* pinia */
import { createPinia } from 'pinia'

const pinia = createPinia();
const app = createApp(App)

app.use(router)
.use(pinia)
.mount('#app')
