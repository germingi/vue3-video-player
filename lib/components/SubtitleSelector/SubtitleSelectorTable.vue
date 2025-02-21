<template>
  <div v-show="subtitles.length > 0" class="subtitle-table">
    <table>
      <SubtitleSelectorEntry
        v-for="subtitle in subtitles"
        :key="subtitle.id"
        :delete-subtitle="deleteSubtitle"
        :download-subtitle="downloadSubtitle"
        :deselect-subtitle="deselectSubtitle"
        :select-subtitle="selectSubtitle"
        :subtitle="subtitle"
      />
    </table>
  </div>
  <div v-show="subtitles.length === 0" class="subtitle-none">
    no subtitles found
  </div>
</template>

<script lang="ts">
import { type PropType } from "vue";
import SubtitleSelectorEntry from "./SubtitleSelectorEntry.vue";
import type { SubtitleInfo } from "@/models/Subtitles";

export default {
  components: {
    SubtitleSelectorEntry,
  },
  props: {
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
    subtitles: {
      required: true,
      type: Array as PropType<SubtitleInfo[]>,
    },
  },
};
</script>

<style scoped>
.subtitle-table {
  width: 100%;
  max-height: 100%;
  overflow-x: visible;
  overflow-y: auto;
  scrollbar-width: thin;
}
.subtitle-table table {
  border-collapse: collapse;
  width: 100%;
}
.subtitle-none {
  padding: 0.5rem 0;
  text-align: center;
  background-color: var(--sub-entry-colour);
  width: 100%;
}
</style>
