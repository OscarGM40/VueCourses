<template>
  <h1>Indecision</h1>
  <!-- <img v-bind:src="img" alt="bg" /> -->
  <img v-show="img" :src="img" alt="bg" />
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <!--  FORMA CON EVENTO KEYPRESS @keypress.enter="handleInput" -->
    <input
      type="text"
      id="question"
      v-model="question"
      placeholder="Hazme una pregunta"
    />
    <p>Recuerda terminar con un signo de interrogación (?)</p>
    <div v-if="isValidQuestion">
      <h2>{{ this.question }}</h2>
      <h1>{{ answer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: "",
      answer: null,
      img: null,
      isValidQuestion: false,
    };
  },
  methods: {
    handleInput() {
      this.question = document.getElementById("question").value;
    },
    async getAnswer() {
      const responses = {
        yes:"Si!",
        no:"No!",
        maybe: "Quizas!"
      }
      this.answer = "Pensando...";
      const { answer, image } = await fetch("https://yesno.wtf/api").then((r) =>
        r.json()
      );
      this.answer = responses[answer];
      this.img = image;
    },
  },
  watch: {
    question(value, oldValue) {
      this.isValidQuestion = false;
      if (!value.includes("?")) return;

      this.isValidQuestion = true;
      this.getAnswer();
    },
  },
  name: "Indecision",
};
</script>

<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}
input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 10px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>
