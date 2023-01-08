<template>
  <div class="entry-list-container">
    <div class="px-2 py-2">
      <input type="text" class="form-control" placeholder="Buscar entrada" />
    </div>
    <div class="entry-scrollarea">
      <!-- fijate que fácil crear un bucle sin una colección pasando un Number(v-for="item in 50") -->
      <Entry v-for="entry in 10" :key="entry" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    Entry: defineAsyncComponent(() => import("./Entry.vue")),
  },
};
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}

.entry-scrollarea {
  height: calc(100vh - 111px);
  overflow: auto;
}
</style>
