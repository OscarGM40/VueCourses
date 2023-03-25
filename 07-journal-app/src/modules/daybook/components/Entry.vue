<template>
  <!-- recuerda que en la template no necesito usar this.$router(aunque va a funcionar igual) -->
  <!-- para mandar params en el push era (this).$router.push({name:"",params:{param:value}}) -->
  <div
    class="entry-container mb-3 pointer p-2"
    @click="this.$router.push({ name: 'entry', params: { id: entry.id } })"
  >
    <!--title  -->
    <div class="entry-title d-flex">
      <h6 v-html="vHTML"></h6>
<!--       <span clas=s"text-success fs-5 fw-bold">{{ getCurrentDay }}</span>
      <span class="mx-1 fs-5">{{ getMonth }}</span>
      <span class="mx-2 fw-light">{{ getYear }}</span> -->
    </div>
    <!-- description -->
    <div class="entry-description">
      {{ parseText }}
    </div>
  </div>
</template>

<script>
import transformDate from "@/helpers/transformDate";
export default {
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  computed: {
    parseText() {
      return this.entry.text.length > 140
        ? this.entry.text.substring(0, 140) + "..."
        : this.entry.text;
    },
    getCurrentDay() {
      const { number } = transformDate(this.entry.date);
      /* const date = new Date(this.entry.date);
      return date.getDate(); */
      return number;
    },
    getMonth() {
      const { month } = transformDate(this.entry.date);
      /* const date = new Date(this.entry.date);
      return months[date.getMonth()]; */
      return month;
    },
    getYear() {
      const { year, day } = transformDate(this.entry.date);
      // const date = new Date(this.entry.date);
      return `${year},${day}`;
    },
    vHTML() {
      const { year, day, month, number } = transformDate(this.entry.date);
      return `
       <span class="text-success fs-5 fw-bold">${number}</span>
      <span class="mx-1 fs-5">de ${month} ${year}</span>
      <span class="mx-2 fw-light">${day}</span>
      `;
    },
  },
};
</script>
<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #123e50;
  transition: 0.2s all ease-in;
  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
  }
  .entry-description {
    font-size: 12px;
  }
}
</style>
