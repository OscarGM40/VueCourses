import EntryListVue from "@/modules/daybook/components/EntryList.vue";
import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import { mockedJournalStore } from "../../../mocks/daybook.mocks";

const mockRouter = {
  push: jest.fn(),
};

// fijate que puedo mockear o todo el journalStore o solo el state.Fijate que hasta ahora estabamos usando el journalModule con las actions,getters y mutations reales y solo parametrizamos el state inicial,pero podriamos mockear esas acciones,etc.Sin embargo no lo necesitamos aqui
const mockMainStore = () =>
  createStore({
    modules: {
      journal: mockedJournalStore,
    },
  });

describe("Pruebas en el componente EntryList", () => {
  let wrapper;
  
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryListVue, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [mockMainStore()],
      },
    });
  });

  test("should show the given initial entries at first", () => {
    // <- recuerda que wrapper.html() es muy útil
    console.log(wrapper.html());
    expect(wrapper.findAll("entry-stub").length).toBe(2);
  });

  test("debe de llamar al getEntriesByTerm y filtrar las entradas", async () => {
    const input = wrapper.find(".form-control");
    // ojo que setValue es asincrono
    await input.setValue("parece");
    expect(wrapper.findAll("entry-stub").length).toBe(1);
  });
  
  test("el boton debe de redireccionar a 'new'", () => {
    wrapper.find("button").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: "new" },
    });
  });
});
