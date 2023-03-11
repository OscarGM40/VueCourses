import { useStore } from "vuex";

export const useAuth = () => {
  const store = useStore();

  const createUser = async (user) => {
    // ojo que es una accion asincrona y debo usar await
    return await store.dispatch("auth/createUser", user);
  };

  const loginUser = async (user) => {
    // ojo que es una accion asincrona y debo usar await
    return await store.dispatch("auth/signInUser", user);
  };

  return {
    createUser,
    loginUser,
  };
};
