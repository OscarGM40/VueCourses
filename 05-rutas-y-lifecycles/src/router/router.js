// import ListPage from "../modules/pokemon/pages/ListPage";
// import AboutPage from "../modules/pokemon/pages/AboutPage";
// import PokemonDetailPage from "../modules/pokemon/pages/PokemonDetailPage.vue";
// import NotFoundPage from "../modules/shared/pages/NotFoundPage.vue";

import { createRouter, createWebHashHistory } from "vue-router";
import isAuthenticatedGuard from "./authGuard";

const routes = [
  {
    path: "/",
    redirect: "/pokemon",
  },
  // child router One
  {
    path: "/pokemon",
    name: "pokemon",
    component: () =>
      import(/*webpackChunkName: "PokemonLayout"*/ "./../modules/pokemon/layouts/PokemonLayout"),
    children: [
      {
        path: "home",
        name: "pokemon-home",
        component: () =>
          import(/*webpackChunkName: "ListPageChunk"*/ "./../modules/pokemon/pages/ListPage"),
      },
      {
        path: "about",
        name: "pokemon-about",
        component: () =>
          import(/*webpackChunkName: "AboutPageChunk"*/ "./../modules/pokemon/pages/AboutPage"),
      },
      {
        path: "pokemon/:id",
        name: "pokemon-id",
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
        path: "",
        redirect: { name: "about" },
      },
    ],
  },
  // child router Two
  {
    path: "/dbz",
    name: "dbz",
    beforeEnter: [isAuthenticatedGuard],
    component: () =>
      import(/*webpackChunkName: "DBZLayout"*/ "./../modules/dragonball/layouts/DragonBallLayout"),
    children: [
      {
        path: "characters",
        name: "dbz-characters",
        component: () =>
          import(/*webpackChunkName: "DBZCharacters"*/ "./../modules/dragonball/pages/Characters"),
      },
      {
        path: "about",
        name: "dbz-about",
        component: () =>
          import(/*webpackChunkName: "DBZAbout"*/ "./../modules/dragonball/pages/About"),
      },
      {
        path: "",
        redirect: { name: "dbz-characters" },
      },
    ],
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
// GUARD GLOBAL SINCRONO
/* router.beforeEach((to, from, next) => {
  // console.log({ to }, { from }, { next });
  const rnd = Math.random().toFixed(2) * 100;
  if(rnd > 50){
    console.log('autenticado');
    next()
  }else {
    console.log(rnd,'bloqueado por el beforeEach Guard')
    next({name:'pokemon-home'})
  }
}); */

const canAccess = () => {
  return new Promise((resolve, reject) => {
    const rnd = Math.random().toFixed(2) * 100;
    if (rnd > 50) {
      console.log("autenticado mediante async canAccess");
      resolve(true);
    } else {
      console.log(rnd, "bloqueado por el beforeEach Guard");
      resolve(false);
      // next({name:'pokemon-home'})
    }
  });
};
// GUARD GLOBAL ASINCRONO
/* router.beforeEach(async (to, from, next) => {
  const authorized = await canAccess();
  authorized ? next() : next({ name: "pokemon-home" });
}); */

export default router;
