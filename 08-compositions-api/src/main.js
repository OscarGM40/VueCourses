import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// el store es lo que debe estar más arriba en el contexto de una aplicación
createApp(App).use(store).use(router).mount('#app')
