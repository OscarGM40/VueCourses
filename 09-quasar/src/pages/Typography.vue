<template>
  <q-page class="flex column q-pa-md">
    <span class="text-h1 text-weight-thin">Headline 1</span>
    <span class="text-h2">Headline 2</span>
    <span class="text-h3">Headline 3</span>
    <span class="text-h4 text-weight-medium">Headline 4</span>
    <span class="text-h5">Headline 5</span>
    <span class="text-h6 text-weight-bold">Headline 6</span>

    <q-separator class="q-my-sm" />
    <span class="text-subtitle1"> Subtitle 1</span>
    <span class="text-subtitle2">Subtitle 2</span>

    <q-separator class="q-mb-md q-mt-md" />
    <p class="text-body1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam minima officia
      vero! Earum explicabo iusto harum, labore, beatae aliquam accusamus quas nostrum
      itaque unde nesciunt odit, rem quisquam id? Voluptatem!
    </p>
    <p class="text-body2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta voluptatibus
      facilis ipsum numquam quisquam veritatis, vitae reiciendis at, amet dignissimos
      provident earum quia velit totam hic molestiae iusto aliquid rerum.
    </p>

    <q-separator class="q-mb-md q-mt-sm" />
    <span class="text-weight-thin">lorem ipsum is simply dummy text</span>
    <span class="text-weight-light">lorem ipsum is simply dummy text</span>
    <span class="text-weight-regular">lorem ipsum is simply dummy text</span>
    <span class="text-weight-medium">lorem ipsum is simply dummy text</span>
    <span class="text-weight-bold">lorem ipsum is simply dummy text</span>
    <span class="text-weight-bolder">lorem ipsum is simply dummy text</span>

    <q-btn
      color="primary"
      class="q-mt-md"
      :label="sideMenuOpen ? 'Cerrar menu lateral':'Abrir menu lateral'"
      @click="toogleSideMenu"
    />
  </q-page>
</template>

<script>
import { useUI } from "../composables/useUi";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TypographyPage",
  setup() {
    const { sideMenuOpen, toogleSideMenu } = useUI();
    return {
      toogleSideMenu,
      sideMenuOpen,
    };
  },
});
</script>
