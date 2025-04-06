
/* Importamos la libreria de coreIU */
/* import '@coreui/coreui/dist/css/coreui.min.css' */
import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
