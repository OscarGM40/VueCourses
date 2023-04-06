import { ActionTree } from "vuex";
import { GeolocationState } from "./state";
import { RootState } from "..";
import { searchApi } from "@/apis";
import { PlacesResponse } from "@/interfaces/places";
import { Feature } from "@/interfaces/places";

const actions: ActionTree<GeolocationState, RootState> = {
  getInitialLocation({ commit }) {
    // fijate que la sign dice que getCurrentPosition necesita una successCallback
    navigator.geolocation.getCurrentPosition(
      (position) => commit("setLngLat", position.coords),
      (error) => {
        console.error(error);
        throw new Error(`Unable to get position due to error: ${error}`);
      },
    );
  },
  // todo colocar el valor de retorno
  async searchPlacesByTerm({ commit, state }, query: string): Promise<Feature[]> {
    if (query.length === 0) {
      commit("setPlaces", []);
      return [];
    }

    commit("setIsLoadingPlaces", true);
    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation?.join(","),
      },
    });
    commit("setIsLoadingPlaces", false);
    commit("setPlaces", resp.data.features);
    return resp.data.features;
  },
};

export default actions;
