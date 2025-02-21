<!-- eslint-disable vue/no-v-html -->
<!-- disable eslint rule as we are sanitising the html -->
<template>
  <div
    class="subtitle-container"
    :style="{ fontSize: subtitleFontSizeRem + 'rem' }"
    v-html="sanitisedCue"
  />
</template>

<script lang="ts">
import { type PropType } from "vue";
import { type SubtitleCue } from "@/models/Subtitles";
import sanitize from "sanitize-html";

export default {
  props: {
    cues: {
      required: true,
      type: Array as PropType<SubtitleCue[]>,
    },
    videoTime: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      subtitleFontSizeRem: 1.5,
    };
  },
  computed: {
    sanitisedCue() {
      return sanitize(this.currentCueHtml);
    },
    currentCueHtml() {
      const currentCue = this.cues.find((cue) => {
        return this.videoTime >= cue.start && this.videoTime < cue.end;
      });
      return currentCue?.text ?? "";
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateSubtitleFontSize);
  },
  mounted() {
    this.updateSubtitleFontSize();
    window.addEventListener("resize", this.updateSubtitleFontSize);
  },
  methods: {
    updateSubtitleFontSize() {
      // font size depends on video height
      this.subtitleFontSizeRem = (this.$parent?.$el.offsetHeight * 0.05) / 16.0;
    },
  },
};
</script>

<style scoped>
.subtitle-container {
  padding: 0.5em;

  color: white;
  font-family: Arial, sans-serif;
  text-shadow: 1px 1px black, -1px 1px black, 1px -1px black, -1px -1px black;
  white-space: pre-line;
  text-align: center;
}
</style>
