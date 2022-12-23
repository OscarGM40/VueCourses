<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>¿Quién es este pokémon?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions
      :pokemons="pokemonArr"
      @select-pokemon="checkAnswer($event)"
      :hasSelected="hasSelected"
    />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ this.message }}</h2>
      <button @click="newGame">Nuevo juego</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from "./../components/PokemonPicture";
import PokemonOptions from "./../components/PokemonOptions";

import getPokemonOptions from "./../helpers/getPokemonOptions";

export default {
  name: "PokemonPage",
  // recuerda que la data es una función que devuelve un objeto reactivo
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
      hasSelected: false,
    };
  },
  methods: {
    async mixPokemonArray() {
      try {
        this.pokemonArr = await getPokemonOptions();
        // fijate que si imprimo una props tiene varias propiedades(la data esta en target)
        // console.table(this.pokemonArr)
        // para obtener un numero random entre 0 y 3 se usa Math.floor(Math.random() * 4) <- dado que el rango es desde 0.00001 hasta 3.99999 al bajarlo con floor me sale entre 0 y 3 además con las mismas probabilidades
        const rndInt = Math.floor(Math.random() * 4);
        // agarro un pokemon de forma aleatoria
        this.pokemon = this.pokemonArr[rndInt];
      } catch (e) {
        // console.log("Error in the request: ", e);
        this.pokemonArr = [];
      }
    },
    checkAnswer(selectedId) {
      this.hasSelected = true;
      this.showAnswer = true;
      this.showPokemon = true;
      this.message =
        selectedId === this.pokemon.id
          ? `Correcto, es ${this.pokemon.name}!`
          : `Oops, era ${this.pokemon.name} ...`;
    },
    async newGame() {
      console.log('calling the original')
      this.pokemon = null;
      this.pokemonArr = [];
      this.showPokemon = false;
      this.showAnswer = false;
       this.hasSelected = false;
      this.message = "";
      await this.mixPokemonArray();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
  components: {
    PokemonPicture,
    PokemonOptions,
  },
};
</script>
