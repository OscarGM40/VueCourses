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

    <!-- q-separator es el tipico Divider -->
    <q-separator spaced />
    <!-- Quasar es mobile first,debo ir ajustando contenido en base a sus breakpoints -->
    <div class="row q-mb-md justify-center">
      <div class="col col-12 col-md-6 col-lg-4 bg-primary">Col 1</div>
      <div class="col col-12 col-md-6 col-lg-4 bg-secondary">Col 2</div>
      <div class="col col-12 col-md-6 col-lg-4 bg-accent">Col 3</div>
    </div>

    <q-separator spaced />

    <!-- fijate que row ya pone en flex por defecto para que sea una fila(y aparte viene en wrap todo,recuerda).Dado que quieren que sea una fila tiene todo el sentido del mundo.Por defecto estarán en justify-start-->
    <div class="row q-my-md">
      <div class="square-box bg-primary">Caja 1</div>
      <div class="square-box bg-secondary">Caja 2</div>
      <div class="square-box bg-accent">Caja 3</div>
    </div>
    <q-separator spaced />
    <!-- puedo cambiar las justificaciones del contenedor -->
    <div class="row justify-between">
      <div class="square-box bg-primary">Caja 1</div>
      <div class="square-box bg-secondary">Caja 2</div>
      <div class="square-box bg-accent">Caja 3</div>
    </div>
    <q-separator spaced />
    <div class="row justify-end">
      <div class="square-box bg-primary">Caja 1</div>
      <div class="square-box bg-secondary">Caja 2</div>
      <div class="square-box bg-accent">Caja 3</div>
    </div>
    <q-separator spaced />
    <div class="row justify-around">
      <div class="square-box bg-primary">Caja 1</div>
      <div class="square-box bg-secondary">Caja 2</div>
      <div class="square-box bg-accent">Caja 3</div>
    </div>
    <q-separator spaced />

    <!-- fijate que la clase column de nuevo trae sus estilos, trae un display flex que por ello es un bloque todo y flex direction de column(asi que si quiero alinear en el eje X tengo que usar align items center pues por defecto están en items-start)  -->
    <div class="column bg-dark items-center">
      <div class="square-box bg-primary">Caja 1</div>
      <div class="square-box bg-secondary">Caja 2</div>
      <div class="square-box bg-accent">Caja 3</div>
    </div>

    <q-separator spaced />
    <div class="column bg-secondary items-end">
      <div class="square-box bg-primary">Caja 1</div>
      <div class="square-box bg-secondary">Caja 2</div>
      <div class="square-box bg-accent">Caja 3</div>
    </div>

    <q-separator spaced />
    <div class="column custom-height bg-info items-center justify-center">
      <div class="square-box bg-primary">Caja 1</div>
      <div class="square-box bg-secondary">Caja 2</div>
      <div class="square-box bg-accent">Caja 3</div>
    </div>
    <q-separator spaced />
    <div class="column custom-height bg-warning items-center justify-between">
      <div class="square-box bg-primary self-start">Caja 1</div>
      <div class="square-box bg-secondary self-end">Caja 2</div>
      <div class="square-box bg-accent">Caja 3</div>
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
.col,
.col-4,
.col-6,
.col-12 {
  height: 50px;
}

.square-box {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom-height {
  height: 300px;
}
</style>
