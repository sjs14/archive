<template>
  <h1 class="App">{{ time }}</h1>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const time = ref("");
    const setTime = () => {
      time.value = new Date().toLocaleString();
    };
    const clock = () => {
      setInterval(setTime, 1000);
    };
    setTime();
    clock();

    return { time };
  },
};
</script>
