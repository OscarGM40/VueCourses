import { MutationTree } from "vuex";
import { MapState } from "./state";
import Mapboxgl from "mapbox-gl";
import { Feature } from "@/interfaces/places";
import { LngLat } from "./actions";

const MY_LINE_ID = "MyPolylineLayer";

const mutation: MutationTree<MapState> = {
  setMap(state, payload: Mapboxgl.Map) {
    if (state.map === undefined) {
      state.map = payload;
    }
    return;
  },

  setMarkers(state, payload: Feature[]) {
    // para borrar los marcadores hay que llamar a remove y reasignar a un arreglo vacio
    state.markers.forEach((marker) => marker.remove());
    state.markers = [];
    if (!state.map) return;

    payload.forEach((feature) => {
      const [lng, lat] = feature.center;
      const popup = new Mapboxgl.Popup({
        offset: [0, -35],
        maxWidth: "none",
        closeButton: true,
      }).setLngLat([lng, lat]).setHTML(`
          <h4>${feature.text_es}</h4>
          <p>${feature.place_name_es}</p>
      `);
      const marker = new Mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .addTo(state.map!);
      state.markers.push(marker);
    });
    // si los marcadores han cambiado no tiene sentido tener la polyline
    if (state.map.getLayer(MY_LINE_ID)) {
      state.map.removeLayer(MY_LINE_ID);
      state.map.removeSource(MY_LINE_ID);
      state.distance = undefined;
      state.duration = undefined;
    }
  },

  setRoutePolyline(state, coords: number[][]) {
    const start = coords[0];

    // NOTA: agregar una Boundary se asegura que la Polyline quepa en el mapa,redimensionandolo segun la Boundary

    // PASO UNO : definir unas Boundaries con la clase LngLatBounds,empezarán en el punto inicial
    const bounds = new Mapboxgl.LngLatBounds(
      // porque repetimos las mismas coords ??
      [start[0], start[1]],
      [start[0], start[1]],
    );
    // PASO 1.5 ir agregando más puntos/coordenadas a la Boundary con el método extend
    coords.forEach((coord) => {
      const newCoord: LngLat = [coord[0], coord[1]];
      bounds.extend(newCoord);
    });

    // PASO DOS : agregar esta Boundary al mapa con map.fitBounds(hay que dar un pequeño padding general en las options del segundo argumento)
    state.map?.fitBounds(bounds, {
      padding: 300,
    });

    // PASO TRES: definir una Source(ojo con el tipo)
    const sourceData: Mapboxgl.AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    // PASO CUATRO añadir esa source.Ojo,el primer argumento pide un string que debe ser el ID de la capa del paso cinco.Ojo,si ya hubiera una Layer con el mismo ID debo borrar la capa y el Source

    if (state.map?.getLayer(MY_LINE_ID)) {
      state.map?.removeLayer(MY_LINE_ID);
      state.map?.removeSource(MY_LINE_ID);
    }
    // NOTA: addSource va a crear una Source con el mismo ID que la capa,asi que al añadir o borrar la capa o la source los literales van a coincidir.Además las propiedades id y source de la Layer tienen el mismo literal como valor obviamente
    state.map?.addSource(MY_LINE_ID, sourceData);

    // PASO CINCO añadir la Layer(la Polyline).Ojo que el ID debe hacer match con el step 4
    state.map?.addLayer({
      id: MY_LINE_ID,
      type: "line",
      source: MY_LINE_ID,
      layout: {
        "line-cap": "round", //bordecitos de la linea redondeados
        "line-join": "round",
      },
      paint: {
        "line-color": "black", // cualquier color o hexadecimal
        "line-width": 3,
      },
    });
  },
};

export default mutation;
