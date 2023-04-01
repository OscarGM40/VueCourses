<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="las la-bars"
          aria-label="Menu"
          @click="toogleSideMenu"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="sideMenuOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { defineComponent } from "vue";
import { linksList } from "../router/routes-data";
import { useUI } from "./../composables/useUi";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },
  setup() {
    /*     const store = useStore();

    return {
      // recuerda que es computed(() => store.getters).Computed devuelve una funcion que acceda al store
      sideMenuOpen: computed(() => store.getters['ui/getSideMenuOpen']),
      // mientras que el commit es solo una funcion
      toogleSideMenu: () => store.commit('ui/toggleSideMenu'), 
      linksList,
    }; */
    const { sideMenuOpen, toogleSideMenu } = useUI();

    return {
      sideMenuOpen,
      toogleSideMenu,
      linksList
    }
  },
});
</script>
