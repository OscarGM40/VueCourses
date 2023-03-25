<template>
  <h2 v-if="isLoading">Espere por favor...</h2>

  <h2 v-else>Usuarios</h2>
  <h5 v-if="errorMsg">{{ errorMsg }}</h5>

  <div v-if="users.length > 0">
  <!-- fijate que :users es imprescindible o "users" será un string.Siempre que mande props debo usar :prop="value" para mandar JS -->
     <UserList :users="users" v-slot:user="{user}">
      <h5>{{ user.first_name }} {{ user.last_name }}</h5>
      <span>{{ user.email }}</span>
     </UserList>
  </div>

  <button @click="prevPage" v-if="currentPage > 1">Atras</button>
  <button @click="nextPage">Siguiente</button>
  <span>Pagina: {{ currentPage }}</span>
</template>

<script>
import { useUsers } from "@/composables/useUsers";
import UserList  from "@/components/UserList.vue";

export default {
  name: "users",
  components: { UserList },
  setup() {
    const { users, isLoading, currentPage, errorMsg, prevPage, nextPage } = useUsers();

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
