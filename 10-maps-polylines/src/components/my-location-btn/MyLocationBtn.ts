import { useGeolocationStore, useMapStore } from "@/composables";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "MyLocationBtn",

  setup() {

    const { map,isMapReady } = useMapStore();
    const { userLocation,isUserLocationReady } = useGeolocationStore();

    const goToOriginalPosition = () => {
      if (!map.value) return;
      if (!userLocation.value) return;

      map.value.flyTo({
        center: userLocation.value,
        zoom: 11,
      });
    };

    return {
      isBtnReady: computed<boolean>(() => isUserLocationReady.value && isMapReady.value),
      goToOriginalPosition,
    };
  },
});
