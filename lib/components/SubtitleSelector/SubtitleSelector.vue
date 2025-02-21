<template>
  <div class="subtitle-selector-container">
    <SubtitleSelectorSearchBar
      :default-search-language="defaultSearchLanguage"
      :second-search-language="secondSearchLanguage"
      :search-subtitles="searchSubtitles"
    />
    <SubtitleSelectorTable
      :delete-subtitle="deleteSubtitle"
      :download-subtitle="downloadSubtitle"
      :deselect-subtitle="deselectSubtitle"
      :select-subtitle="selectSubtitle"
      :subtitles="subtitles"
    />
  </div>
</template>

<script lang="ts">
import { type PropType } from "vue";
import SubtitleSelectorSearchBar from "./SubtitleSelectorSearchBar.vue";
import SubtitleSelectorTable from "./SubtitleSelectorTable.vue";
import type { SubtitleInfo } from "@/models/Subtitles";

export default {
  components: {
    SubtitleSelectorSearchBar,
    SubtitleSelectorTable,
  },
  props: {
    defaultSearchLanguage: {
      required: false,
      type: String as PropType<string>,
      default: "en",
    },
    secondSearchLanguage: {
      required: false,
      type: String as PropType<string>,
      default: null,
    },
    deleteSubtitle: {
      required: true,
      type: Function as PropType<(subtitleId: number) => void>,
    },
    downloadSubtitle: {
      required: true,
      type: Function as PropType<(subtitleId: number) => void>,
    },
    deselectSubtitle: {
      required: true,
      type: Function as PropType<(subtitleId: number) => void>,
    },
    selectSubtitle: {
      required: true,
      type: Function as PropType<(subtitleId: number) => void>,
    },
    searchSubtitles: {
      required: true,
      type: Function as PropType<
        (searchTerm: string, language: string) => void
      >,
    },
    subtitles: {
      required: true,
      type: Array as PropType<SubtitleInfo[]>,
    },
  },
};
</script>

<style scoped>
.subtitle-selector-container {
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px var(--sub-border-colour) solid;
  opacity: 95%;
}
</style>
