<script lang="ts" src="./TripDetails"></script>
<template>
  <div class="trip-container column" v-if="distance && duration">
    <div class="col">Distancia: {{ distance }} <span>kms</span></div>
    <div class="col">Duracion: {{ duration }} <span>minutos</span></div>
  </div>
</template>

<style scoped>
.trip-container {
  padding: 10px;
  position: fixed;
  bottom: 80px;
  left: 20px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  font-size: 20px;
  width: 300px;
}
span {
  color: #42b983;
}
</style>
