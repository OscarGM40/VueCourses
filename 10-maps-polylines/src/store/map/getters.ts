import { GetterTree } from "vuex";
import { MapState } from "./state";
import { RootState } from "..";

const getters: GetterTree<MapState, RootState> = {
  isMapReady(state) {
    return !!state.map;
  },
};

export default getters;
