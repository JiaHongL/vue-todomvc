import { createRouter, createWebHistory } from 'vue-router'
import TodosView from '../views/TodosView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/:filter',
      component: TodosView
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/all'
    }
  ]
})

export default router

