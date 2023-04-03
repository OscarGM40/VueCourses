const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "typography",
        name: "typography",
        component: () => import("pages/Typography.vue"),
      },
      {
        path: "flex-layout",
        name: "flex-layout",
        component: () => import("pages/Flex.vue"),
      },
      {
        path: "dialogs",
        name: "dialogs",
        component: () => import("pages/Dialogs.vue"),
      },
      {
        path: "forms",
        name: "forms",
        component: () => import("pages/Forms.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "error-page",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
