import { createStore } from "vuex";

import authModule from "@/modules/auth/store";
import journalModule from "@/modules/daybook/store/journal";

// state inicial de un journalStore
import { journalStateMock } from "../mocks/journalModule.mocks";

// closure.Fijate que le parametrizamos los estados iniciales
const createMainStore = (authInitState, journalInitState = journalStateMock) => {
  return createStore({
    modules: {
      auth: {
        ...authModule,
        state: structuredClone(authInitState),
      },
      journal: {
        ...journalModule,
        state: structuredClone(journalInitState),
      },
    },
  });
};

export default createMainStore;
