import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";

describe("Indecision Component", () => {
  let wrapper;
  // un spy es un espia que está pendiente de cualquier cosa,pueden ser métodos,pueden ser librerias completas(modulos),
  let clgSpy;
  // dado que un test se ejecuta sobre Node no va a ver la api fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: "yes",
          forced: false,
          image: "https://image.com",
        }),
    }),
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    clgSpy = jest.spyOn(console, "log");
    jest.clearAllMocks();
  });

  test("Debe de hacer match contra el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("no debe de disparar la petición si no escribo en el input el simbolo de interrogacion", async () => {
    const input = wrapper.find("input"); //solo hay uno,asinto
    // dado que escribir en el input es asincrono tengo que usar await(fijate que Vue es muy claro en cuanto a que me indica exactamente la acción asincrona,me será útil)
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    console.log(wrapper.vm);

    await input.setValue("Hola mundo");
    // 2 porque cuenta el de testing de la linea 24 tmb(fijate que es importante pues)
    expect(clgSpy).toHaveBeenCalledTimes(2);
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test("escribir la interrogacion si debe disparar la peticion", async () => {
    const input = wrapper.find("input");
    // fijate que este test no necesita un espia,me da igual lo que haga el método
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    const fetch = jest.spyOn(window, "fetch");
    await input.setValue("Hola mundo?");
    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test("pruebas en el metodo getAnswer- Peticion exitosa", async () => {
    // llamamos fisicamente al método(fijate que es asincrono)
    await wrapper.vm.getAnswer();
    console.log(wrapper.vm.img);
    console.log(wrapper.vm.answer);
    expect(wrapper.vm.img).toBe("https://image.com");
    expect(wrapper.vm.answer).toBe("Si!");
  });
  test("pruebas en el metodo getAnswer- La API debe fallar", async () => {
    // fijate que ya tengo definido el mock sobre la propiedad global.fetch del browser en la linea 9,luego ahora ya no es jest.fn() sino que es un update usando mockImplementation
    fetch.mockImplementationOnce(() => Promise.reject("API is down")); // fijate que nos da igual usar global.fetch o simplemente fetch

    // llamamos al método
    await wrapper.vm.getAnswer();
    // también podemos llamar al espia,que va a hacer la llamada física igualmente con la implementación real
    // const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");
    // getAnswerSpy();

    const img = wrapper.find("img");
    // truthy porque usé v-show,falsy si fuera v-if
    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.answer).toBe("No se pudo cargar del API");
  });
});
