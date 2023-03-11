<template>
  <h2 v-if="isLoading">Espere por favor...</h2>

  <h2 v-else>Usuarios</h2>
  <h5 v-if="errorMsg">{{ errorMsg }}</h5>

  <div v-if="users.length > 0">
    <ul>
      <!-- fijate que es una destructuración normal(es Javascript simplemente)luego es {prop,prop2} in users -->
      <li v-for="{ first_name, last_name, id, email } in users" :key="id">
        <h4>{{ first_name }} {{ last_name }}</h4>
        <h6>{{ email }}</h6>
      </li>
    </ul>
  </div>

  <button @click="prevPage" v-if="currentPage > 1">Atras</button>
  <button @click="nextPage">Siguiente</button>
  <span>Pagina: {{ currentPage }}</span>
</template>

<script>

import { useUsers } from "@/composables/useUsers";

export default {
  name: "users",

  setup() {
    const {
      users,
      isLoading,
      currentPage,
      errorMsg,
      prevPage,
      nextPage,
    } = useUsers();

    return {
      users,
      isLoading,
      currentPage,
      errorMsg,
      prevPage,
      nextPage,
    }; 
    // return { ...useUsers()}
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  width: 100%;
}

div {
  display: flex;
  justify-content: center;
  text-align: center;
}

ul {
  width: 250px;
}
</style>
