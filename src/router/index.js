import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { useUsuarioStore } from '@/store/usuario.js'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
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
          component: ()=>import('@/views/AttentionView.vue'),
        },

        {
          path: 'historial-general',
          name: 'historial-general',
          component: ()=>import('@/views/HistoryPatientsView.vue'),
        },

        {
          path: 'historial-usuario',
          name: 'historial-usuario',
          component: ()=>import('@/views/UserView.vue'),
        },
        {
          path: 'historial-personal',
          name: 'historial-personal',
          component: ()=>import('@/views/StaffView.vue'),
        },
        {
          path: 'historial-establecimiento',
          name: 'historial-establecimiento',
          component: ()=>import('@/views/EstablishmentView.vue')
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
