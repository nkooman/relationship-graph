import VuexPersistence from "vuex-persist";
import { createStore } from "vuex";
import { localStorageNamespaces, defaultCompanies } from "@/constants";
import { createNodes, createRandomLinks } from "@/utils/graph-helpers";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default createStore({
  strict: true,
  state: {
    graph: {
      nodes: createNodes(defaultCompanies),
      links: createRandomLinks(createNodes(defaultCompanies))
    },
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
    SET_DEFAULTS(state) {
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
    clearLocalStorage(context) {
      localStorage.removeItem(localStorageNamespaces.companies);
      localStorage.removeItem(localStorageNamespaces.graph);

      context.commit("SET_DEFAULTS", defaultCompanies);
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
