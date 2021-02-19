<template>
  <div :class="['autocomplete']" v-closable="{ exclude: ['input', 'ul'], handler: 'close' }">
    <input ref="input" v-model="selection" type="text" @keydown.enter="enter" @input="open = true" @focus="open = true" />
    <ul ref="ul" v-if="open" class="autocomplete-results">
      <li v-for="(suggestion, index) in matches" :class="['autocomplete-result', { active: isActive(index) }]" :key="suggestion" @click.prevent="suggestionClick(index)">
        {{ suggestion }}
      </li>
      <li v-if="matches.length === 0" class="autocomplete-result faded">Press enter to use your new company!</li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from "vue";
import { suggestions as bulkSuggestions } from "@/assets/suggestions";

// Yuck
let handleOutsideClick;

export default defineComponent({
  name: "Autocomplete",
  emits: ["update:userSelection"],
  directives: {
    closable: {
      // https://tahazsh.com/detect-outside-click-in-vue
      beforeMount(el, binding) {
        handleOutsideClick = e => {
          e.stopPropagation();
          const { handler, exclude } = binding.value;

          let clickedOnExcludedEl = false;
          exclude.forEach(refName => {
            if (!clickedOnExcludedEl) {
              const excludedEl = binding.instance.$refs[refName];
              if (excludedEl) {
                clickedOnExcludedEl = excludedEl.contains(e.target);
              }
            }
          });

          if (!el.contains(e.target) && !clickedOnExcludedEl) {
            binding.instance[handler]();
          }
        };
        document.addEventListener("click", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);
      },
      unmounted() {
        document.removeEventListener("click", handleOutsideClick);
        document.removeEventListener("touchstart", handleOutsideClick);
      }
    }
  },
  props: {
    suggestions: {
      type: Array,
      required: true
    },
    userSelection: {
      type: String,
      required: true
    }
  },
  setup(props, ctx) {
    const input = ref();
    const ul = ref();
    const open = ref(false);
    const current = ref(0);
    const selection = ref(props.userSelection);
    const allSuggestions = computed(() => Array.from(new Set([...props.suggestions, ...bulkSuggestions])));

    watch(selection, () => {
      ctx.emit("update:userSelection", selection.value);
    });

    watch(
      () => props.userSelection,
      () => {
        selection.value = props.userSelection;
      }
    );

    const matches = computed(() => {
      return allSuggestions.value.filter(str => str.indexOf(selection.value) >= 0);
    });

    const suggestionClick = index => {
      selection.value = matches.value[index];
      current.value = index;
      open.value = false;
    };

    const isActive = index => {
      return index === current.value;
    };

    const close = () => {
      open.value = false;
    };

    return {
      input,
      ul,
      close,
      open,
      matches,
      selection,
      isActive,
      suggestionClick
    };
  }
});
</script>

<style scoped>
.autocomplete {
  position: relative;
  font-size: 1.6rem;
}

.autocomplete-results {
  position: absolute;
  margin: 0;
  border: 0.1rem solid #d1d1d1;
  top: 3.8rem;
  border-radius: 0.4rem;
  background: #fff;
  min-height: 3.8rem;
  max-height: 20rem;
  width: 100%;
  overflow: auto;
  z-index: 2;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  margin: 0;
  padding: 0.75rem 1rem;
  width: 100%;
  cursor: pointer;
  font-weight: 400;
}

.autocomplete-result:not(.faded):hover {
  background: #efefef;
}

.faded {
  color: #333;
  background: #ddd;
}

.active {
  color: #9b4dca;
  background: #efefef;
  font-weight: 700;
}
</style>
