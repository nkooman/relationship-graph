<template>
  <label class="show-labels">
    Show Labels?
    <input type="checkbox" v-model="showLabels" @change="toggleShowLabels" />
  </label>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "NodeLabelToggle",
  setup() {
    const store = useStore();
    const storeShowLabels = computed(() => store.state.showLabels);
    const showLabels = ref(storeShowLabels.value);

    const toggleShowLabels = () => {
      store.dispatch("toggleShowLabels");
    };

    return {
      showLabels,
      toggleShowLabels
    };
  }
});
</script>

<style scoped>
.show-labels {
  justify-self: flex-start;
}
</style>
