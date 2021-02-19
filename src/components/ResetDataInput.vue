<template>
  <button @click="resetDemoData">Reset Demo Data</button>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ResetDataInput",
  setup() {
    const store = useStore();
    const resetDemoData = () => store.dispatch("resetDemoData");

    return {
      resetDemoData
    };
  }
});
</script>

<style></style>
