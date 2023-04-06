import { RootState } from "@/store";
import { computed } from "vue";
import { useStore } from "vuex";

export const useGeolocationStore = () => {
  const store = useStore<RootState>();

  // comprobamos si la location es undefined y si lo es llamamos a la action para que lo haga solo una vez
  if (!store.getters["geolocation/isUserLocationReady"]) {
    store.dispatch("geolocation/getInitialLocation");
  }
  return {
    // direct access to state computed props
    isLoading: computed(() => store.state.geolocation.isLoading),
    userLocation: computed(() => store.state.geolocation.userLocation),
    places: computed(() => store.state.geolocation.places),
    isLoadingPlaces: computed(() => store.state.geolocation.isLoadingPlaces),
    // getters
    isUserLocationReady: computed(() => store.getters["geolocation/isUserLocationReady"]),
    // actions or mutations
    searchPlacesByTerm: (term = "") => store.dispatch("geolocation/searchPlacesByTerm", term),
  };
};
