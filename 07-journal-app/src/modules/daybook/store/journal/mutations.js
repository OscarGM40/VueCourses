// recuerda que las mutations son sincronas y también reciben el state,al que mutarán.Además,son las unicas que pueden mutar el state) luego =>

export const setEntries = (state, entries) => {
  state.entries = [];
  state.entries = entries;
  state.isLoading = false;
};

export const updateEntry = (state, entry) => {
  // en un arreglo gigante un findIndex sería mas eficiente,pues no va a iterar por todo él como si lo va a hacer el map
  // state.entries = state.entries.map((e) => (e.id === entry.id ? entry : e));
  state.entries[state.entries.findIndex(({ id }) => id === entry.id)] = entry;
};

export const addEntry = (state, entry) => {
  state.entries = [{...entry}, ...state.entries];
};

export const deleteEntry = (state, id) => {
  state.entries = state.entries.filter(entry => entry.id !== id);
};

