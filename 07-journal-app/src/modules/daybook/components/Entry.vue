<template>
  <div class="entry-container mb-3 pointer p-2">
    <!--title  -->
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">15</span>
      <span class="mx-1 fs-5">Julio</span>
      <span class="mx-2 fw-light">2021,Jueves</span>
    </div>
    <!-- description -->
    <div class="entry-description">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab beatae esse dicta
      deleniti asperiores, officia temporibus. Sequi laboriosam hic quaerat. Facere ab
      blanditiis suscipit aliquam sed quae fugiat tenetur temporibus?
    </div>
  </div>
</template>

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
