import { GetterTree } from "vuex";
import { ExampleStateInterface } from "./state";
import { RootState } from "..";

const getters: GetterTree<ExampleStateInterface, RootState> = {
  someGetter(/* state */) {
    // return true;
  },
};

export default getters;
