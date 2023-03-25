<template>
  <h1>Lista de tareas de Thanos</h1>
  <!-- no acceder mediante $store al store -->
  <!-- <h4>Tareas: {{ $store.state.todos.length }}</h4> -->
  <h4>Pendientes: {{ pending.length }}</h4>
  <hr />
  <button @click="currentTab = 'all'" :class="{ active: currentTab === 'all' }">
    Todos
  </button>
  <button @click="currentTab = 'pending'" :class="{ active: currentTab === 'pending' }">
    Pendientes
  </button>
  <button
    @click="currentTab = 'completed'"
    :class="{ active: currentTab === 'completed' }"
  >
    Completados
  </button>

  <div>
    <ul>
      <li
        :class="{ completed: todo.completed }"
        v-for="todo in getTodosByTab"
        :key="todo.id"
        @dblclick="() => toggleTodo(todo.id)"
      >
        {{ todo.text }}
      </li>
    </ul>
  </div>

  <button @click="openModal">Crear todo</button>
  <Modal v-if="isOpen" @click.self="closeModal">
    <template v-slot:header>
      <h2>Add todo</h2>
    </template>

    <template v-slot:body>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="taskDesc" />
        <br />
        <br />
        <button>Submit</button>
      </form>
    </template>

    <template v-slot:footer>
      <br />
      <br />
      <button @click="closeModal">Cerrar</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal.vue";
import useTodos from "../composables/useTodos";
import { ref } from "vue";

export default {
  name: "TodoVuex",
  components: { Modal },
  setup() {
    const isOpen = ref(false);
    const taskDesc = ref("");

    const { currentTab, pending, getTodosByTab, toggleTodo, addTodo } = useTodos();

    const handleSubmit = () => {
      if (!taskDesc.value) return;
      addTodo(taskDesc.value);
      taskDesc.value = "";
      isOpen.value = false;
    };
    /*     const store = useStore();

    const currentTab = ref("all");

    return {
      // fijate que realmente estoy accediendo a store.getters.pendingTodos pero por la nomenclatura de object[key].Podria usar la nomenclatura del punto si quiero
      pending: computed(() => store.getters["pendingTodos"]),
      all: computed(() => store.getters["allTodos"]),
      completed: computed(() => store.getters["completedTodos"]),
      currentTab,
      getTodosByTab: computed(() => store.getters["getTodosByTab"](currentTab.value)),
      toggleTodo: (id) => store.commit('toggleTodo',id),
    }; */

    return {
      currentTab,
      pending,
      getTodosByTab,
      toggleTodo,
      isOpen,
      closeModal: () => (isOpen.value = false),
      openModal: () => (isOpen.value = true),
      handleSubmit,
      taskDesc,
    };
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  text-align: center;
}
ul {
  width: 300px;
  text-align: left;
}
li {
  cursor: pointer;
  font-size: 16px;
}

button {
  border: none;
  padding: 10px 20px;
  margin-right: 5px;
  border-radius: 5px;
  font-weight: 300;
  font-size: 16px;
  text-transform: uppercase;
}

.active {
  background-color: #2c3e50;
  color: white;
}
.completed {
  text-decoration: line-through;
}
</style>
