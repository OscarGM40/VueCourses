<template>
  <q-page class="q-pa-md">
    <span class="text-h3">Forms</span>
    <q-separator spaced />

    <div class="row justify-center q-pt-lg">
      <div class="col col-md-6">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-xs">
          <q-input
            filled
            v-model="userForm.email"
            type="email"
            label="Enter your email"
            hint="your email(example@gmail.com)"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              (val) => isValidEmail(val), // fijate que podia mandar la funcion por ref
            ]"
          />

          <q-input
            filled
            type="password"
            v-model="userForm.password1"
            label="Enter your password"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']"
          />

          <q-input
            filled
            type="password"
            v-model="userForm.password2"
            label="Enter your password again"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es obligatorio',
              isSamePassword, //lo mismo que val => isSamePassword(val)
            ]"
          />

          <q-checkbox
            v-model="userForm.conditions"
            label="Accept conditions and use terms"
            :style="userForm.errorInConditions && !userForm.conditions && 'color:red'"
          />

          <div class="row justify-end">
            <q-btn
              unelevated
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
            <q-btn unelevated label="Submit" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "FormsPage",

  setup() {
    const $q = useQuasar();

    const userForm = ref({
      email: "",
      password1: "",
      password2: "",
      conditions: false,
      errorInConditions: false,
    });

    return {
      userForm,
      onSubmit() {
        userForm.value.errorInConditions = false;

        if (!userForm.value.conditions) {
          userForm.value.errorInConditions = true;
          return $q.notify({
            message:"Debe de aceptar las condiciones de uso",
            icon: 'las la-exclamation-circle'
          });
        }
        console.log(userForm.value);
      },
      onReset() {
        userForm.value = {
          email: "",
          password1: "",
          password2: "",
          conditions: false,
          errorInConditions: false,
        };
      },
      isValidEmail(val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || "El correo no parece ser válido";
      },
      isSamePassword(val) {
        return val === userForm.value.password1 || "Las contraseñas no son iguales";
      },
    };
  },
});
</script>
