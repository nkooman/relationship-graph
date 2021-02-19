import VuexPersistence from "vuex-persist";
import { createStore } from "vuex";
import { localStorageNamespaces, defaultCompanies, defaultGraph } from "@/constants";
import { createNodes, createRandomLinks } from "@/utils/graph-helpers";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default createStore({
  strict: true,
  state: {
    graph: defaultGraph,
    companies: defaultCompanies,
    showLabels: true
  },
  mutations: {
    UPDATE_GRAPH(state, payload) {
      state.graph = payload;
    },
    UPDATE_COMPANIES(state, payload) {
      state.companies = payload;
    },
    UPDATE_SHOW_LABELS(state, payload) {
      state.showLabels = payload;
    },
    CLEAR_LOCAL_STORAGE() {
      localStorage.removeItem(localStorageNamespaces.companies);
      localStorage.removeItem(localStorageNamespaces.graph);
    },
    SET_DEFAULTS(state) {
      state.companies = defaultCompanies;
      state.graph = defaultGraph;
    },
    SET_EMPTY_GRAPH(state) {
      state.graph = {
        nodes: [],
        links: []
      };
    },
    SET_RANDOM_GRAPH(state) {
      state.companies = defaultCompanies;
      const nodes = createNodes(defaultCompanies);
      const links = createRandomLinks(nodes);
      state.graph = {
        nodes,
        links
      };
    }
  },
  actions: {
    removeAllData(context) {
      context.commit("CLEAR_LOCAL_STORAGE");
      context.commit("SET_EMPTY_GRAPH");
    },
    resetDemoData(context) {
      context.commit("CLEAR_LOCAL_STORAGE");
      context.commit("SET_DEFAULTS");
    },
    createRandomData(context) {
      context.commit("CLEAR_LOCAL_STORAGE");
      context.commit("SET_RANDOM_GRAPH");
    },
    updateGraph(context, payload) {
      context.commit("UPDATE_GRAPH", payload);
    },
    updateCompanies(context, payload) {
      context.commit("UPDATE_COMPANIES", payload);
    },
    toggleShowLabels(context) {
      context.commit("UPDATE_SHOW_LABELS", !context.state.showLabels);
    }
  },
  plugins: [vuexLocal.plugin]
});
