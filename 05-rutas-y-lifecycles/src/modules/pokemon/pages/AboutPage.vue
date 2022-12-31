<template>
  <h1>About Page</h1>
  <hr />
  <h2>{{name}}</h2>
  <button @click="onChangeName">
    Cambiar nombre
  </button>
</template>

<script>
export default {
  data() {
    return {
      name: "Fernando",
    };
  },
  methods:{
    onChangeName(){
      this.name= "Melissa"
    }
  },
  // para multicopiado tengo que usar ctrl +c.Vim no hace yiw en multiline
  beforeCreate() {
    console.log("beforeCreate triggered");
  },
  created() {
    console.log("created triggered");
  },
  beforeMount() {
    console.log("beforeMount triggered");
  },
  mounted() {
    console.log("mounted triggered");
  },
  beforeUpdate() {
    console.log("beforeUpdate triggered");
  },
  updated() {
    console.log("updated triggered");
  },
  activated() {
    console.log("activated triggered");
  },
  deactivated() {
    console.log("deactivated triggered");
  },
  beforeMount() {
    console.log("beforeMount triggered");
  },
};
</script>
