import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // this generates a separate chunk ([name].[hash].js) for this route which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/counter",
    name: "counter",
    // this generates a separate chunk ([name].[hash].js) for this route which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "counter" */ "../views/Counter.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: () => import(/* webpackChunkName: "users" */ "../views/Users.vue"),
  },
  {
    path: "/pokemon-search",
    name: "pokemon-search",
    component: () => import(/* webpackChunkName: "search" */ "../views/SearchPokemon.vue"),
  },
  {
    path: "/pokemon/:id",
    name: "pokemon-id",
    component: () => import(/* webpackChunkName: "pokemon-id" */ "../views/Pokemon.vue"),
  },
  {
    path: "/todo",
    name: "todo",
    component: () => import(/* webpackChunkName: "todo" */ "../views/TodoVuex.vue"),
  },
  {
    path: "/slots",
    name: "slots",
    component: () => import(/* webpackChunkName: "slots" */ "../views/CustomSlots.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
