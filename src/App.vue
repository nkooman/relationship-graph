<template>
  <div class="content-wrapper">
    <div class="graph-with-controls">
      <div class="controls">
        <CreateNodeForm />
        <hr />
        <RemoveNodeForm />
      </div>
      <RelationshipGraph />
    </div>
    <div class="settings">
      <NodeLabelToggle />
      <ResetDataInput />
      <CreateRandomDataInput />
      <RelationshipGraphReloadButton />
      <RemoveAllDataInput />
    </div>
  </div>
</template>

<script>
import { defineComponent, provide } from "vue";
import mitt from "mitt";
import ResetDataInput from "@/components/ResetDataInput";
import CreateNodeForm from "@/components/CreateNodeForm";
import CreateRandomDataInput from "@/components/CreateRandomDataInput";
import NodeLabelToggle from "@/components/NodeLabelToggle";
import RemoveAllDataInput from "@/components/RemoveAllDataInput";
import RemoveNodeForm from "@/components/RemoveNodeForm";
import RelationshipGraph from "@/components/RelationshipGraph";
import RelationshipGraphReloadButton from "@/components/RelationshipGraphReloadButton";

export default defineComponent({
  name: "App",
  components: {
    ResetDataInput,
    CreateNodeForm,
    CreateRandomDataInput,
    NodeLabelToggle,
    RemoveAllDataInput,
    RemoveNodeForm,
    RelationshipGraph,
    RelationshipGraphReloadButton
  },
  setup() {
    const emitter = mitt();
    provide("emitter", emitter);
  }
});
</script>

<style>
html,
body,
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.content-wrapper {
  height: 100%;
}

.graph-with-controls {
  display: grid;
  grid: 1fr / 1fr 4fr;
  height: calc(100% - 10rem);
  position: relative;
  z-index: 0;
}

.controls {
  font-size: 2rem;
  padding: 3rem;
  display: grid;
  grid: auto-flow / 1fr;
  align-content: flex-start;
  height: 100%;

  box-shadow: inset -10px 0 10px -5px #eee;
}

.settings {
  display: grid;
  grid: 1fr / auto-flow;
  align-items: center;
  justify-content: center;
  gap: 0 3rem;
  width: 100%;
  background: #eee;
  height: 10rem;
  position: relative;
  z-index: 10;
}

.settings :deep(button),
.settings :deep(.show-labels),
.settings :deep(.show-labels input[type="checkbox"]) {
  margin: 0;
}

.graph {
  font-size: 1.5rem;
}
</style>
