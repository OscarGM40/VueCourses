import { useAuth } from "@/modules/auth/composables/useAuth";

const mockStore = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: {
    "auth/currentState": "authenticated",
    "aut/getUsername": "asinto",
  },
};

// con jest.mock(module,factory:Object) puedo mockear cualquier libreria y hacerla que devuelva lo que quiera.En este caso sabemos que el hook va a llamar a useStore del modulo vuex y que retorna un store esa llamada,asi que estamos mockeando todo.Super pro
jest.mock("vuex", () => ({
  useStore: () => mockStore,
}));

describe("testing useAuth composable", () => {
  beforeEach(() => jest.clearAllMocks());

  const newUser = { name: "Fernando", email: "fernando@gmail.com", password: "123456" };

  test("createUser should be resolved successfully", async () => {
    // puede parecer que el hook useStore va a dar problemas,pero no va a ser asi,ya que llamar a useAuth no retorna nada de ese hook.Lo importante es lo que retorna la función en el testing
    // console.log(useAuth());

    const { createUser } = useAuth();
    mockStore.dispatch.mockReturnValue({ ok: true });
    const resp = await createUser(newUser);
    // si imprimimos la resp da undefined por el jest.fn pero podemos saber con qué se llamo o cuantas veces o cambiar el retorno del mock
    expect(resp).toEqual({ ok: true });
    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", newUser);
  });

  test("createUser should be resolved unsuccessfully/wrongly", async () => {
    const { createUser } = useAuth();
    mockStore.dispatch.mockReturnValue({ ok: false, message: "EMAIL_EXISTS" });
    const resp = await createUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", newUser);
    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });
  });

  test("loginUser should be resolved successfully", async () => {
    const { loginUser } = useAuth();

    mockStore.dispatch.mockReturnValue({ ok: true });
    const resp = await loginUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/signInUser", newUser);
    expect(resp).toEqual({ ok: true });
  });

  test("loginUser should be resolved unsuccessfully/wrongly", async () => {
    const { loginUser } = useAuth();

    mockStore.dispatch.mockReturnValue({ ok: false, message: "EMAIL_DOES_NOT_EXISTS" });
    const resp = await loginUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/signInUser", newUser);
    expect(resp).toEqual({ ok: false, message: "EMAIL_DOES_NOT_EXISTS" });
  });

  test("checkAuthStatus", async () => {
    const { checkAuthStatus } = useAuth();

    mockStore.dispatch.mockReturnValue({ ok: true });
    const resp = await checkAuthStatus();

    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/checkAuthStatus");
    expect(resp).toEqual({ ok: true });
  });

  test("logout", async () => {
    const { logout } = useAuth();

    logout();

    expect(mockStore.commit).toHaveBeenCalledWith("auth/logout");
    expect(mockStore.commit).toHaveBeenCalledWith("journal/clearEntries");
    expect(mockStore.commit).toHaveBeenCalledTimes(2);
  });

  test("authStatus should retrieve status through the getter,same with username computed prop", () => {
    const { authStatus, username } = useAuth();

    mockStore.getters['auth/currentState'] = "processing";
    mockStore.getters['auth/getUsername'] = "Pablo";
    // console.log({ authStatus });

    expect(authStatus.value).toBe("processing");
    expect(username.value).toBe("Pablo");
  });
});
