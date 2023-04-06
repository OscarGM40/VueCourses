import { MutationTree } from "vuex";
import { MapState } from "./state";
import Mapboxgl from "mapbox-gl";

const mutation: MutationTree<MapState> = {
  setMap(state, payload: Mapboxgl.Map) {
    if (state.map === undefined) {
      state.map = payload;
    }
    return;
  },
};

export default mutation;
