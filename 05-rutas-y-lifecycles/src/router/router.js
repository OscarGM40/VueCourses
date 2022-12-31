// import ListPage from "../modules/pokemon/pages/ListPage";
// import AboutPage from "../modules/pokemon/pages/AboutPage";
// import PokemonDetailPage from "../modules/pokemon/pages/PokemonDetailPage.vue";
// import NotFoundPage from "../modules/shared/pages/NotFoundPage.vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/*webpackChunkName: "ListPageChunk"*/ "./../modules/pokemon/pages/ListPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/*webpackChunkName: "AboutPageChunk"*/ "./../modules/pokemon/pages/AboutPage"),
  },
  {
    path: "/pokemon/:id",
    name: "Pokemon",
    component: () =>
      import(
        /*webpackChunkName: "PokemonDetailPageChunk"*/ "./../modules/pokemon/pages/PokemonDetailPage"
      ),
    props: (route) => {
      const id = Number(route.params.id);
      return isNaN(id) ? { id: 1 } : { id: id };
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(/* webpackChunkName: "NotFoundPageChunk" */ "./../modules/shared/pages/NotFoundPage"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
