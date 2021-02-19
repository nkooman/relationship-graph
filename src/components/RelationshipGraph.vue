<template>
  <div ref="graphRef" :class="['graph', { 'hide-labels': !showLabels }]">
    <svg ref="svgRef"></svg>
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
    const graph = computed(() => store.state.graph);
    const showLabels = computed(() => store.state.showLabels);
    const graphRef = ref();
    const svgRef = ref();

    const killChildren = parent => {
      if (!parent) return;
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    };

    const reallyDumbSolution = () => {
      const graphToBeMutated = deepClone(graph.value);
      killChildren(svgRef.value);
      const width = graphRef.value.offsetWidth;
      // There's something that adds 7 pixels of height to the graph div.
      // If you were to reload the graph a lot the element would grown in height.
      const height = graphRef.value.offsetHeight - 7;
      const svg = d3
        .select("svg")
        .attr("width", width)
        .attr("height", height);
      const container = svg.append("g");

      const zoom = d3
        .zoom()
        .scaleExtent([0, 8])
        .on("zoom", event => {
          container.attr("transform", event.transform);
        });

      svg.call(zoom);
      svg.call(zoom.transform, d3.zoomIdentity);

      const simulation = d3
        .forceSimulation(graphToBeMutated.nodes)
        .force(
          "link",
          d3
            .forceLink(graphToBeMutated.links)
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
        .data(graphToBeMutated.links)
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
        .data(graphToBeMutated.nodes)
        .join("g");

      nodes
        .append("circle")
        .attr("stroke", "white")
        .attr("fill", d => (d.name === "BizStream" ? "red" : "#9b4dca"))
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
      graphRef,
      svgRef,
      showLabels
    };
  }
});
</script>

<style scoped>
.hide-labels:deep(.node-label) {
  display: none;
}

.graph {
  max-height: 100%;
}
</style>
