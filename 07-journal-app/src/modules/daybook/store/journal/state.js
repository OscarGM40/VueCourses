// recuerda que el state no es más que una función que retorna un objeto,para que sea reactivo.Ojo que no es un objeto es una funcion que lo devuelve,luego =>

export default () => ({
  isLoading: true,
  entries: [
    {
      id: '1', // timestamp numérico
      date: new Date().toDateString(), // sat 23, july
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptate minima commodi tenetur adipisci minus iste. Blanditiis nulla sunt aut recusandae, rem quis asperiores incidunt ad at eligendi possimus! Corrupti?",
      picture: null,
    },
    {
      id: '2', // timestamp numérico incrementado por si acaso
      date: new Date().toDateString(), // sat 23, july
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore nemo illo temporibus dignissimos optio.Umque deleniti enim modi! Nisi, ratione nobis." ,
      picture: null,
    },
    {
      id: '3', // timestamp numérico incrementado por si acaso
      date: new Date().toDateString(), // sat 23, july
      text: "Lorem ipsum dolor sit amet, sfconsectetur adipisicing sfasfeli",
      picture: null,
    },
  ],
});
