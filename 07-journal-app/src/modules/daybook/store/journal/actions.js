// recuerda que una accion es asincrona y que recibia el contexto,del cual solo quiero el commit(para llamar a mutations) luego =>

import journalApi from "@/api/journalApi";

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get("/entries.json");
  // ojo que si no hay data el Object.keys(data) va a reventar la app pues data es null
  if(!data) return commit("setEntries",[])
  const entries = [];
  /* 
  Object.keys(data).map( (id) => {
     return entries.push({
       id: id,
       ...data[id],
      }); 
    }) */
  // otra forma muy interesante era acon un for(let key of Object.keys)
  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
  }
  // console.log(entries)
  commit("setEntries", entries);
};
export const updateEntry = async ({ commit }, entry) => {
  const entryToSave = {
    date: entry.date,
    text: entry.text,
    picture: entry.picture || null,
  };
  // me viene la entrada updateada
  await journalApi.put(`/entries/${entry.id}.json`, entryToSave);
  // aqui si romper referencia,asinto
  commit("updateEntry", { ...entry });
};
export const createEntry = async ({ commit }, entry) => {
  const entryToSave = {
    date: entry.date,
    text: entry.text,
    picture: entry.picture || null,
  };
  // Firebase en los POSTS devuelve el id asi {name: 'Msdf345h},en una propiedad name
  const { data } = await journalApi.post(`/entries.json`, entryToSave);
  // asi que hay que mandar esa propiedad name como el id al commit de la mutation
  commit("addEntry", { ...entry, id: data.name });
  // también lo retornaremos para redireccionar a la nueva entrada
  return data.name;
};

export const deleteEntry = async ({ commit }, id) => {
  // para borrar en Firebase es con delete(/item/:id.json)
  await journalApi.delete(`/entries/${id}.json`);
  commit("deleteEntry", id);
};
