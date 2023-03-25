<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div class="">
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>
      <!--  -->
      <div>
        <input
          type="file"
          @change="onSelectImage($event)"
          ref="imageSelector"
          v-show="false"
          accept="image/*"
        />
        <button class="btn btn-danger mx-2" @click="onDeleteEntry" v-if="entry.id">
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary" @click="onSelectImageByRef">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea v-model="entry.text" placeholder="¿Qué sucedió hoy?"></textarea>
    </div>
    <img
      v-if="entry.picture && !localImage"
      class="img-thumbnail"
      :src="entry.picture"
      alt="entry-picture"
    />
    <img v-if="localImage" class="img-thumbnail" :src="localImage" alt="local-picture" />
  </template>
  <!-- <Fab icon="fa-save" @on:click="saveEntry" /> -->
  <Fab icon="fa-save" @click="saveEntry" />
</template>
<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";
import { uploadImage } from "../../../helpers/uploadImage";
import Swal from "sweetalert2";

export default {
  name: "EntryView",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
    };
  },
  methods: {
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
    loadEntry() {
      this.file = null;
      this.localImage = null;
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) {
          return this.$router.push({ name: "no-entry" });
        }
      }
      this.entry = entry;
    },
    async saveEntry() {
      this.entry.picture = await uploadImage(this.file);

      Swal.fire({
        title: "Espere, por favor",
        allowOutsideClick: false,
      });

      if (this.entry.id) {
        Swal.showLoading();
        await this.updateEntry(this.entry);
        Swal.fire("Guardado", "Entrada registrada con éxito", "success");
      } else {
        Swal.showLoading();
        const id = await this.createEntry(this.entry);
        Swal.fire("Guardado", "Entrada registrada con éxito", "success");
        return this.$router.push({ name: "entry", params: { id } });
      }
      this.file = null;
    },
    async onDeleteEntry() {
      const { isConfirmed } = await Swal.fire({
        title: "¿Está seguro que desea borrar la entrada?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si,borra la entrada",
      });
      
      if (isConfirmed) {
        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: "no-entry" });
        Swal.fire("Entrada borrada!", "La entrada ha sido borrada", "success");
      }
    },
    onSelectImage(event) {
      const file = event.target.files[0];

      // si entra al selector y cancela la lógica va por aqui
      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }
      this.file = file;
      const fr = new FileReader();
      // primero lee,despues disparará el onload
      fr.readAsDataURL(file);
      fr.onload = () => (this.localImage = fr.result);
    },
    onSelectImageByRef() {
      // console.log(this.$refs)
      this.$refs.imageSelector.click();
    },
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
      // id(value,oldValue){
      // console.log({value,oldValue})
      this.loadEntry();
    },
  },
};
</script>
<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;
  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 120px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000, $alpha: 0.2);
}
</style>
