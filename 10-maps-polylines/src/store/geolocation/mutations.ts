import { MutationTree } from "vuex";
import { GeolocationState } from "./state";
import { Feature } from "@/interfaces/places";

const mutation: MutationTree<GeolocationState> = {
  setLngLat(state: GeolocationState, coords: GeolocationCoordinates) {
    // coors es un objeto de tipo GeolocationCoordinates con varias propiedades,entre ellas latitude y longitued
    // console.log({ coords });

    state.userLocation = [coords.longitude, coords.latitude];
    state.isLoading = false;
  },
  setIsLoadingPlaces(state, loading: boolean) {
    state.isLoadingPlaces = loading;
  },
  setPlaces(state, places: Feature[]) {
    state.places = places;
  },
};

export default mutation;
