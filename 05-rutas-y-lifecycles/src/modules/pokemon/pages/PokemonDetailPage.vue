<template>
  <h1>
    Pokemon Detail Page <span>El id es {{ this.id }}</span>
  </h1>
  <div v-if="pokemon">
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      pokemon: null,
    };
  },
  created() {
    // si bien hay gente que llama a una petición inicial en el mounted,la recomendación es en el created,ya que el componente estará montado y listo para su manipulación y reacción del mismo(el created va un poco despues del mounted pues)
    this.getPokemon();
  },
  methods: {
    async getPokemon() {
      try {
        const pokemon = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${this.id}`
        ).then((r) => r.json());
        console.log(pokemon);
        this.pokemon = pokemon;
      } catch (e) {
        // no quiero imprimir el error,dado que no hay un pokemon el usuario no tiene nada que hacer aqui y le vamos a redireccionar
        this.$router.push({ name: 'home' });
      }
    },
  },
  watch: {
    id() {
      this.getPokemon();
    },
  },
};
</script>
