<template>
  <MapView />
  <MyLocationBtn />
  <SearchBar />
  <TripDetails />
</template>

<script lang="ts">
import { useGeolocationStore } from "@/composables";
import { defineComponent } from "vue";

// fijate que tengo que apuntar al MapView.vue(que es un componente de Vue además) ya que si dejo solo MapView apunto al TS y eso no es nada.hay que apuntar al .vue
import MapView from "@/components/mapview/MapView.vue";
import MyLocationBtn from "@/components/my-location-btn/MyLocationBtn.vue";
import SearchBar from "@/components/search-bar/SearchBar.vue";
import TripDetails from "@/components/trip-details/TripDetails.vue";

export default defineComponent({
  name: "HomeView",
  components: { MapView, MyLocationBtn, SearchBar, TripDetails },
  setup() {
    useGeolocationStore();
  },
});
</script>
