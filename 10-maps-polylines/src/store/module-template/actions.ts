import { ActionTree } from "vuex";
import { ExampleStateInterface } from "./state";
import { RootState } from "..";

const actions: ActionTree<ExampleStateInterface, RootState> = {
  someAction(/*{ commit }, payload  */) {
    // a line to prevent linter errors
  },
};

export default actions;
