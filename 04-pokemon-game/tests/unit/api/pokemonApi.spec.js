import pokemonApi from "@/api/pokemonApi";

describe("PokemonApi: ", () => {

  test("should match baseUrl", () => {
    // es buena idea imprimir el modulo si no sé sus propiedades
    // console.log(pokemonApi);
    expect(pokemonApi.defaults.baseURL).toBe("https://pokeapi.co/api/v2/pokemon");
  });

  
});
