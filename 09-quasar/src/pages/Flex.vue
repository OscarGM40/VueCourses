<template>
  <q-page class="">
  <!-- si no le doy medida a las columnas las pondrá en col-auto -->
    <div class="row q-mb-md">
      <div class="col bg-primary">Col 1</div>
      <div class="col bg-secondary">Col 2</div>
      <div class="col bg-accent">Col 3</div>
    </div>
    <!-- por defecto una row tiene 12 columnas,si pongo dos de col-6 desaparecerá la tercera -->
    <div class="row q-mb-md">
      <div class="col bg-primary">Col 1</div>
      <div class="col col-6 bg-secondary">Col 2</div>
      <div class="col col-6 bg-accent">Col 3</div>
    </div>
    <!-- si me paso de columnas recuerda que tienen el display flex en wrap y hará salto -->
    <div class="row q-mb-md">
      <div class="col col-4 bg-primary">Col 1</div>
      <div class="col col-4 bg-secondary">Col 2</div>
      <div class="col col-6 bg-accent">Col 3</div>
    </div>
    <!-- siempre que tenga hueco en el eje X puedo alinear los items -->
    <div class="row q-mb-md justify-center">
      <div class="col col-4 bg-primary">Col 1</div>
      <div class="col col-4 bg-secondary">Col 2</div>
    </div>
    <!-- siempre que tenga hueco en el eje X puedo alinear los items -->
    <div class="row q-mb-md justify-start">
      <div class="col col-4 bg-primary">Col 1</div>
      <div class="col col-4 bg-secondary">Col 2</div>
    </div>
    <!-- siempre que tenga hueco en el eje X puedo alinear los items -->
    <div class="row q-mb-md justify-end">
      <div class="col col-4 bg-primary">Col 1</div>
      <div class="col col-4 bg-secondary">Col 2</div>
    </div>
    <!-- siempre que tenga hueco en el eje X puedo alinear los items -->
    <div class="row q-mb-md justify-between">
      <div class="col col-4 bg-primary">Col 1</div>
      <div class="col col-4 bg-secondary">Col 2</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "FlexPage",
});
</script>

<style scoped>

 .col, .col-4, .col-6, .col-12 {
  height: 50px;

 }

</style>