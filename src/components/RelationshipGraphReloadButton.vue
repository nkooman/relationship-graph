<template>
  <button @click="reload">Reload Graph</button>
</template>

<script>
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "RelationshipGraphReloadButton",
  setup() {
    const emitter = inject("emitter");

    const reload = () => {
      emitter.emit("reloadGraph");
    };

    return {
      reload
    };
  }
});
</script>
