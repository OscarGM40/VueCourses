<template>
  <div class="pokemon-container">
    <img
      v-if="!showPokemon"
      :src="imgSrc"
      class="hidden-pokemon"
      alt="pokemon"
    />
    <img
      v-else
      :src="imgSrc"
      class="fade-in"
      alt="pokemon"
    /> 
  </div>
</template>
<script>
export default {
  name: "PokemonPicture",
  props:{
    pokemonId:{
      type: Number,
      required:true
    },
    showPokemon:{
      type: Boolean,
      required:true,
      default:false
    }
  },
  computed:{
    imgSrc(){
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`;
    }
  }
};
</script>

<style scoped>
.pokemon-container {
  height: 200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
}

img {
  height: 200px;
  grid-area: 1/1;
  width: 100%;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}

.hidden-pokemon {
  filter: brightness(0);
}
</style>
