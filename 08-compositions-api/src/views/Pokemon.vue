<template>
  <h1 v-if="!pokemon && !errorMessage">Buscando...</h1>
  <!-- fijate en el v-else-if que tendrá preferencia al v-else -->
  <h1 v-else-if="errorMessage">{{ errorMessage }}</h1>

  <!-- fijate la importancia del v-else,asinto -->
  <template v-else>
    <h3>{{ pokemon.name }}</h3>
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
    <router-link :to="{ name: 'pokemon-search' }">Regresar</router-link>
  </template>
</template>
<script>
import usePokemon from "../composables/usePokemon";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { watch } from "vue";

export default {
  setup() {
    const route = useRoute();
    const { pokemon, isLoading, errorMessage, searchPokemon } = usePokemon(
      route.params.id
    );

    // watch(cb1,cb2) donde cb1 devuelve la parte reactiva a observar y cb2 la lógica a aplicar.Recuerda que es mala práctica observar todo el objeto route y no la prop concreta
    watch(
      () => route.params.id,
      () => searchPokemon(route.params.id)
    );
    onBeforeRouteLeave(() => {
      // window.confirm: boolean devuelve un bool segun el boton clickado
      const answer = window.confirm('Estas seguro que deseas salir?')
      console.log(answer)
      if(!answer) return false;
    })
    // fijate que el return debe ser la última sentencia del setup
    return {
      pokemon,
      isLoading,
      errorMessage,
    };
  },
};
</script>
