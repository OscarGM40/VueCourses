import Mapboxgl from "mapbox-gl";

export interface MapState {
  // el mapa será undefined mientras carga inicialmente.Fijate que estoy usando una clase para tipar la interface (property:Class)
  map?: Mapboxgl.Map;
  // tmb tendremos marcadores
  markers: Mapboxgl.Marker[];
  // distancia y duracion del trayecto
  distance?: number;
  duration?: number;
}

function state(): MapState {
  return {
    map: undefined,
    markers: [],
    distance: undefined,
    duration: undefined,
  };
}

export default state;
