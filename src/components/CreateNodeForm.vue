<template>
  <form class="create-node-form" @submit="createNode">
    <h4>Create a new set of connections:</h4>
    <label>
      Source company:
      <Autocomplete v-model:userSelection="source" :suggestions="companies" />
    </label>
    <label>Target companies:</label>
    <div class="target-input" v-for="(n, i) in targets.length" :key="n">
      <Autocomplete v-model:userSelection="targets[i]" :suggestions="companies" />
      <input v-if="targets.length > 1" type="button" value="Remove" @click="removeTarget(i)" />
    </div>
    <label class="small-button">
      <input type="button" value="New Target" @click="addTarget" />
    </label>
    <input type="submit" value="Add Connections" />
  </form>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { createNodes, createLinks } from "@/utils/graph-helpers";
import { deepClone } from "@/utils/deep-clone";
import Autocomplete from "@/components/Autocomplete";

export default defineComponent({
  name: "CreateNodeForm",
  components: {
    Autocomplete
  },
  setup() {
    const store = useStore();
    const companies = computed(() => deepClone(store.state.companies));
    const graph = computed(() => store.state.graph);
    const source = ref("");
    const targets = ref(["", "", ""]);

    const addTarget = () => targets.value.push("");
    const removeTarget = index => {
      targets.value = targets.value.filter((_, i) => i !== index);
    };

    const newCompanies = computed(() => {
      const newCompanies = [];

      newCompanies.push(source.value);

      // Add new companies from target inputs.
      targets.value.forEach(target => {
        newCompanies.push(target);
      });

      return Array.from(new Set(newCompanies.filter(item => item.length)));
    });

    const createNode = e => {
      e.preventDefault();

      if (!source.value.length || !targets.value.length || targets.value.every(target => !target.length)) return;

      const newGraph = deepClone(graph.value);
      const filteredTargets = targets.value.filter(target => target.length);
      const newNodes = [source.value, ...filteredTargets].filter(potentialNode => newGraph.nodes.every(node => node.name !== potentialNode));
      newGraph.nodes = [...newGraph.nodes, ...createNodes(newNodes)];
      newGraph.links = [...newGraph.links, ...createLinks(source.value)(filteredTargets)];

      store.dispatch("updateCompanies", Array.from(new Set([...companies.value, ...newCompanies.value])));
      store.dispatch("updateGraph", newGraph);
      source.value = "";
      targets.value = ["", "", ""];
    };

    return {
      addTarget,
      removeTarget,
      createNode,
      source,
      targets,
      graph,
      companies
    };
  }
});
</script>

<style scoped>
.create-node-form {
  display: grid;
  grid: auto-flow / 1fr;
  justify-content: center;
}

.target-companies {
  display: grid;
  grid: auto-flow / 1fr;
  gap: 0.5rem;
}

.target-input {
  display: grid;
  grid: 1fr / 1fr min-content;
}

.small-button {
  width: min-content;
}
</style>
