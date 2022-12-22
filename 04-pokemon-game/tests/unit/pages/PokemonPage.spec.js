import { shallowMount } from "@vue/test-utils";

import PokemonPage from "@/pages/PokemonPage";

describe("PokemonPage Component:", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
    jest.clearAllMocks
  });

  test("should match with its snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
