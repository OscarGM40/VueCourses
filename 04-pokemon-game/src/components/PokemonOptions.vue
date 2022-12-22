import Counter from '@/components/Counter.vue';
<template>
  <div class="options-container">
    <ul>
      <li
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        @click="handleSelect(pokemon.id)"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PokemonOptions",
  props: {
    pokemons: {
      type: Array,
      required: true,
      default: [],
    },
    hasSelected: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  methods: {
    handleSelect(pokemonId) {
      // si quiero acceder al método built-in $emit fuera de la template necesito del this
      if(this.hasSelected) return;
      this.$emit('selectPokemon',pokemonId);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
li {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  width: 250px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
