<template>
  <h2>{{ customTitle }}</h2>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
  <p data-testid="counter">{{ counter }} </p>
  <div>
    <button type="" @click="increase">+1</button>
    <button type="" @click="decrease">-1</button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    start: {
      type: Number,
      default:10,
      // required: true,
      validator(value) {
        return value > 100;
      },
    },
  },
  name: "Counter",
  data() {
    return {
      counter: this.start,
    };
  },
  methods: {
    getSquareValue() {
      console.log("llamando a getSquareValue");
      return this.counter * this.counter;
    },
    increase() {
      ++this.counter; //fijate que no hace falta el return,realmente va a cambiar el valor sin el return
    },
    decrease() {
      --this.counter;
    },
  },
  computed: {
    squareCounter() {
      return this.counter * this.counter;
    },
    customTitle() {
      return this.title || "Counter";
    },
  },
};
</script>

<style>
button {
  background-color: #64bb87;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
  zoom: 1.3;
}
button:hover {
  background-color: #5aa67b;
  transition: 0.3s ease-in-out;
}
</style>
