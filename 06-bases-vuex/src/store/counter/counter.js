import state from "./state";
// import { increment, incrementBy, setLoading } from "./mutations";
import * as mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";

const counterStore = {
  // propiedad casi obligatoria
  namespaced: true,
  // dado que counterStore es un simple objeto,para que su propiedad state sea reactiva tengo que usar una funcion que devuelva un objeto como valor
  /*   state: () => ({
    count: 1,
    lastMutation: "none",
    isLoading: false,
    lastRandomInt: 0,
  }), */
  state: state,
  /* mutations: {
    increment,
    incrementBy,
    setLoading,
  }, */
  mutations:mutations,
  // actions:{incrementRandomInt},
  actions:actions,
  getters:getters
/*   actions: {
    // en el caso de una acción lo que recibe como primer argumento es un context,y no un state.El context tiene la referencia sobre el store(o módulo en el que me encontrara,en este caso es el store ya que no hay slices)

    async incrementRandomInt({ commit }) {
      // mejor desestructurar el context,asinto

      // recuerda que una acción no puede mutar el state,eso solo lo puede hacer una mutation
      // state.loading = true <- no se puede con una action

      // DESDE UNA ACTION TENGO QUE USAR EL CONTEXT PARA ACCEDER A UNA MUTATION QUE CAMBIE EL STATE
      commit("setLoading", true);
      const randomInt = await getRandomInt();
      commit("incrementBy", randomInt);
      commit("setLoading", false);
    },
  }, */
 /*  getters: {
    squareCount(state) {
      return state.count * state.count;
    },
  }, */
};
export default counterStore;
