import axios from "axios";

axios.defaults.withCredentials = false;

const pokemonApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});
export default pokemonApi;
