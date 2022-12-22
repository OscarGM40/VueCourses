import { shallowMount } from "@vue/test-utils";

import PokemonOptions from "@/components/PokemonOptions";
import { mockPokemons } from "../mocks/pokemons.mock";

describe("PokemonOptions Component:", () => {
  beforeEach(() => {
    jest.clearAllMocks;
  });

  test("1- should match with its snapshot", () => {
    const wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons: mockPokemons,
        hasSelected: false,
      },
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div class="options-container">
        <ul>
          <li>Bulbasaur</li>
          <li>Ivysaur</li>
          <li>Venusaur</li>
          <li>Charmander</li>
        </ul>
      </div>
    `);
  });

  test("should match with its snapshot", () => {
    const wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons: mockPokemons,
        hasSelected: false,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
