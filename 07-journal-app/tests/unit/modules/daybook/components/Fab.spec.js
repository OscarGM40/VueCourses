import Fab from "@/modules/daybook/components/Fab.vue";
import { shallowMount } from "@vue/test-utils";

describe("Fab cmp test suite", () => {
  test("should have default class 'fa-plus' when no prop icon is given to the cmp", () => {
    const wrapper = shallowMount(Fab);

    const icon = wrapper.find("i");
    expect(icon.classes().includes("fa-plus")).toBe(true);
  });
  test("should have the given class through props as icon class", () => {
    const wrapper = shallowMount(Fab, {
      props: { icon: "fa-rru-ki-to" },
    });

    const icon = wrapper.find("i");
    expect(icon.classes().includes("fa-rru-ki-to")).toBe(true);
  });

  test("test that on:click is emitted", () => {
    const wrapper = shallowMount(Fab);

    wrapper.find("button").trigger("click");
    // console.log(wrapper.emitted());

    // no puede ser to bE asinto ya que dos arrays no son iguales,same as with two objects,tengo que bajar la equidad
    expect(wrapper.emitted("on:click")).toEqual([[]]);
    // fijate que emitted emite un arreglo con otro arreglo,ambos vacios,pero me vale decir que tendrá length de 1 === 1 emision.Muy prehistorics aqui)
    expect(wrapper.emitted("on:click")).toHaveLength(1);
  });
});
