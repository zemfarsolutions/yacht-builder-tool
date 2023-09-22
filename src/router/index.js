import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Index.vue'
import Builder from '../views/Tool.vue'
import Enquire from '../views/Enquire.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/t/:id',
        name: 'yatch-builder',
        component: Builder
    },
    {
        path: '/enquire-now/:id',
        name: 'enquire-now',
        component: Enquire
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
