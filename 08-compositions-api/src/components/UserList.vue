<template>
  <ul>
    <!--     <li v-for="user in users" :key="user.id">
      <h5>Hola mundo</h5>
    </li> -->
    <!-- de nuevo debe ser :key porque si no user.id no lo entenderia Vue -->
    <slot v-for="user in users" :key="user.id" :user="user" name="user"></slot>
  </ul>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
ul {
  list-style: none;
}
</style>
