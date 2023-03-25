import { shallowMount, mount } from "@vue/test-utils";

import PokemonPage from "@/pages/PokemonPage";
import PokemonPicture from "@/components/PokemonPicture";
import PokemonOptions from "@/components/PokemonOptions";
import { mockPokemons } from "../mocks/pokemons.mock";

describe("PokemonPage Component:", () => {
  let wrapper;
  // mejor que definir un espia por cada test es rellamar al mount | shallowMount
  // let mixPokemonSpy;

  beforeEach(() => {
    // mixPokemonSpy = jest.spyOn(PokemonPage.methods, "mixPokemonArray");
    wrapper = shallowMount(PokemonPage);
    jest.clearAllMocks;
  });

  test("should match with its snapshot", () => {
    // realmente no vale de mucho esta prueba,ojo
    expect(wrapper.html()).toMatchInlineSnapshot(`<h1>Espere por favor...</h1>`);
  });

  test("should call mixPokemonArray method when mounted", () => {
    // console.log(PokemonPage);
    // importante: aqui ya es muy tarde para crear un espia,ya hemos montado el componente en la linea 9 y ha disparado todo,si creo un espia ahora llega tarde a la fiesta
    // Solucion UNO,poner el espia antes del wrapper(antes de la linea 9)
    const mixPokemonSpy = jest.spyOn(PokemonPage.methods, "mixPokemonArray");
    // fijate que ni siquiera necesito almacenar el componente virtual,solo volver a montarlo
    shallowMount(PokemonPage);
    expect(mixPokemonSpy).toHaveBeenCalledTimes(1);
  });

  test(`debe de hacer match con el snapshot pero con pokemons cargados`, () => {
    // dado que queremos entrar por el v-else tengo que mandar la data para los subcomponentes y que funcione todo bien
    const wrapper = mount(PokemonPage, {
      data() {
        return {
          pokemonArr: mockPokemons,
          pokemon: mockPokemons[1],
          showPokemon: false,
          showAnswer: false,
          message: "",
          hasSelected: false,
        };
      },
    });
    // ahora si,le sacamos la snapshot
    expect(wrapper.html()).toMatchInlineSnapshot(`
      <div>
        <h1>¿Quién es este pokémon?</h1>
        <div class="pokemon-container"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg" class="hidden-pokemon" alt="pokemon"></div>
        <div class="options-container">
          <ul>
            <li>Bulbasaur</li>
            <li>Ivysaur</li>
            <li>Venusaur</li>
            <li>Charmander</li>
          </ul>
        </div>
        <!--v-if-->
      </div>
    `);
  });

  test("debe de mostrar sus subcomponentes(deben existir,el PokemonPicture debe tener el attribute pokemonId con el valor correcto,y el pokemonOptions debe tener el atributo pokemons)", () => {
    // opcion uno crear un espia con spyOn(object,methodName) y dejar la funcionalidad intacta
    // const newGameSpy= jest.spyOn(PokemonPage.methods,'newGame')
    // opcion dos,hacer que el espia retorne lo que quiera:
    // const newGameSpy= jest.spyOn(PokemonPage.methods,'newGame').mockImplementation(() => true)
    // opcion tres usar object[methoName] = jest.fn();
    // PokemonPage.methods['newGame'] = jest.fn();

    const wrapper = mount(PokemonPage, {
      data() {
        return {
          pokemonArr: mockPokemons,
          pokemon: mockPokemons[1], //id 2
          showPokemon: false,
          showAnswer: true,
          message: "",
          hasSelected: false,
        };
      },
    });
    // opcion cuatro,usar el objeto wrapper.vm tras settearlo.Ojo con los lifecycles
    const newGameSpy = jest.spyOn(wrapper.vm, "newGame");

    // existen los subcomponentes
    const PokemonPictureCmp = wrapper.findComponent(PokemonPicture);
    const PokemonOptionsCmp = wrapper.findComponent(PokemonOptions);
    expect(PokemonPictureCmp.exists()).toBe(true);
    expect(PokemonOptionsCmp.exists()).toBe(true);
    // Picture reciba la prop pokemonId con valor correcto
    expect(PokemonPictureCmp.props("pokemonId")).toBe(mockPokemons[1].id);
    // Options debe tener la prop pokemons
    expect(PokemonOptionsCmp.props("pokemons")).toBeDefined();
    // assert extra
    expect(PokemonOptionsCmp.props("pokemons")).toEqual(mockPokemons);
    wrapper.find("button").trigger("click");
    // expect(PokemonPage.methods["newGame"]).toHaveBeenCalledTimes(1);
    expect(newGameSpy).toHaveBeenCalledTimes(1);
  });

  test("pruebas en checkAnswer", async () => {
    const wrapper = mount(PokemonPage, {
      data() {
        return {
          pokemonArr: mockPokemons,
          pokemon: mockPokemons[1], //id 2
          showPokemon: false,
          showAnswer: false,
          message: "",
          hasSelected: false,
        };
      },
    });
    //  puedo llamar a un método mediante wrapper.vm.methodName()
    await wrapper.vm.checkAnswer(2); //recuerda que el 2 va a coincidir
    expect(wrapper.find("h2").exists()).toBe(true);
    expect(wrapper.vm.showPokemon).toBe(true);
    expect(wrapper.find("h2").text()).toBe(`Correcto, es ${mockPokemons[1].name}!`);

    await wrapper.vm.checkAnswer(29);
    // realmente da igual acceder por la property o con un find
    expect(wrapper.vm.message).toBe(`Oops, era ${mockPokemons[1].name} ...`);
  });
});
