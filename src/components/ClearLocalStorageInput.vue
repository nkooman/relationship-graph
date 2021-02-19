<template>
  <button @click="clearLocalStorage">Clear Local Storage</button>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ClearLocalStorageInput",
  setup() {
    const store = useStore();
    const clearLocalStorage = () => store.dispatch("clearLocalStorage");

    return {
      clearLocalStorage
    };
  }
});
</script>

<style></style>
