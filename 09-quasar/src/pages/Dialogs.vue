<template>
  <q-page class="q-pa-md">
    <span class="text-h3">Dialogs</span>
    <q-separator spaced />

    <template v-if="promptValue">
      <span class="text-h6">The value is: {{ promptValue }}</span>
      <q-separator spaced />
    </template>

    <div class="q-pa-md q-gutter-sm">
      <q-btn unelevated label="Alert" color="primary" @click="alert" />
      <q-btn unelevated label="Confirm" color="primary" @click="confirm" />
      <q-btn unelevated label="Prompt" color="primary" @click="prompt" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "DialogPage",
  setup() {
    // en $q tengo todo el objeto Quasar,el hook lo instancia y retorna
    const $q = useQuasar();
    const promptValue = ref();

    function alert() {
      $q.dialog({
        title: "Alert",
        message: "Some message",
      })
        .onOk(() => {
          console.log("OK");
        })
        .onCancel(() => {
          console.log("Cancel");
        })
        .onDismiss(() => {
          console.log("I am triggered on both OK and Cancel events");
        });
    }
    function confirm() {
      $q.dialog({
        title: "Confirm",
        message: "Would you like to turn on the wifi?",
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          console.log("OK");
        })
        .onOk(() => {
          console.log("second OK catcher");
        })
        .onCancel(() => {
          console.log("Cancel");
        })
        .onDismiss(() => {
          console.log("I am triggered on both OK and Cancel events");
        });
    }
    function prompt() {
      $q.dialog({
        title: "Promt",
        message: "What is your name?",
        position: "standard",
        prompt: {
          model: "",
          type: "text", // <- input type text
        },
        cancel: true,
        persistent: true,
      })
        .onOk((val) => {
          promptValue.value = val;
          console.log("OK");
        })
        .onCancel(() => {
          console.log("Cancel");
        })
        .onDismiss(() => {
          console.log("I am triggered on both OK and Cancel events");
        });
    }

    return {
      alert,
      confirm,
      prompt,
      promptValue,
    };
  },
});
</script>
