import { useGeolocationStore, useMapStore } from "@/composables";
import { Feature } from "@/interfaces/places";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SearchResults",
  setup() {
    const { places, isLoadingPlaces } = useGeolocationStore();
    const { map } = useMapStore();
    const activePlace = ref();

    const onPlaceClicked = (place: Feature) => {
      activePlace.value = place.id;
      // tm estaba en place.center
      /*      console.log({center:place.center})
      console.log({geometry:place.geometry.coordinates}) */
      map.value?.flyTo({
        center: [place.geometry.coordinates[0], place.geometry.coordinates[1]],
        zoom: 13,
      });
    };

    return {
      places,
      isLoadingPlaces,
      activePlace,
      onPlaceClicked,
    };
  },
});
