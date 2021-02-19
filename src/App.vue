<template>
  <div class="content-wrapper">
    <div class="controls">
      <CreateNodeForm />
      <hr />
      <RemoveNodeForm />
      <hr />
      <div class="settings">
        <NodeLabelToggle />
        <ClearLocalStorageInput />
        <RelationshipGraphReloadButton />
      </div>
    </div>
    <RelationshipGraph />
  </div>
</template>

<script>
import { defineComponent, provide } from "vue";
import mitt from "mitt";
import ClearLocalStorageInput from "@/components/ClearLocalStorageInput";
import CreateNodeForm from "@/components/CreateNodeForm";
import NodeLabelToggle from "@/components/NodeLabelToggle";
import RemoveNodeForm from "@/components/RemoveNodeForm";
import RelationshipGraph from "@/components/RelationshipGraph";
import RelationshipGraphReloadButton from "@/components/RelationshipGraphReloadButton";

export default defineComponent({
  name: "App",
  components: {
    ClearLocalStorageInput,
    CreateNodeForm,
    NodeLabelToggle,
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
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

.content-wrapper {
  display: grid;
  grid: 1fr / 1fr 1500px;
}

.controls {
  font-size: 2rem;
  padding: 3rem;
  display: grid;
  grid: auto-flow / 1fr;
  align-content: space-between;

  height: 100%;
  box-shadow: inset -10px 0 10px -5px #eee;
}

.settings {
  display: grid;
  grid: auto-flow / 1fr;
  justify-content: center;
}

.graph {
  font-size: 1.5rem;
  position: fixed;
  top: 0;
  right: 0;
}
</style>
