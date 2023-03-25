import { ref } from "vue";
import axios from "axios";

const usePokemon = (pokemonId = "1") => {
  const pokemon = ref();
  const isLoading = ref(false);
  const errorMessage = ref();

  const searchPokemon = async (id) => {
    if (!id) return;

    isLoading.value = true;
    pokemon.value = null;

    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      pokemon.value = data;
      errorMessage.value = null;
    } catch (error) {
      errorMessage.value = "No se pudo cargar ese pokémon";
    }
    isLoading.value = false;
  };

  // fijate que no necesitó pedirlo con await(o sea que puedo definir una funcion async/await y llamarla sin await)Fijate tmb que la primera vez lo llamaré con pokemonId y las siguientes con route.params.id a traves del watch.Interesting,asinto.
  searchPokemon(pokemonId);

  return {
    errorMessage,
    isLoading,
    pokemon,
    searchPokemon,
  };
};

export default usePokemon;
