import axios from 'axios';

// ojo,aqui estamos apuntando a pelo a la database de Firebase
const journalApi = axios.create({
  baseURL: "https://vue-daybooks-default-rtdb.europe-west1.firebasedatabase.app",
  params:{
    auth: localStorage.getItem('idToken')
  }
});

/* // tras crear la instancia podemos interceptar las peticiones(aunque tm podemos interceptar las responses tmb solo queremos añadir el idToken para que no pete Firebase).Siempre se recibe una config(la que viaja) y debo devolver una nueva
journalApi.interceptors.request.use( (config) => {
// mediante este objeto config podria acceder a los params o los headers
config.params = {
  auth: localStorage.getItem('idToken')
}
return config; // debo retornar esta nueva config,recuerda
}) */

export default journalApi;