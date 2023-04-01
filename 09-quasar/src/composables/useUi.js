import { computed } from "vue";
import { useStore } from "vuex";

export const useUI = () => {
  const store = useStore();

  return {
    // esta forma deja la propiedad de solo lectura(computed sin argumentos)
    //  sideMenuOpen: computed(() => store.getters["ui/getSideMenuOpen"]),
    //  sin embargo es posible que necesite acceder al setter,
    sideMenuOpen: computed({
      get() {
        return store.getters["ui/getSideMenuOpen"];
      },
      set(val) {
        // fijate que tengo que cambiarlo a mano,pero la mutation que tenemos me vale
       return store.commit("ui/toggleSideMenu");
      },
    }),
    toogleSideMenu: () => store.commit("ui/toggleSideMenu"),
  };
};
