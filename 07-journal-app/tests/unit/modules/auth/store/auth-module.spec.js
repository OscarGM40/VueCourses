import authApi from "@/api/authApi";
import createMainStore from "../../../mock-data/mock-store";
import { authStateMock } from "../../../mocks/authModule.mocks";

describe("Testing auth module store", () => {
  beforeEach(() => jest.clearAllMocks());

  test("initial state should concord", () => {
    const store = createMainStore(authStateMock);
    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticating");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  });

  test("mutation loginUser should login with a valid user", () => {
    const store = createMainStore(authStateMock);

    // realmente da igual qué mandar,a la mutation loginUser le da igual,simplemente establece en el localStorage los tokens y cambia el user al user y el status a authenticated.Importante esto? quizás...
    const payload = {
      user: { name: "Fernando", email: "fernando@gmail.com" },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    };

    store.commit("auth/loginUser", payload);
    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toEqual(payload.user);
    expect(idToken).toBe(payload.idToken);
    expect(refreshToken).toBe(payload.refreshToken);
  });

  test("mutation log out user should establish the correct values to the auth state", () => {
    const store = createMainStore({
      status: "authenticated",
      user: { name: "Fernando", email: "fernando@gmail.com" },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    });

    localStorage.setItem("idToken", store.state.auth.idToken);
    localStorage.setItem("refreshToken", store.state.auth.refreshToken);
    expect(localStorage.getItem("idToken")).not.toBe(null);
    expect(localStorage.getItem("refreshToken")).not.toBe(null);

    store.commit("auth/logout");
    const { status, user, idToken, refreshToken } = store.state.auth;

    expect(status).toBe("not-authenticated");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
    expect(localStorage.getItem("idToken")).toBe(null);
    expect(localStorage.getItem("refreshToken")).toBe(null);
  });

  test("getters currentState and username  should return auth status and user.name", () => {
    const store = createMainStore({
      status: "authenticated",
      user: { name: "Fernando", email: "fernando@gmail.com" },
      idToken: "ABC-123",
      refreshToken: "XYZ-123",
    });

    expect(store.getters["auth/currentState"]).toBe("authenticated");
    expect(store.getters["auth/getUsername"]).toBe("Fernando");
    // console.log({ type: typeof store.getters });
  });

  test("createUser action should be rejected due to an already existing user", async () => {
    const store = createMainStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });
    const newUser = {
      name: "User Test",
      email: "test@test.gmail",
      password: "123456",
    };
    // obviamente el commit no tengo que mandarlo por argumento
    const resp = await store.dispatch("auth/createUser", newUser);
    // console.log({ resp });
    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" });
  });

  test("Action createUser should create a user", async () => {
    const store = createMainStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });

    const newUser = {
      name: "Test 2",
      email: "test@test2.gmail",
      password: "123456",
    };
    // borrar el usuario.Dado que necesita un idToken que se genera de manera dinámica primero hay que logearse.Esta accion mete en el state el idToken(a traves de una mutation)
    await store.dispatch("auth/signInUser", newUser);
    // en este punto ya tengo el idToken y puedo borrar el usuario
    const { idToken } = store.state.auth;
    // puedo ver la respuesta de intentar borrar el user
    await authApi.post(":delete", {
      idToken: idToken,
    });
    // realmente empieza aqui el testing
    const resp = await store.dispatch("auth/createUser", newUser);
    console.log({ resp });
    expect(resp).toMatchObject({ ok: true });

    const { status, user, idToken:token, refreshToken } = store.state.auth;

        expect(status).toBe("authenticated");
        expect(user).toEqual(user);
        expect(token).toEqual(expect.any(String));
        expect(refreshToken).toEqual(expect.any(String));
  });
});
