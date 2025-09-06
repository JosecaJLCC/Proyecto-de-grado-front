import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import NewUserView from '@/views/NewUserView.vue'
import HomeView from '@/views/HomeView.vue'
import NewAttentionView from '@/views/NewAttentionView.vue'
import GeneralHistoryView from '@/views/HistoryPatientsView.vue'

import MainLayout from '@/layouts/MainLayout.vue'

import { useUsuarioStore } from '@/store/usuario.js'
import HistoryUsersView from '@/views/HistoryUsersView.vue'

import PatientView from '@/views/PatientView.vue'
import NewStaffView from '@/views/NewStaffView.vue'


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
          component: ()=>import('@/views/HomeView.vue'),
        },
        /* despues de datos personales viene datos de direccion */
        {
          path: 'nuevo-registro',
          name: 'nuevo-registro',
          component: NewAttentionView,
        },
        {
          path: 'datos-paciente/:id',
          name: 'datos-paciente',
          component: PatientView,
        },
        {
          path: 'historial-general',
          name: 'historial-general',
          component: GeneralHistoryView,
        },

        {
          path: 'registrar-usuario/:id',
          name: 'registrar-usuario',
          component: NewUserView,
        },
        {
          path: 'registrar-personal',
          name: 'registrar-personal',
          component: NewStaffView,
        },
        {
          path: 'historial-usuarios',
          name: 'historial-usuarios',
          component: HistoryUsersView,
        },
        {
          path: 'historial-microred',
          name: 'historial-microred',
          component:()=>import('@/views/MicroredView.vue')
        },
      ]
    },

  ],
})

/* router.beforeEach(async (to, from, next) => {
  const usuarioStore = useUsuarioStore()
  const token = localStorage.getItem('token')

  if (token && !usuarioStore.usuario) {
    await usuarioStore.cargarUsuario()
  }

  next()
}) */

export default router;
