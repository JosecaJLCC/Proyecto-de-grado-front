import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import NewUserView from '@/views/NewUserView.vue'
import HomeView from '@/views/HomeView.vue'
import NewPatientView from '@/views/NewPatientView.vue'
import NewAttentionView from '@/views/NewAttentionView.vue'
import GeneralHistoryView from '@/views/GeneralHistoryView.vue'

import MainLayout from '@/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/app',
      component: MainLayout,
      children:[
        {
          path: 'inicio',
          name: 'inicio',
          component: HomeView,
        },
        {
          path: 'nuevo-paciente',
          name: 'nuevo-paciente',
          component: NewPatientView,
        },
        /* despues de datos personales viene datos de direccion */

        {
          path: 'nuevo-registro',
          name: 'nuevo-registro',
          component: NewAttentionView,
        },
        {
          path: 'historial-general',
          name: 'historial-general',
          component: GeneralHistoryView,
        },

        {
          path: 'registrar-usuario',
          name: 'registrar-usuario',
          component: NewUserView,
        },
      ]
    },

  ],
})

export default router;
