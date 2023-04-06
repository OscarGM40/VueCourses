import SearchResults from "@/components/search-results/SearchResults.vue";
import { useGeolocationStore } from "@/composables";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "SearchBar",
  components: { SearchResults },
  setup() {
    const { searchPlacesByTerm } = useGeolocationStore();

    const debounceTimeout = ref();
    const debouncedValue = ref("");
    
    return {
      debouncedValue,
      // esta computed va para el v-model del input
      searchTerm: computed({
        get() {
          return debouncedValue.value;
        },
        set(val: string) {
          // cuando escriba algo limpia el timeout para no acumular procesos
          if (debounceTimeout.value) clearTimeout(debounceTimeout.value);
          // cuando deje de escribir fijamos el resultado al de 500ms
          debounceTimeout.value = setTimeout(() => {
            debouncedValue.value = val;
            searchPlacesByTerm(debouncedValue.value);
          }, 1500);
        },
      }),
    };
  },
});
