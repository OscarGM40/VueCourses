import { createEntry, deleteEntry, updateEntry } from "@/modules/daybook/store/journal/actions";
import { getEntriesByTerm, getEntryById } from "@/modules/daybook/store/journal/getters";

export const journalStateMock = {
  isLoading: false,
  entries: [
    {
      id: "-NMrndf-y5yHdKmYgGVP",
      date: 1674899769891,
      picture:
        "https://res.cloudinary.com/oscargm40/image/upload/v1674921036/vue-daybook/qoywrtd7fpqtzejbugux.png",
      text: "Vue parece bastante interesante,asinto.Sigamos con el curso",
    },
    {
      id: "-NMt3oLpVkNcI1uex3n3",
      date: 1674921046635,
      picture:
        "https://res.cloudinary.com/oscargm40/image/upload/v1674921067/vue-daybook/n1qkahb074e8maiwghik.png",
      text: "Asinto está haciendo el curso",
    },
  ],
};

export const mockedJournalStore = {
  namespaced: true,
  state: () => ({
    loading: false,
    entries: journalStateMock.entries,
  }),
  getters: {
    getEntriesByTerm: getEntriesByTerm,
    getEntryById,
  },
  actions: {
    updateEntry: updateEntry,
    deleteEntry: deleteEntry,
    createEntry: createEntry,
  },
};
