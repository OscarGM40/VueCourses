import authApi from "@/api/authApi";

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;

  try {
    const { data } = await authApi.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });

    // para el update necesito mandar el idToken que me retorna un signUp exitoso(fijate que le puedo mandar un name y una foto,asin)
    const { idToken, refreshToken } = data;

    // y lanzo el update para el displayName
    await authApi.post(":update", {
      displayName: name,
      idToken,
    });

    // llamar a la mutation de loginUser(fijate que al dispararla desde elmodulo auth no necesita auth/loginUser )
    delete user.password;
    commit("loginUser", { user, idToken, refreshToken });

    return {
      ok: true,
    };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};

export const signInUser = async ({ commit }, user) => {
  const { email, password } = user;

  try {
    const { data } = await authApi.post(":signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });

    // si tuviera un displayName lo agregamos a la propiedad name
    const { displayName, idToken, refreshToken } = data;
    user.name = displayName;

    commit("loginUser", { user, idToken, refreshToken });

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};
