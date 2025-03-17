import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterUserView from '@/views/RegisterUserView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register_user',
      name: 'registeruser',
      component: RegisterUserView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
  ],
})

export default router
