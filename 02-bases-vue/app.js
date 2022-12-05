// puedo imprimir el objeto global Vue si quisiera(al cual accedo por la CDN) 
// console.log({ Vue });

// recuerda que Vue es progresivo,es decir,que tengo que especificar a Vue en donde voy a inyectar este codigo
const app = Vue.createApp({
/*   template: `
    <h1>Hola mundo</h1>
    <p>{{ {a:1,b:2} }}</p>
  `, */
  watch:{},
  setup(){},
  data(){
    return{
      quote:"I'm Batman",
      author: "Bruce Wayne"
    }
  },
  methods:{
    changeQuote(event){
      console.log('change quote called',event);
      this.author = 'Fernando Asintez'
      this.capitalize()
    },
    capitalize(){
      this.author = this.author.toUpperCase()
    }
  },
});
// y para ello tengo que decir donde quiero que se monte con app.mount(CSSselector:string)
app.mount("#myApp");
