import { createStore } from "vuex";
import counterStore from "./counter/counter";
// tmb podia usar const store = createStore({}) pero siendo tan simple esta app usamos un exp default
const store = createStore({
  modules: {
    counter: counterStore,
  },
});

export default store;
