<template>
  <form class="remove-node-form" @submit="removeNode">
    <h4>Remove a node and their connections:</h4>
    <label>
      Select a Company to Remove:
      <select v-model="selection">
        <option v-for="name in names" :key="name">{{ name }}</option>
      </select>
    </label>
    <input type="submit" value="Remove Connections" />
  </form>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "RemoveNodeForm",
  setup() {
    const store = useStore();
    const graph = computed(() => store.state.graph);
    const companies = computed(() => store.state.companies);
    const names = computed(() => graph.value.nodes.map(node => node?.name));
    const selection = ref();

    const removeNode = e => {
      e.preventDefault();

      const newCompanies = companies.value.filter(company => company !== selection.value);
      const nodes = graph.value.nodes.filter(node => node.name !== selection.value);
      const links = graph.value.links.filter(link => link.source !== selection.value && link.target !== selection.value);
      const newGraph = {
        nodes,
        links
      };

      store.dispatch("updateCompanies", newCompanies);
      store.dispatch("updateGraph", newGraph);
    };

    return {
      removeNode,
      names,
      selection
    };
  }
});
</script>

<style scoped>
.remove-node-form {
  display: grid;
  grid: auto-flow / 1fr;
  justify-content: center;
}
</style>
