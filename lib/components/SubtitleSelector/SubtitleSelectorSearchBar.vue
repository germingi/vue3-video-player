<template>
  <div class="subtitle-search">
    <input
      v-model="searchQuery"
      type="text"
      @keyup.enter="searchSubtitles(searchQuery, searchLanguage)"
    />
    <LanguageSelector
      v-if="secondSearchLanguage"
      :language1="defaultSearchLanguage"
      :language2="secondSearchLanguage"
      :is-language1-selected="searchLanguage === defaultSearchLanguage"
      :set-language="setSearchLanguage"
    />
    <MagnifyingGlassIcon />
  </div>
</template>

<script lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import LanguageSelector from "./LanguageSelector.vue";
import { type PropType } from "vue";

export default {
  components: {
    MagnifyingGlassIcon,
    LanguageSelector,
  },
  props: {
    defaultSearchLanguage: {
      required: true,
      type: String as PropType<string>,
    },
    secondSearchLanguage: {
      required: false,
      type: String as PropType<string>,
      default: null,
    },
    searchSubtitles: {
      required: true,
      type: Function as PropType<
        (searchTerm: string, language: string) => void
      >,
    },
  },
  data() {
    return {
      searchQuery: "",
      searchLanguage: this.defaultSearchLanguage,
    };
  },
  methods: {
    setSearchLanguage(language: string) {
      this.searchLanguage = language;
      // search right after changing the language
      this.searchSubtitles(this.searchQuery, this.searchLanguage);
    },
  },
};
</script>

<style scoped>
.subtitle-search {
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-right: 0.5rem;

  background-color: var(--sub-search-colour);

  width: 100%;
  border-bottom: 1px solid var(--sub-border-colour);
}
.subtitle-search input {
  border: none;
  background-color: transparent;
  flex-grow: 1;
  padding: 0.4rem 0.5rem;
  padding-right: 0;

  color: inherit;
  font: inherit;
}
svg {
  height: 1.25rem;
  width: 1.25rem;
}
</style>
