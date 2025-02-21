<template>
  <div class="language-selector">
    <button
      :class="{ selected: isLanguage1Selected }"
      @click="setLanguage(language1)"
    >
      {{ language1.toUpperCase() }}
    </button>
    <button
      :class="{ selected: !isLanguage1Selected }"
      @click="setLanguage(language2)"
    >
      {{ language2.toUpperCase() }}
    </button>
  </div>
</template>

<script lang="ts">
import { type PropType } from "vue";

export default {
  props: {
    language1: {
      required: true,
      type: String as PropType<string>,
    },
    language2: {
      required: true,
      type: String as PropType<string>,
    },
    isLanguage1Selected: {
      required: true,
      type: Boolean as PropType<boolean>,
    },
    setLanguage: {
      required: true,
      type: Function as PropType<(language: string) => void>,
    },
  },
};
</script>

<style scoped>
.language-selector {
  display: flex;
}
.language-selector button {
  background: none;
  border: none;
  cursor: pointer;

  background-color: var(--sub-entry-colour);
  color: var(--text-colour);

  transition: 0.25s;
}
.language-selector button:first-of-type {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.language-selector button:last-of-type {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
.language-selector .selected {
  background-color: var(--lang-select-colour);
}
</style>
