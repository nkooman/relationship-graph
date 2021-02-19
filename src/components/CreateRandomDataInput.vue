<template>
  <button @click="createRandomData">Create Random Data</button>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "CreateRandomDataInput",
  setup() {
    const store = useStore();
    const createRandomData = () => store.dispatch("createRandomData");

    return {
      createRandomData
    };
  }
});
</script>

<style></style>
