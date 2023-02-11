import EntryVue from "@/modules/daybook/components/Entry.vue";
import { shallowMount } from "@vue/test-utils";

describe("Pruebas en el entry.spec", () => {
  beforeEach(() => jest.clearAllMocks());

  const mockRouter = {
    push: jest.fn(),
  };

  const mockEntry = {
    text: "texto de la entrada",
    date: 1674899769891,
    picture: null,
    id: "mock-entry-id",
  };

  it("hacer click en la entrada debe redireccionar", () => {
    const wrapper = shallowMount(EntryVue, {
      props: {
        entry: mockEntry,
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    wrapper.find("div").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: mockEntry.id },
    });
  });

  it("testing computed properties(day,month,etc", () => {
    const wrapper = shallowMount(EntryVue, {
      props: {
        entry: mockEntry,
      },
    });
    // para acceder a las computed properties las tengo en wrapper.vm
    expect(wrapper.vm.getCurrentDay).toBe(28);
    expect(wrapper.vm.parseText).toBe(mockEntry.text);
    expect(wrapper.vm.getYear).toBe("2023,sábado");
  });
});
