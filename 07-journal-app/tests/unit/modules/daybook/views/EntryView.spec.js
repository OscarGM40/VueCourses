import EntryViewVue from "@/modules/daybook/views/EntryView.vue";
import { shallowMount } from "@vue/test-utils";
import { journalStateMock, mockedJournalStore } from "../../../mocks/daybook.mocks";
import { createStore } from "vuex";
import Swal from "sweetalert2";

const mockRouter = {
  push: jest.fn(),
};
const mockGeneralStore = () =>
  createStore({
    modules: {
      journal: { ...mockedJournalStore },
    },
  });

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe("Pruebas en el entryView", () => {
  beforeEach(() => jest.clearAllMocks());

  test("debe de sacar al usuario porque el id no existe", () => {
    shallowMount(EntryViewVue, {
      props: {
        id: "este id no existe",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [mockGeneralStore()],
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });

  test("debe de sacar al usuario porque el id no existe", () => {
    shallowMount(EntryViewVue, {
      props: {
        id: "este id no existe",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [mockGeneralStore()],
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });

  test("debe de mostrar la entrada con un id de entrada existente", () => {
    const wrapper = shallowMount(EntryViewVue, {
      props: {
        id: journalStateMock.entries[0].id,
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [mockGeneralStore()],
      },
    });

    const imgSrc = wrapper.find(".img-thumbnail").attributes("src");
    expect(imgSrc).toBe(journalStateMock.entries[0].picture);
  });

  test("debe de borrar la entrada con un id de entrada existente y redirigir", async () => {
    Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));
    const store = mockGeneralStore();
    // solo con esta linea ya no voy a disparar ningun dispatch con su código real(lo mismo podria usar store.mutations = jest.fn())
    store.dispatch = jest.fn();
    // obviamente podria ser mas preciso pero da igual,simplemente no queremos que dispare el borrado real
    const wrapper = shallowMount(EntryViewVue, {
      props: {
        id: journalStateMock.entries[0].id,
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
    await wrapper.find(".btn-danger").trigger("click");

    expect(Swal.fire).toHaveBeenCalledWith({
      title: "¿Está seguro que desea borrar la entrada?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      icon: "warning",
      confirmButtonText: "Si,borra la entrada",
    });

    setTimeout(() => {
      expect(mockRouter.push).toHaveBeenCalled();
    }, 10);

    expect(store.dispatch).toHaveBeenCalledWith(
      "journal/deleteEntry",
      journalStateMock.entries[0].id,
    );
  });
  test("debe guardar la entrada si no lleva id ", async () => {
    Swal.fire.mockReturnValueOnce();
    const store = mockGeneralStore();
    store.dispatch = jest.fn();

    const newEntry = {
      picture: null,
      text: "",
    };
    const wrapper = shallowMount(EntryViewVue, {
      props: {
        id: "new",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
    await wrapper.find("fab-stub").trigger("click");

    expect(store.dispatch).toHaveBeenCalledWith("journal/createEntry", {
      ...newEntry,
      date: expect.any(Number),
      picture: undefined,
    });
    expect(mockRouter.push).toHaveBeenCalled();
  });
});
