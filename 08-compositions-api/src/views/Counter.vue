<template>
  <h1>Counter View</h1>
  <h2>{{ counter }}</h2>
  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
</template>
<script>
import { useCounter } from "@/composables/useCounter";
export default {
  name: "counter",
  props: {},
  emits: [],

  setup() {
    // fijate que usar un composable es lo mejor,ya que abstraigo la lógica y la dejo reusable(dos por uno)
    const { counter, increment, decrement } = useCounter(5);
    return { counter, increment, decrement };

    // const counter = ref(5);
    
    // FORMA UNO declarar las funciones aqui
    /*     const increment = () => {
      return counter.value++;
    };

    const decrement = () => {
      return counter.value--;
    }; */
    // FORMA DOS aprovechar que el return es un objeto para no definir las funciones(no creo que sea muy útil en la vida real esto)
    /*     return {
      counter,
      increment: () => counter.value++,
      decrement: () => counter.value--,
    }; */
  },
};
</script>
<style></style>
