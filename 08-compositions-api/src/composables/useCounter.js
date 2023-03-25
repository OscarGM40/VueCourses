import { ref } from "vue";

// realmente es un hook de react.Fijate que usar ref es obligatorio para crear una propiedad reactiva que cambie 
export const useCounter = (initialValue) => {
  const counter = ref(initialValue);
  // todo lo que retorne va a mantener los principios de reactividad de Vue
  return {
    counter,
    increment: () => counter.value++,
    decrement: () => counter.value--,
  }
};

