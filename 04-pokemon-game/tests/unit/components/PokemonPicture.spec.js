import { shallowMount } from "@vue/test-utils";

import PokemonPicture from "@/components/PokemonPicture";

describe("Test suite(PokemonPicture)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("1- should match snapshot", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 1,
        showPokemon: false,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("2- should show hidden img and pokemon with id of 100", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: false,
      },
    });
    // find traerá la primera,me vale
    const img = wrapper.find("img");
    // podria asegurarme que la prop pasa el valor
    expect(wrapper.props("pokemonId")).toBe(100);

    // pero aún mejor sería afirmar que la img ha seteado su atributo src correctamente con ese id.Para ello tenemos el método attributes() que devuelve los atributos de una tag(muy parecido a props())
    expect(img.attributes("src")).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg",
    );

    // para las clases podia haber usado atrributes() pero también tenemos cmp.classes que trae un array con las clases.Dado que es un array puedo hacer toContain para buscar por un elemento en concreto
    expect(img.classes()).toContain("hidden-pokemon");
    // otra forma sería asi
    expect(img.classes("hidden-pokemon")).toBe(true);
  });

  test("3- should show pokemon with full brightness if showPokemon comes as true", () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 55,
        showPokemon: true,
      },
    });
    const [img1, img2] = wrapper.findAll("img");
    expect(img1.exists()).toBe(true);
    expect(img2).toBe(undefined);
    expect(img1.classes("fade-in")).toBe(true);
  });
});
