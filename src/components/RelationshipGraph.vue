<template>
  <div :class="['graph', { 'hide-labels': !showLabels }]">
    <svg ref="svgRef" width="1500" height="900"></svg>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, watch, ref, inject } from "vue";
import { useStore } from "vuex";
import * as d3 from "d3";
import { deepClone } from "@/utils/deep-clone";

export default defineComponent({
  name: "RelationshipGraph",
  setup() {
    const store = useStore();
    const graph = computed(() => deepClone(store.state.graph));
    const showLabels = computed(() => store.state.showLabels);
    const svgRef = ref();

    const killChildren = parent => {
      if (!parent) return;
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    };

    const reallyDumbSolution = () => {
      killChildren(svgRef.value);
      const svg = d3.select("svg");
      const width = svg.attr("width");
      const height = svg.attr("height");
      const container = svg.append("g");

      svg.call(
        d3
          .zoom()
          .scaleExtent([0, 8])
          .on("zoom", event => {
            container.attr("transform", event.transform);
          })
      );

      const simulation = d3
        .forceSimulation(graph.value.nodes)
        .force(
          "link",
          d3
            .forceLink(graph.value.links)
            .id(node => node.name)
            .strength(0.25)
        )
        .force(
          "charge",
          d3
            .forceManyBody()
            .strength(-500)
            .distanceMax(500)
        )
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2).strength(0.1))
        .force("y", d3.forceY(height / 2).strength(0.1));

      let links = container
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.value.links)
        .join(enter =>
          enter
            .append("line")
            .attr("stroke", "gray")
            .attr("stroke-width", 1.5)
        );

      let nodes = container
        .append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.value.nodes)
        .join("g");

      nodes
        .append("circle")
        .attr("stroke", "white")
        .attr("fill", "#9b4dca")
        .attr("stroke-width", 3)
        .attr("r", 6)
        .append("title")
        .text(d => d.name);

      nodes
        .append("text")
        .attr("class", "node-label")
        .attr("x", 8)
        .attr("y", "0.31em")
        .text(d => d.name)
        .clone(true)
        .lower()
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 4);

      const dragStarted = (event, d) => {
        event.sourceEvent.stopPropagation();
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      };

      const dragged = (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      };

      const dragEnded = (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      };

      nodes.call(
        d3
          .drag()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded)
      );

      simulation.on("tick", () => {
        nodes.attr("transform", d => `translate(${d.x},${d.y})`);

        links
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
      });
    };

    const emitter = inject("emitter");

    onMounted(() => {
      reallyDumbSolution();

      emitter.on("reloadGraph", () => {
        reallyDumbSolution();
      });
    });

    watch(graph, () => {
      reallyDumbSolution();
    });

    return {
      svgRef,
      showLabels,
      reallyDumbSolution
    };
  }
});
</script>

<style scoped>
.hide-labels:deep(.node-label) {
  display: none;
}
</style>