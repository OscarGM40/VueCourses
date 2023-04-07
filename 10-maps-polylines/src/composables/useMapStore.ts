import { RootState } from "@/store";
import { computed } from "vue";
import { useStore } from "vuex";
import Mapboxgl from "mapbox-gl";
import { Feature } from "@/interfaces/places";
import { LngLat } from "@/store/map/actions";

export const useMapStore = () => {
  const store = useStore<RootState>();

  return {
    // computed solo para acceder a properties o getters
    map: computed(() => store.state.map.map),
    distance: computed(() => store.state.map.distance),
    duration: computed(() => store.state.map.duration),
    // fijate que la mutation no es una computed,ni las actions lo serán
    setMap: (map: Mapboxgl.Map) => store.commit("map/setMap", map),
    // ojo que hay que tipar las computed para los bool
    isMapReady: computed<boolean>(() => store.getters["map/isMapReady"]),
    setMarkers: (places: Feature[]) => store.commit("map/setMarkers", places),
    getRouteBetweenPoints: (start: LngLat, end: LngLat) =>
      store.dispatch("map/getRouteBetweenPoints", { start, end }),
  };
};
