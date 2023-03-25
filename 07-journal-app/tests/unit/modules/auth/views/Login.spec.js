import LoginVue from "@/modules/auth/views/Login.vue";
import { shallowMount } from "@vue/test-utils";
import createMainStore from "../../../mock-data/mock-store";

const mockRouter = {
  push: jest.fn(),
};

jest.mock("vue-router", () => ({
  useRouter: () => mockRouter,
}));

import Swal from "sweetalert2";
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  close: jest.fn(),
  showLoading: jest.fn(),
}));

describe("Pruebas en el Login.vue", () => {
  const store = createMainStore({
    status: "not-authenticated",
    user: null,
    idToken: null,
    refreshToken: null,
  });
  // realmente no queremos que el dispatch llame a la action y por tanto a Firebase
  store.dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it("Debe de hacer match con el snapshot", () => {
    const wrapper = shallowMount(LoginVue, {
      global: {
        plugins: [store],
        // un stub es una simulacion
        stubs: ["router-link"],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Debe de resolver el login con error", async () => {
    // realmente no queremos que el dispatch llame a la action y por tanto a Firebase
    store.dispatch.mockReturnValueOnce({ ok: false, message: "Error en credenciales" });
    const wrapper = shallowMount(LoginVue, {
      global: {
        plugins: [store],
        stubs: ["router-link"],
      },
    });

    await wrapper.find("form").trigger("submit");
    expect(store.dispatch).toHaveBeenCalledWith("auth/signInUser", { email: "", password: "" });
    expect(Swal.fire).toHaveBeenCalledTimes(1);
    expect(Swal.fire).toHaveBeenCalledWith("Error", "Error en credenciales", "error");
  });

  it("Debe de resolver el login con exito y redirigir a no-entry", async () => {
    store.dispatch.mockReturnValueOnce({ ok: true });

    const wrapper = shallowMount(LoginVue, {
      global: {
        plugins: [store],
        stubs: ["router-link"],
      },
    });

    // buscar por todos tmb me valia,siempre los va a encontrar en el mismo orden
    // const [ txtEmail,txtPass] = wrapper.findAll('input')

    const textInput = wrapper.find('input[type="text"]');
    // ojo que setValue es asincrono!!
    await textInput.setValue("Fernando@gmail.com");
    const passInput = wrapper.find('input[type="password"]');
    await passInput.setValue("ABCabc123@");

    await wrapper.find("form").trigger("submit");
    expect(store.dispatch).toHaveBeenCalledWith("auth/signInUser", {
      email: "Fernando@gmail.com",
      password: "ABCabc123@",
    });

    expect(Swal.fire).not.toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" });
  });
});
