const isAuthenticatedGuard = async (to, from, next) => {
  // console.log({ to }, { from }, { next });
  return new Promise(() => {
    const random = Math.random().toFixed(2) * 100;
    if (random > 50) {
      console.log("autenticado mediante guard de ruta");
      next();
    } else {
      console.log(random, "no autenticao,bacalao");
      next({ name: "pokemon-home" });
    }
  });
};

export default isAuthenticatedGuard;
