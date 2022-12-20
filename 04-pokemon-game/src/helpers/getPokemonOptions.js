import pokemonApi from "../api/pokemonApi";

const getPokemons = () => {
  const pokemons = Array.from(Array(650));
  // lleno el arreglo de hasta ahora undefined con el number de su posicion mas uno
  return pokemons.map((_, index) => index + 1);
};

const getPokemonOptions = async () => {
  // los ordenamos aleatoriamente
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  // devolvemos solo 4
  // usa splice si el arreglo necesita ser modificado.No crea un nuevo arreglo
  // Usa slice para remover elementos sin mutar el arreglo original.Creará una copia y opera sobre esa.En este caso cortamos el original,asi no creamos otro
  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));
  // fijate que con redux nunca podria usar slice,pues no lo estoy mutando,pero si splice
  // recuerda usar console.table más a menudo
  console.table(pokemons)
};

const getPokemonNames = async ([a, b, c, d] = []) => {
  const [pk1, pk2, pk3, pk4] = await Promise.all([
    await pokemonApi.get(`/${a}`), //  ya mete el await dentro el Promise.all
    pokemonApi.get(`/${b}`), // no es necesario el await interno,asinto
    pokemonApi.get(`/${c}`), //
    pokemonApi.get(`/${d}`), //
  ]);

  return [
    {
      name: pk1.data.name,
      id: pk1.data.id,
    },
    {
      name: pk2.data.name,
      id: pk2.data.id,
    },
    {
      name: pk3.data.name,
      id: pk3.data.id,
    },
    {
      name: pk4.data.name,
      id: pk4.data.id,
    },
  ];
};

export default getPokemonOptions;
