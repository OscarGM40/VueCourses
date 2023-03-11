<template>
  <h1>Aprendiendo Slots</h1>
  <button @click="openModal">Abrir modal</button>

  <!-- SLOT -->
  <!--   <Modal>
    <h2>Titulo de la modal</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime praesentium
      molestiae rem velit corporis facilis, molestias voluptatum accusamus quibusdam
      aliquid repudiandae cupiditate blanditiis repellendus deleniti beatae dolorum at
      omnis obcaecati?
    </p>
    <button>Cerrar</button>
  </Modal> -->

  <!-- NAMED SLOT -->
  <!-- <Modal v-if="isOpen" title="Hola mundo" @on:close="closeModal"> -->
  <Modal
    v-if="isOpen"
    title="Hola mundo"
    otherTitleAsAttribute="hola mundo"
    @click.self="closeModal"
  >
    <template v-slot:body>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime praesentium
        molestiae rem velit corporis facilis, molestias voluptatum accusamus quibusdam
        aliquid repudiandae cupiditate blanditiis repellendus deleniti beatae dolorum at
        omnis obcaecati?
      </p>
    </template>

    <template v-slot:footer>
      <button @click="closeModal">Cerrar</button>
    </template>
    <template v-slot:header>
      <h2>titulo del modal</h2>
    </template>
    <template v-slot:exposed="slotProps">
      <h2>{{ slotProps }}</h2>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/Modal.vue";
import { ref } from "vue";
export default {
  // recuerda que tengo que registrar los componentes que use éste componente
  components: { Modal },
  setup() {
    const isOpen = ref(false);

    return {
      isOpen,
      openModal: () => (isOpen.value = true),
      closeModal: () => (isOpen.value = false),
    };
  },
};
</script>
<style scoped></style>
