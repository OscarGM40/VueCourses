import axios from 'axios';

// ojo,aqui estamos apuntando a pelo a la database de Firebase
const journalApi = axios.create({
  baseURL: "https://vue-daybooks-default-rtdb.europe-west1.firebasedatabase.app",
});

export default journalApi;