<template>
  <div class="about">
    <h1>{{ title }}</h1>
    <button @click="onChangeTitle">Change title</button>
  </div>
</template>

<script>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  onActivated,
  onDeactivated,
} from "vue";

export default {
  name: "about",
  props: "",
  emits: [],
  setup() {
    const title = ref("About");
    console.log("setup se llamó");

    onBeforeMount(() => {
      console.log("onBeforeMount se llamó");
    }),
    onMounted(() => {
      console.log("onMounted se llamó");
    }),
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate se llamó");
    }),
    onUpdated(() => {
      console.log("onUpdated se llamó");
    }),
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount se llamó");
    }),
    onUnmounted(() => {
      console.log("onUnmounted se llamó");
    }),
    onErrorCaptured(() => {
      console.log("onErrorCaptured se llamó");
    }),
    onRenderTracked(() => {
      console.log("onRenderTracked se llamó");
    }),
    onRenderTriggered(() => {
      console.log("onRenderTriggered se llamó");
    }),
    onActivated(() => {
      console.log("onActivated se llamó");
    }),
    onDeactivated(() => {
      console.log("onDeactivated se llamó ");
    });

      return {
        title,
        onChangeTitle: () => title.value = 'New about'
      }
  },
};
</script>
