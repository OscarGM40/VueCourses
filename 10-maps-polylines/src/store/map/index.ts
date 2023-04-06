import { Module } from "vuex";
import { RootState } from "..";

import state, { MapState } from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const mapModule: Module<MapState, RootState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default mapModule;
