<template>
  <div class="entry-list-container">
    <div class="px-2 py-2">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar entrada"
        v-model="term"
      />
    </div>
    <div class="mt-2 d-flex flex-column">
      <button
        class="btn btn-primary mx-3"
        @click="$router.push({ name: 'entry', params: { id: 'new' } })"
      >
        <i class="fa fa-plus-circle px-2"></i>
        Nueva entrada
      </button>
    </div>
    <div class="entry-scrollarea">
      <!-- fijate que fácil crear un bucle sin una colección pasando un Number(v-for="item in 50") -->
      <!-- <Entry v-for="entry in $store.getters['journal/getEntriesByTerm']" :key="entry" /> -->
      <Entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Entry: defineAsyncComponent(() => import("./Entry.vue")),
  },
  computed: {
    // otra forma era ...mapGetters({ entries: "journal/getEntriesByTerm"}),
    ...mapGetters("journal", ["getEntriesByTerm"]),
    entriesByTerm() {
      return this.getEntriesByTerm(this.term);
    },
  },
  data() {
    return {
      term: "",
    };
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
