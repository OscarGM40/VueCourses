<template lang="">
  <button class="btn btn-primary" @click="$emit('on:click')"> 
  <!-- forma Uno: con una computed property -->
  <!-- <i :class="parseClass"></i> --> 
  <!-- forma dos: usando class + :class -->
  <i 
    class="fa fa-2x"
    :class="icon"></i> </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "fa-plus",
    },
  },
  computed: {
    parseClass() {
      return "fa fa-2x " + this.icon;
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
