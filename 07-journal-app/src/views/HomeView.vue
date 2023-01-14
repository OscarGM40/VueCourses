<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Hola mundo</h1>

    <button @click="goToDaybook" class="btn btn-primary" type="">Primary</button>
    <button @click="goToDaybook" class="btn btn-secondary" type="">Secondary</button>
    <button @click="goToDaybook" class="btn btn-success" type="">Success</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToDaybook() {
      this.$router.push({ name: "no-entry" });
    },
  },
};
</script>
