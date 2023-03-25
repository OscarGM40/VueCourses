<template>
  <h1>Counter - Vuex</h1>
  <h2>Direct access: {{ $store.state.counter.count }}</h2>
  <h2>Computed {{ countComputed }}</h2>
  <h2>ShitComputed {{ anotherShitComputed }}</h2>
  <h1>Map State</h1>
  <h2>mapState: {{ counter }}</h2>
  <h2>lastMutation: {{ lastMutation }}</h2>
  <h2>Direct getter:{{ $store.getters['counter/squareCount']}} </h2>

<button @click="increment" :disabled="isLoading" >Increment +1</button>
<button @click="incrementBy" :disabled="isLoading">Increment +5</button>
<button @click="randomInt" :disabled="isLoading">Random</button>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

// console.log(mapState('counter'["count","lastMutation","isLoading"]));
// console.log(mapActions(["incrementRandomInt"]));

export default {
  methods:{
    increment(){
      this.$store.commit('counter/increment'); // ojo es el nombre de la mutación
    },
    incrementBy(){
      this.$store.commit('counter/incrementBy',5); // ojo es el nombre de la mutación(con el modulo prefijado)
    },
/*     incrementRandomInt(){
      this.$store.dispatch('incrementRandomInt')
    }, */
    // forma Uno
    // ...mapActions(['incrementRandomInt'])
    // forma Dos que permite renombrar
    ...mapActions({
      randomInt: 'counter/incrementRandomInt'
    })
  },
  computed: {
    countComputed() {
      return this.$store.state.counter.count;
    },
    anotherShitComputed() {
      return this.countComputed;
    },
    ...mapState({
      counter: state => state.counter.count,
      lastMutation: state => state.counter.lastMutation,
      isLoading: state => state.counter.isLoading
    }),
  },
};
</script>

<style></style>
