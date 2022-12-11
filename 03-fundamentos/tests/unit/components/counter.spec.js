import { shallowMount } from "@vue/test-utils";
// en Vue la @ hace referencia al punto de entrada,es buena idea usarlo
import Counter from "@/components/Counter";

describe("Counter Component: ", () => {
  test("should match with its snapshot", () => {
    // una prueba interesante puede ser comprobar el snapshot ??

    //  los componentes en un ambiente de testing se renderizan en un DOM virtual,de alguna manera tenemos que montarlos en ese DOM.Aqui es donde entran métodos como shallowMount o mount(éste monta todo el componente y sus componentes,luego el proceso es más pesado)
    // obviamente de momento nos vale shallowMount
    const wrapper = shallowMount(Counter);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('h2 tag should render default value(Counter) ', () => {
    // de nuevo no necesitamos una copia profunda
    const wrapper = shallowMount(Counter);

    // puedo asegurarme que el DOMWrapper existe antes de aplicarle .text()
    expect(wrapper.find("h2").exists()).toBeTruthy();

    // find devuelve un DOMWrapper,para ver el contenido tengo que usar la función DOMWrapper.text()
    const h2 = wrapper.find("h2");
    console.log("first h2 content: ", h2.text());

    expect(h2.text()).toBe("Counter");
  })

  test('p tag should have the default value(10) ', () => { 
    const wrapper = shallowMount(Counter);
    // findAll devuelve un arreglo de DOMWrappers,pero es muy mala idea buscar en el DOM por posiciones,es algo muy volátil esto.Se recomienda usar data-attributes(y removerlos con el plugin de babel en producción)

    // const pTags = wrapper.findAll('p'); <- mala idea buscar por posiciones,asinto
    // ojo que .text() devuelve el contenido como string(aunque fuera un Number en el component)
    // expect(pTags[1].text()).toBe("10");

    // fijate que sin usar plugins con jest puedo buscar usando wrapper.find('[data-testid="value"]').Puedo buscar por cualquier data-attribute,ojo
    const pByDataAttribute = wrapper.find('[data-testid="counter"]')
    expect(pByDataAttribute.text()).toBe('10')
   })
});
