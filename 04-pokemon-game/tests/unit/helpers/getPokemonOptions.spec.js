import getPokemonOptions, { getPokemons, getPokemonNames } from "@/helpers/getPokemonOptions";

import { mockPokemons } from "../mocks/pokemons.mock";

describe("Testing getPokemonOptions: ", () => {
  test("getPokemons debe de regresar un arreglo de numeros", () => {
    const expectedNumbers = getPokemons();

    // ojo que expect.arrayContaining espera un arreglo y usará toEqual o toStricEqual si quiero comprobar el type.Dado que estamos en JS no tiene sentido usar toStrictEqual
    expect(expectedNumbers).toEqual(expect.arrayContaining([expect.any(Number)]));
  });

  test("getPokemonsNames debe de regresar un arreglo de 4 elementos con nombres de pokemons", async () => {
    const pokemons = await getPokemonNames([1, 2, 3, 4]);

    expect(pokemons).toEqual(mockPokemons);
  });

  test("getPokemonOptions debe de retornar un arreglo mezclado", async () => {
    const mixedPokemons = await getPokemonOptions();
    expect(mixedPokemons.length).toBe(4);

    expect(mixedPokemons).toStrictEqual([
      expect.objectContaining({ name: expect.any(String), id: expect.any(Number) }),
      expect.objectContaining({ name: expect.any(String), id: expect.any(Number) }),
      expect.objectContaining({ name: expect.any(String), id: expect.any(Number) }),
      expect.objectContaining({ name: expect.any(String), id: expect.any(Number) }),
    ]);
  });
});
