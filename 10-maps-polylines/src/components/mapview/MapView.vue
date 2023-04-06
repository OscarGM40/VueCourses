<script lang="ts" src="./MapView"></script>

<template>
  <!-- fijate que este div es solo una capa oscura -->
  <div class="loading-map d-flex justify-content-center align-items-center" v-if="!isUserLocationReady">
    <div class="text-center text-white">
      <h3>Espere,por favor</h3>
      <span>Localizando...</span>
    </div>
  </div>

  <div class="map-container" v-show="isUserLocationReady" ref="mapElement">

  </div>
</template>

<style scoped>
.loading-map {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
}

.map-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  /* backdrop-filter: blur(18px); */
}
</style>
