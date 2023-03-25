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

  test("debe de mostrar las 4 opciones correctamente", () => {
    const wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons: mockPokemons,
        hasSelected: false,
      },
    });
    const liItems = wrapper.findAll("li");
    expect(liItems.length).toBe(mockPokemons.length);
    liItems.forEach((li,index) => {
      expect(li.text()).toBe(mockPokemons[index].name)
    })
  });

  test('debe de emitir el evento "handleSelect" con el id correcto al hacer click', () => {
    const wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons: mockPokemons,
        hasSelected: false,
      },
    });
    const [pk1, pk2, pk3, pk4] = wrapper.findAll("li");
    // no es necesario el await,el await solo es necesario si tengo que esperar a una re-renderización
    pk1.trigger("click");
    pk2.trigger("click");
    pk3.trigger("click");
    pk4.trigger("click");
    // ojo que con wrapper.emitted solo veo lo que haya emitido con $emit
    // console.log(wrapper.emitted('selectPokemon'))
    // podemos comprobar que se haya emitido una vez
    expect(wrapper.emitted("selectPokemon").length).toBe(mockPokemons.length);
    // recuerda que no puedo usar toBe([2]) porque [2] === [2] no es true,son dos objetos diferentes,tengo que bajar el comparador con toEqual
    expect(wrapper.emitted("selectPokemon")[0]).toEqual([1]);
    expect(wrapper.emitted("selectPokemon")[1]).toEqual([2]);
    expect(wrapper.emitted("selectPokemon")[2]).toEqual([3]);
  });

  test('refactor del anterior test', () => {
    const wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons: mockPokemons,
        hasSelected: false,
      },
    });
    const liTags = wrapper.findAll("li");
    liTags.forEach((li, index) => {
      li.trigger("click");
      expect(wrapper.emitted("selectPokemon")[index][0]).toBe(mockPokemons[index].id);
    });
  });
});
