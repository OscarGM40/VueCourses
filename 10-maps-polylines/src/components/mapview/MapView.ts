import { useGeolocationStore, useMapStore } from "@/composables";
import Mapboxgl from "mapbox-gl";
import { defineComponent, nextTick, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "MapView",

  setup() {
    const mapElement = ref<HTMLDivElement>();
    const { isLoading, userLocation, isUserLocationReady } = useGeolocationStore();
    const { setMap } = useMapStore();

    const initMap = () => {
      // las refs pueden ser undefined,mejor protegerse
      if (!mapElement.value) return;
      if (!isUserLocationReady.value) return;
      if (!userLocation.value) return;

      // dado que no carga muy bien los estilos vamos a ralentizar un poco la carga del mapa.Esta Promise es suficiente.Usaré nextTick
      // await Promise.resolve()

      // fijate que Mapboxgl.Map crea una instancia cada vez que se llame
      const map = new Mapboxgl.Map({
        // container ID(LA REF ME VALE!!, es un ID al contenedor)
        container: mapElement.value,
        // style URL: https://docs.mapbox.com/mapbox-gl-js/api/map/
        style: "mapbox://styles/mapbox/satellite-streets-v11",
        // starting position [lng, lat]
        center: userLocation.value,
        // starting zoom
        zoom: 11,
        // override default key
        accessToken: process.env.VUE_APP_MAPBOX_KEY,
      });

      // markers and popups: https://docs.mapbox.com/mapbox-gl-js/api/markers/
      const myLocationPopup = new Mapboxgl.Popup({
        offset: [0, -35],
        maxWidth: "none",
        closeButton: true,
      }).setLngLat(userLocation.value).setHTML(`
          <h4>Aquí estoy</h4>
          <p>Actualmente en Bizkaia</p>
      `);

      new Mapboxgl.Marker().setLngLat(userLocation.value).setPopup(myLocationPopup).addTo(map);
      setMap(map);
    };

    onMounted(() => {
      // puede ser que primero se monte y despues tengamos la geolocalizacion
      if (isUserLocationReady.value) return initMap();
    });

    watch(
      isUserLocationReady,
      (newVal) => {
        if (newVal) nextTick(() => initMap());
      },
      { immediate: false },
    );

    return {
      isLoading,
      userLocation,
      isUserLocationReady,
      mapElement,
      initMap,
    };
  },
});
