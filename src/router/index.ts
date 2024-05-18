import { createRouter, createWebHashHistory } from 'vue-router'
import TodosView from '../views/TodosView.vue';

const router = createRouter({
  history: createWebHashHistory(),
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

