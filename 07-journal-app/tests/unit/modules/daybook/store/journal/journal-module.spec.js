import journalModule from "@/modules/daybook/store/journal";
import { journalStateMock } from "../../../../mocks/journalModule.mocks";
import { createStore } from "vuex";
import journalAPI from "@/api/journalApi";
import { transformEntries } from "@/modules/daybook/helpers/transformEntries";
import authApi from "@/api/authApi";

const createVuexMockStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journalModule,
        state: structuredClone(initialState),
      },
    },
  });

describe("Initial state should match", () => {
  beforeEach(() => jest.clearAllMocks());
  // no confundir beforeAll(que solo se ejecuta una vez)
  beforeAll(async () => {
    const { data } = await authApi.post(":signInWithPassword", {
      email: "test@test.gmail",
      password: "123456",
      // recuerda que este returnSecureToken es el que hace que se devuelve el idToken
      returnSecureToken: true,
    });
    const { idToken } = data;
    localStorage.setItem("idToken", idToken);
  });
  test("initialState should concord", () => {
    const store = createVuexMockStore(journalStateMock);
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalStateMock.entries);
  });

  test("setEntries mutation should set the given entries", () => {
    const store = createVuexMockStore({ isLoading: true, entries: [] });
    // console.log(store.state.journal);
    store.commit("journal/setEntries", [journalStateMock.entries[0]]);
    // console.log(store.state.journal);
    expect(store.state.journal.isLoading).toBeFalsy();
    expect(store.state.journal.entries.length).toBe(1);
  });

  test("updateEntry mutation should update the entry by its id", () => {
    const store = createVuexMockStore({ isLoading: true, entries: journalStateMock.entries });

    const entryToUpdate = {
      id: "-NMt3oLpVkNcI1uex3n3",
      date: 1674921046635,
      picture: "anotherImg.jpg",
      text: "entryToUpdate",
    };

    store.commit("journal/updateEntry", entryToUpdate);
    const updatedEntry = store.state.journal.entries.find((entry) => entry.id === entryToUpdate.id);
    expect(updatedEntry).toEqual(entryToUpdate);
    // parece igual que el toMatchObject(investigar +)
    expect(store.state.journal.entries).toContainEqual(entryToUpdate);
  });

  test("addEntry mutation should add the given entry to the state whereas deleteEntry should delete an entry by its id", () => {
    const store = createVuexMockStore({ isLoading: true, entries: [] });

    const entryToAdd = {
      id: "-NMt3oLpVkNcI1uex4n4",
      date: 1674921046665,
      picture: "anotherImg.jpg",
      text: "entryToAdd",
    };

    store.commit("journal/addEntry", entryToAdd);
    expect(store.state.journal.entries).toContainEqual(entryToAdd);
    store.commit("journal/deleteEntry", entryToAdd.id);
    expect(store.state.journal.entries.length).toBe(0);
  });

  test("getEntriesByTerm should return all entries with text in accordance with the given term", () => {
    const store = createVuexMockStore({ isLoading: true, entries: journalStateMock.entries });

    const [, entry2] = store.state.journal.entries;

    expect(store.getters["journal/getEntriesByTerm"]("curso").length).toBe(2);
    expect(store.getters["journal/getEntriesByTerm"]("haciendo")).toContainEqual(entry2);
    expect(store.getters["journal/getEntryById"](entry2.id)).toEqual(entry2);
  });

  test("loadEntries should load entries from Firebase", async () => {
    const store = createVuexMockStore({ isLoading: false, entries: [] });
    await store.dispatch("journal/loadEntries");
    expect(store.state.journal.entries.length).toBe(3);
  });

  // Mock de journalAPI
  jest.mock("@/api/journalApi");
  test("through mocking our Api,calling loadEntries action should set the mocked return value as initial entries", async () => {
    // Creamos el store con un estado con entries vacío
    const store = createVuexMockStore({
      isLoading: true,
      entries: [],
    });
    const data = transformEntries(journalStateMock.entries);
    journalAPI.get = jest.fn();
    journalAPI.get.mockResolvedValueOnce({ data });
    await store.dispatch("journal/loadEntries");
    expect(store.state.journal.entries).toHaveLength(2);
  });

  test("actions: updateEntry should update an entry from Firebase if the id exists", async () => {
    const store = createVuexMockStore({ isLoading: false, entries: journalStateMock.entries });

    const entryToUpdate = {
      id: "-NMrndf-y5yHdKmYgGVP",
      date: 1674899769991,
      picture:
        "https://res.cloudinary.com/oscargm40/image/upload/v1674921036/vue-daybook/qoywrtd7fpqtzejbugux.png",
      text: "Vue parece bastante interesante,asinto.Sigamos con el curso(updated from test environment)",
    };
    await store.dispatch("journal/updateEntry", entryToUpdate);
    expect(store.state.journal.entries.find((e) => e.id === entryToUpdate.id)).toEqual(
      entryToUpdate,
    );
    expect(store.state.journal.entries.find((e) => e.id === entryToUpdate.id).text).toBe(
      entryToUpdate.text,
    );
  });

  test("actions: createEntry y deleteEntry", async () => {
    // crearStore
    const store = createVuexMockStore({ isLoading: false, entries: journalStateMock.entries });
    // crear newEntry
    const newEntry = { date: 1674899769991, text: "Nueva entrada desde testing" };
    //  dispatch de la action newEntry
    const entrySaved = await store.dispatch("journal/createEntry", newEntry);
    // buscamos en el store la nueva  entrada
    const entryStored = store.state.journal.entries.find((e) => e.id === entrySaved);
    // que haga match y que el id sea un string(y que haya 3)
    expect(entryStored).toEqual({ ...newEntry, id: entrySaved });
    expect(entryStored.id).toEqual(expect.any(String));
    expect(store.state.journal.entries).toHaveLength(3);

    // la borramos
    await store.dispatch("journal/deleteEntry", entrySaved);
    // que haya dos
    expect(store.state.journal.entries).toHaveLength(2);
  });
  test("actions: createEntry y deleteEntry", async () => {
    // crearStore
    const store = createVuexMockStore({ isLoading: false, entries: journalStateMock.entries });
    // crear newEntry
    const newEntry = { date: 1674899769991, text: "Nueva entrada desde testing" };
    const newEntryId = "nuevo-id";
    // hacemos que el post devuelva lo que queramos
    const spyOnJournalApiPost = jest.spyOn(journalAPI, "post").mockResolvedValueOnce({
      data: { name: newEntryId },
    });
    const spyOnStoreCommit = jest.spyOn(store, "commit");
    const entrySaved = await store.dispatch("journal/createEntry", newEntry);
    expect(spyOnJournalApiPost).toHaveBeenCalledWith("/entries.json", {
      ...newEntry,
      picture: null,
    });
    expect(spyOnStoreCommit).toHaveBeenCalledWith(
      "journal/addEntry",
      { ...newEntry, id: entrySaved },
      undefined,
    );
    expect(newEntryId).toBe(entrySaved);
  });
});
