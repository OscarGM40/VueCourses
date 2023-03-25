import { shallowMount } from "@vue/test-utils";
// en Vue la @ hace referencia al punto de entrada,es buena idea usarlo
import Counter from "@/components/Counter";

describe("Counter Component: ", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Counter);
    jest.clearAllMocks();
  });
  test("should match with its snapshot", () => {
    // una prueba interesante puede ser comprobar el snapshot ??

    //  los componentes en un ambiente de testing se renderizan en un DOM virtual,de alguna manera tenemos que montarlos en ese DOM.Aqui es donde entran métodos como shallowMount o mount(éste monta todo el componente y sus componentes,luego el proceso es más pesado)
    // obviamente de momento nos vale shallowMount
    // const wrapper = shallowMount(Counter);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("h2 tag should render default value(Counter) ", () => {
    // de nuevo no necesitamos una copia profunda
    // const wrapper = shallowMount(Counter);

    // puedo asegurarme que el DOMWrapper existe antes de aplicarle .text()
    expect(wrapper.find("h2").exists()).toBeTruthy();

    // find devuelve un DOMWrapper,para ver el contenido tengo que usar la función DOMWrapper.text()
    const h2 = wrapper.find("h2");
    console.log("first h2 content: ", h2.text());

    expect(h2.text()).toBe("Counter");
  });

  test("p tag should have the default value(10) ", () => {
    // const wrapper = shallowMount(Counter);
    // findAll devuelve un arreglo de DOMWrappers,pero es muy mala idea buscar en el DOM por posiciones,es algo muy volátil esto.Se recomienda usar data-attributes(y removerlos con el plugin de babel en producción)

    // const pTags = wrapper.findAll('p'); <- mala idea buscar por posiciones,asinto
    // ojo que .text() devuelve el contenido como string(aunque fuera un Number en el component)
    // expect(pTags[1].text()).toBe("10");

    // fijate que sin usar plugins con jest puedo buscar usando wrapper.find('[data-testid="value"]').Puedo buscar por cualquier data-attribute,ojo
    const pByDataAttribute = wrapper.find('[data-testid="counter"]');
    expect(pByDataAttribute.text()).toBe("10");
  });

  // si bien .only solo ejecutará este test de esta suite,tengo que restringir la llamada en el comando de inicio del testing a solo este componente
  test("debe de incrementar y decrementar el contador ", async () => {
    // const wrapper = shallowMount(Counter);
    const counter = wrapper.find('[data-testid="counter"]');

    // realmente un find tmb me vale ya que find va a coger el primero
    // const increaseButton = wrapper.findAll("button")[0];
    // const decreaseButton = wrapper.findAll("button")[1];

    // esto era el refactor grandioso(aunque es interesante en su concepto,)
    const [increaseButton, decreaseButton] = wrapper.findAll("button");

    // en este punto,dado que el click no es sincrono,tengo que usar async/await.Ojo,es en este punto en Vue(investigar más)
    await increaseButton.trigger("click");
    expect(counter.text()).toBe("11");
    await decreaseButton.trigger("click");
    await decreaseButton.trigger("click");
    expect(counter.text()).toBe("9");
  });

  test("Debe de leer el valor que venga por props", () => {
    // ver las props del componente en Vue
    // console.log(wrapper.props());
    // acceder a una prop en concreto
    // console.log(wrapper.props("start"));
    // otra forma de acceder a una o varias props
    const { start } = wrapper.props();
    expect(typeof start).toBe("number");

    const value = wrapper.find('[data-testid="counter"');
    expect(value.text()).toBe(start.toString());
  });

  test("Debe de establecer la prop title correctamente", () => {
    const title = "Hello world";
    const wrapper = shallowMount(Counter, {
      props: { title: title },
    });
    expect(wrapper.find("h2").text()).toBe(title);
  });

  test('prop "title" debe mostrar valor indicado', async () => {
    const title = "Something";
    await wrapper.setProps({ title });

    const value = wrapper.find("h2").text();
    expect(value).toBe(title);
  });
});
