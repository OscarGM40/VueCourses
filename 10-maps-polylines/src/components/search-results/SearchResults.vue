<script lang="ts" src="./SearchResults.ts" />

<template>
  <!-- loading -->
  <div v-if="isLoadingPlaces" class="alert alert-primary text-center">
    <h5>Cargando</h5>
    <span>Espere por favor...</span>
  </div>
  <!-- realmente no es un v-else sino un v-else-if  -->
  <ul class="list-group mt-2 mb-1" v-else-if="places.length > 0">
    <li
      v-for="place in places"
      :key="place.id"
      class="list-group-item list-group-item-action"
      :class="{'active':place.id === activePlace}"
      @click="() => onPlaceClicked(place)"
    >
      <h5>{{ place.text_es }}</h5>
      <p>
        {{ place.place_name_es }}
      </p>
      <div class="text-end">
        <button
          class="btn"
          :class="place.id === activePlace ? 'btn-outline-light' : 'btn-outline-primary'"
        >
          Direcciones
        </button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
li {
  cursor: pointer;
}
h5 {
  font-size: 16px;
  margin-bottom: 4px;
}
p {
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 4px;
}
button {
  font-size: 12px;
  margin-top: 2px;
  margin-bottom: 3px;
}
</style>
