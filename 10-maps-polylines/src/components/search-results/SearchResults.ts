import { useGeolocationStore, useMapStore } from "@/composables";
import { Feature } from "@/interfaces/places";
import { LngLat } from "@/store/map/actions";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "SearchResults",
  setup() {
    const { places, isLoadingPlaces, userLocation } = useGeolocationStore();
    const { map, setMarkers, getRouteBetweenPoints } = useMapStore();
    const activePlace = ref();

    watch(places, (newPlaces) => {
      activePlace.value = "";
      setMarkers(newPlaces);
    });

    const onPlaceClicked = (place: Feature) => {
      activePlace.value = place.id;
      // tm estaba en place.center
      /*      console.log({center:place.center})
      console.log({geometry:place.geometry.coordinates}) */
      map.value?.flyTo({
        center: [place.geometry.coordinates[0], place.geometry.coordinates[1]],
        zoom: 11,
      });
    };

    const traceRoute = (end: number[]) => {
      if (!userLocation.value) return;
      const start = userLocation.value;
      getRouteBetweenPoints(start, end as LngLat);
    };

    return {
      places,
      isLoadingPlaces,
      activePlace,
      onPlaceClicked,
      traceRoute,
    };
  },
});
