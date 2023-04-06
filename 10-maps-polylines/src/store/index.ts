import { createStore } from "vuex";
import geolocationModule from "./geolocation";
import { GeolocationState } from "./geolocation/state";
import { MapState } from "./map/state";
import mapModule from "./map";

// es el estado global de la app
export interface RootState {
  geolocation: GeolocationState;
  map: MapState;
}
// le pasamos el RootType a este createStore
export default createStore<RootState>({
  modules: {
    geolocation: geolocationModule,
    map: mapModule,
  },
});
