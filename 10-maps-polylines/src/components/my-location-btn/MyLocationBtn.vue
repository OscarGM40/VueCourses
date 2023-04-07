<script lang="ts" src="./MyLocationBtn"></script>

<template>
  <button v-if="isBtnReady"  class="btn btn-primary" @click="goToOriginalPosition">Volver a mi ubicación</button>
</template>

<style scoped>
button {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>
