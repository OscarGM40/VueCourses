<template>
  <div class="home">
    <h1>Reactive vs Ref</h1>
    <h3>{{ ironman }}</h3>
    <h3>{{ hulk }}</h3>
    <button @click="changeIronman">Change Ironman</button>
    <button @click="changeHulk">Change Hulk</button>
    <br />
    <br />
    <h3>Ironman is alive: {{ ironmanIsAlive }}</h3>
    <h3>Hulk is alive: {{ hulkIsAlive }}</h3>
    <button @click="changeStatus">Change Status</button>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  name: "home",
  props: {},
  emits: [],

  setup() {
    const ironman = ref({ name: "Tony", age: 50 });
    const hulk = reactive({ name: "Bruce", age: 45 });

    const ironmanIsAlive = reactive(false);
    const hulkIsAlive = ref(true);

    const changeStatus = () => {
      // esto es una reasignación de una constante y no hará nada(al menos no rompe la app,pero no va a hacer nada)
      // ironmanIsAlive = !ironmanIsAlive;
      hulkIsAlive.value = !hulkIsAlive.value;
    };

    return {
      ironman,
      hulk,
      ironmanIsAlive,
      hulkIsAlive,
      changeIronman: () => {
        ironman.value.name = "Tony Stark";
        ironman.value.age = 55;
      },
      changeHulk: () => {
        (hulk.name = "Bruce Banner"), (hulk.age = 44);
      },
      changeStatus,
    };
  },
};
</script>
