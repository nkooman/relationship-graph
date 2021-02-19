<template>
  <button @click="removeAllData">Remove All Data</button>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "RemoveAllDataInput",
  setup() {
    const store = useStore();
    const removeAllData = () => store.dispatch("removeAllData");

    return {
      removeAllData
    };
  }
});
</script>

<style></style>
