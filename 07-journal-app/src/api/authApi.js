import axios from "axios";

// fijate que aqui estamos registrando por POST contra la API de Firebase mediante una API_KEY.Esto sustituye al firebase.config(interesante forma alternativa)
const authApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
  params: {
    key: process.env.VUE_APP_FIREBASE_TOKEN,
  },
});

export default authApi;
