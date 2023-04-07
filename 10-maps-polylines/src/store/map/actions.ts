import { directionsApi } from "@/apis";
import { DirectionsResponse } from "@/interfaces/directions";
import { ActionTree } from "vuex";
import { RootState } from "..";
import { MapState } from "./state";

export type LngLat = [number, number];
export interface ITraceRouteArgs {
  start: LngLat;
  end: LngLat;
}
const actions: ActionTree<MapState, RootState> = {
  async getRouteBetweenPoints({ commit }, { start, end }: ITraceRouteArgs) {
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`,
    );
    // TODO distancia y duracion
    // solo nos interesa la primera ruta,y de ella sus coordenadas
    commit("setRoutePolyline",resp.data.routes[0].geometry.coordinates);
  },
};

export default actions;
