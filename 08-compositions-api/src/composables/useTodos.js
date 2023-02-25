import { useStore } from "vuex";
import { computed, ref } from "vue";

const useTodos = () => {
  const store = useStore();
  const currentTab = ref("all");

  return {
    pending: computed(() => store.getters["pendingTodos"]),
    currentTab,
    getTodosByTab: computed(() => store.getters["getTodosByTab"](currentTab.value)),
    toggleTodo: (id) => store.commit("toggleTodo", id),
  };
};

export default useTodos;
