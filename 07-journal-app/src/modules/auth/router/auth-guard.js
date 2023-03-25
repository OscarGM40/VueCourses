import store from "@/store";

// recuerda que un Guard es una simple función con acceso a estos argumentos por ser un Guard
export const isAuthenticatedGuard = async (to, from, next) => {
  // fijate como aqui no podemos usar useStore asi que lo traemos sin mas el store con un import(hay varias formas,esto es importante)
  // ya con el store disparamos esta accion asincrona(luego el Guard es async).Sacamos la propiedad 'ok'
  const { ok } = await store.dispatch("auth/checkAuthStatus");

  if (ok) next();
  else next({ name: "login" });
};
