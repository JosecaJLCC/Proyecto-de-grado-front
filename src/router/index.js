import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { useUsuarioStore } from '@/store/usuario.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: () => import('@/views/LandingPage.vue'),
    },
    {
      path: '/login',
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
          component: ()=>import('@/views/PatientView.vue'),

        },
        {
          path: 'historial-usuario',
          name: 'historial-usuario',
          component: ()=>import('@/views/UserView.vue'),
            meta: { rol: 1 } // SOLO ADMIN

        },
        {
          path: 'historial-personal',
          name: 'historial-personal',
          component: ()=>import('@/views/StaffView.vue'),
            meta: { rol: 1 } // SOLO ADMIN

        },
        {
          path: 'historial-establecimiento',
          name: 'historial-establecimiento',
          component: ()=>import('@/views/EstablishmentView.vue'),
            meta: { rol: 1 } // SOLO ADMIN

        },
        {
          path: 'historial-microred',
          name: 'historial-microred',
          component:()=>import('@/views/MicroredView.vue')
        },
        {
          path: 'reportes',
          name: 'reportes',
          component:()=>import('@/views/ReportView.vue'),
            meta: { rol: 1 } // SOLO ADMIN

        },
        {
          path: 'auditoria',
          name: 'auditoria',
          component:()=>import('@/views/AuditView.vue'),
            meta: { rol: 1 } // SOLO ADMIN

        },
      ]
    },

  ],
})

router.beforeEach(async (to, from, next) => {
  const usuarioStore = useUsuarioStore()

  // Si hay token y no hay usuario, lo cargamos
  if (localStorage.getItem('token') && !usuarioStore.usuario) {
    await usuarioStore.cargarUsuario()
  }
  const rol = usuarioStore.usuario?.id_rol

  // ✅ Ruta protegida solo para ADMIN (id_rol === 1)
  if (to.meta.rol === 1 && rol !== 1) {
    return next({ name: 'inicio' })
  }
  next()
})

export default router;
