import DaybookRoutes from "@/modules/daybook/router";
// import axios from "axios";
// jest.mock("axios")
// axios.get.mockImplementation(() => Promise.resolve(1));


describe("Test in daybook routes", () => {

  // recuerda que elimino fácilmente con backspace
  test("router should have this config", async () => {
    expect(DaybookRoutes).toEqual({
      name: "daybook",
      component: expect.any(Function),
      children: [
        {
          path: "",
          name: "no-entry",
          component: expect.any(Function),
        },
        {
          path: ":id",
          name: "entry",
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });
  });

  test("children routes should call the desired components", async () => {
    const promiseRoutes = [];
    // fijate que child.component() es la referencia a la promesa y no child.component
    DaybookRoutes.children.forEach((child) => promiseRoutes.push(child.component()));

    // Promise.all va a caer en cuanto caiga la primera de las Promesas.
    //Promise.allSettled va a esperar a todas las llamadas y devolver un objeto con las propiedades status a fullfilled o rejected y value si fue fullfilled o reason si fue rejected
    // asi pues pedimos las dos rutas y extraemos el default.nam
    const routes = (await Promise.all(promiseRoutes)).map((r) => r.default.name);
    expect(routes).toContain("EntryView");
    expect(routes).toContain("NoEntrySelected");
  });

  test("children routes should call the desired components", async () => {
    const routesPromises = [];
    DaybookRoutes.children.forEach((child) => routesPromises.push(child.component()));
    const routesResolved = (await Promise.allSettled(routesPromises)).map(
      (r) => r.value.default.name,
    );
    expect(routesResolved).toEqual(expect.arrayContaining(["EntryView", "NoEntrySelected"]));
  });

  test("when routing to EntryView the id of the path should be trasmitted", async () => {
    const routeMock = {
      params:{
        id: 'ABC-123'
      }
    }
    // de nuevo no es buena idea hardcodear el indice de la ruta hija,mejor buscarla con un find(el find devuelve el primero que haga match con el predicate luego es semi-eficiente)
    const entryRoute = DaybookRoutes.children.find(route => route.name === 'entry');
    expect(entryRoute.props(routeMock).id).toBe(routeMock.params.id)
  });
});
