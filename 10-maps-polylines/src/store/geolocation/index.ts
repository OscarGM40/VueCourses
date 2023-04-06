import { Module } from "vuex";
import { RootState } from "..";

import state, { GeolocationState } from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const geolocationModule: Module<GeolocationState, RootState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default geolocationModule;
