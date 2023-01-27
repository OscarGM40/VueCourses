import { defineAsyncComponent } from 'vue';
<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">No hay nada seleccionado</h1>
  </div>
  <Fab icon="fa-plus" @on:click="createNewEntry" />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },
  methods: {
    createNewEntry() {
      this.$router.push({ name: "entry", params: { id: "new" } });
    },
  },
};
</script>

// recuerda que tengo que meter el lang ya que por defecto es CSS
<style lang="scss" scoped>
div {
  height: 100%;
}
</style>
