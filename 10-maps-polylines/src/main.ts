import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import mapboxgl from "mapbox-gl";

/* mapboxgl.accessToken =
  process.env.VUE_APP_MAPBOX_KEY ||
  "pk.eyJ1Ijoib3NjYXJnbTQwIiwiYSI6ImNrbHhoZ2I0dTNhMmsydm4xdGhlaHF3MzAifQ.vyYKwnF9auoGxBwkI6LivA"; */

// el objeto navigator siempre existe(en realidad será window.navigator),si su propiedad geolocation es undefined mostramos esto,ni siquiera creamos la aplicación de Vue(importante el punto de llamada)
if (navigator.geolocation === undefined) {
  window.alert("Tu navegador no tiene activada la geolocalización");
}

createApp(App).use(store).use(router).mount("#app");
