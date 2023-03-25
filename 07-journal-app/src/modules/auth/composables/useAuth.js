import { computed } from "vue";
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

  const checkAuthStatus = async () => {
    return await store.dispatch("auth/checkAuthStatus");
  };

  const logout = () => {
    store.commit('auth/logout')
    // limpiar las entradas
    store.commit('journal/clearEntries')
  }
  return {
    createUser,
    loginUser,
    checkAuthStatus,
    authStatus: computed(() => store.getters["auth/currentState"]),
    username: computed(() => store.getters["auth/getUsername"]),
    logout
  };
};
