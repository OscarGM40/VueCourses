export const transformEntries = (array) => {
  // array tiene una propiedad id que hará de clave
  const result = array.reduce((map, obj) => {
    // Copia profunda del objeto
    const copy = JSON.parse(JSON.stringify(obj));
    // Retiramos la clave
    delete copy.id;
    return (map[obj.id] = copy), map;
  }, {});

  return result;
};
