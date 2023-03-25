import NavbarVue from "@/modules/daybook/components/Navbar.vue";
import { shallowMount } from "@vue/test-utils";
import createMainStore from "../../../mock-data/mock-store";

const mockRouter = {
  push: jest.fn(),
};
jest.mock("vue-router", () => ({
  useRouter: () => mockRouter,
}));

describe("Pruebas en el Navbar.vue", () => {
  const store = createMainStore({
    status: "not-authenticated",
    user: {
      name: "Juan Carlos I",
      email: "Juancar@gmail.com",
    },
    idToken: null,
    refreshToken: null,
  });

  beforeEach(() => jest.clearAllMocks());

  it("debe de mostrar el componente correctamente", () => {
    const wrapper = shallowMount(NavbarVue, {
      global: {
        plugins: [store],
      },
    });
    // console.log(wrapper.html());
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("click en logout debe de cerrar sesion y redireccionar", async () => {
    const wrapper = shallowMount(NavbarVue, {
      global: {
        plugins: [store],
        stubs: ["router-link"],
      },
    });

    await wrapper.find("button").trigger("click");
    // expect(wrapper.router.push).toHaveBeenCalledWith({name:"login"})
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "login" });

    expect(store.state.auth).toEqual({
      user: null,
      idToken: null,
      refreshToken: null,
      status: "not-authenticated",
    });
  });
});
