export default {
  // fijate que no he necesitado el path aqui(porque hay una ruta solo??)
  // path:'',
  name: "auth",
  component: () => import(/* webpackChunkName: "auth" */ "@/modules/auth/layouts/AuthLayout.vue"),
  children: [
    {
      path: "",
      name: "login",
      component: () => import("@/modules/auth/views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/modules/auth/views/Register.vue"),
    },
  ],
};
