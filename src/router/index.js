import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Index.vue'
import Builder from '../views/Tool.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/yatch-builder-tool',
        name: 'Yatch Builder',
        component: Builder
    }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
