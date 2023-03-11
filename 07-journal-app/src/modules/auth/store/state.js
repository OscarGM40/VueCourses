// recuerda que el state no es más que una función que retorna un objeto,para que sea reactivo.Ojo que no se retorna un objeto,sino una funcion que lo devuelve,luego.Like this,asinto =>


export default () => ({
  // authenticating | not-authenticated | authenticated
  status: 'authenticating',
  user:null,
  idToken:null,
  refreshToken:null,
});
