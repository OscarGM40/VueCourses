import { GetterTree } from "vuex";
import { GeolocationState } from "./state";
import { RootState } from "..";

const getters: GetterTree<GeolocationState, RootState> = {
  isUserLocationReady(state): boolean {
    return !!state.userLocation;
  },
};

export default getters;
