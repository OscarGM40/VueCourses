import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import dayBookRoutes from '../modules/daybook/router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // this generates a separate chunk (about.[hash].js) for this route
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/daybook',
    ...dayBookRoutes
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
