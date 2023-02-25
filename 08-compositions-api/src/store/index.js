import { createStore } from "vuex";

export default createStore({
  state: {
    todos: [
      { id: "1", text: "Recolectar las piedras del infinito", completed: false },
      { id: "2", text: "Piedra del alma", completed: true },
      { id: "3", text: "Piedra de poder", completed: true },
      { id: "4", text: "Piedra de realidad", completed: false },
      { id: "5", text: "Conseguir nuevos secuaces competentes", completed: false },
    ],
  },
  getters: {
    // name(stateOfThisModule,otherGetters,mainState)
    // en este caso el state del modulo es el general,luego el arg 1 y 3 son lo mismo
    pendingTodos(state, getters, rootState) {
      return state.todos.filter((todo) => !todo.completed);
    },
    allTodos(state, getters, rootState) {
      // console.log(state,getters,rootState)
      return state.todos;
    },
    completedTodos(state, getters, rootState) {
      return state.todos.filter((todo) => todo.completed);
    },
    // por convencion un guion bajo significa que el argumento es obligatorio pero no lo voy a usar.
    // IMPORTANTE: para poder usar un getter como una funcion tengo que usar una closure,haciendo que la primera funcion que accedia al state retorne otra función
    getTodosByTab: (_, getters) => (tab) => {
      switch (tab) {
        case "all":
          return getters["allTodos"];
        // ojo que son referencias a las funciones,y no hay que llamarlas para nada
        case "completed":
          return getters.completedTodos;
        case "pending":
          return getters.pendingTodos;
      }
    },
  },
  mutations: {
    toggleTodo(state, id) {
      // console.log({idInMutation:id})
      // porqué hay que iterar para que mute <-porque es un arreglo subnormal 
      const todoIdx = state.todos.findIndex( todo => todo.id === id);
      state.todos[todoIdx].completed = !state.todos[todoIdx].completed
    },
  },
  actions: {},
  modules: {},
});
