<script lang="ts" src="./SearchBar.ts" />

<template>
  <div class="searchbar-container">
    <input
      type="text"
      class="form-control my-1" 
      placeholder="Buscar lugares..."
      v-model="searchTerm"
    />
    <!-- {{ debouncedValue }} -->
    <SearchResults />
  </div>
</template>

<style scoped>
.searchbar-container {
  position: fixed;
  top: 30px;
  left: 30px;
  background-color: white;
  z-index: 999;
  box-shadow: 0px 3px 6px rgba(252, 40, 3, 0.4);
  width: 250px;
  border-radius: 5px;
  overflow: hidden;
  padding: 2px 5px;
}
</style>
