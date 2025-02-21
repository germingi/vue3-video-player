<template>
  <tr
    :class="{
      active: isSubtitleActive(),
    }"
  >
    <td class="name">
      <button @click.stop="subtitleClick()">
        <ScrollAndFadeText :text="subtitle.title" />
      </button>
    </td>
    <td>{{ subtitle.language.substring(0, 2) }}</td>
    <td class="icon">
      <div
        v-show="isSubtitleDownloading()"
        data-test="downloading-subtitle-spinner"
      >
        <LoadingSpinner />
      </div>
      <button
        v-show="isSubtitleDownloaded() || isSubtitleActive()"
        data-test="delete-subtitle-button"
        @click.stop="deleteSubtitle(subtitle.id)"
      >
        <TrashIcon />
      </button>
      <button
        v-show="isSubtitleRemote()"
        data-test="download-subtitle-button"
        @click.stop="downloadSubtitle(subtitle.id)"
      >
        <ArrowDownTrayIcon />
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import ScrollAndFadeText from "scroll-and-fade-text";
import "scroll-and-fade-text/style.css";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/vue/24/outline";
import LoadingSpinner from "../LoadingSpinner.vue";
import { type PropType } from "vue";
import type { SubtitleInfo } from "@/models/Subtitles";
import { SubtitleState } from "@/models/Subtitles";

export default {
  components: {
    ArrowDownTrayIcon,
    ScrollAndFadeText,
    LoadingSpinner,
    TrashIcon,
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
    subtitle: {
      required: true,
      type: Object as PropType<SubtitleInfo>,
    },
  },
  methods: {
    isSubtitleActive() {
      return this.subtitle.state === SubtitleState.ACTIVE;
    },
    isSubtitleDownloaded() {
      return this.subtitle.state === SubtitleState.DOWNLOADED;
    },
    isSubtitleDownloading() {
      return this.subtitle.state === SubtitleState.DOWNLOADING;
    },
    isSubtitleRemote() {
      return this.subtitle.state === SubtitleState.NONE;
    },
    subtitleClick() {
      if (this.isSubtitleActive()) {
        this.deselectSubtitle(this.subtitle.id);
      } else if (this.isSubtitleDownloaded()) {
        this.selectSubtitle(this.subtitle.id);
      } else if (!this.isSubtitleDownloading()) {
        this.downloadSubtitle(this.subtitle.id);
      }
    },
  },
};
</script>

<style scoped>
tr {
  border-bottom: 1px solid var(--sub-border-colour);
  width: 100%;
  display: flex;
  gap: 1rem;
  padding: 0.25rem 0.5rem;
  box-sizing: border-box;
  border-width: 1px;
  transition: 0.2s;
  background-color: var(--sub-entry-colour);
}
tr:last-child {
  border-bottom: 0;
}
tr td {
  display: flex;
  align-items: center;
}
tr:hover {
  background-color: var(--sub-entry-hover-colour);
}
.active {
  background-color: var(--sub-entry-active-colour);
}
.name {
  flex-grow: 1;
}
.name button {
  width: 100%;
  height: 100%;

  padding: 0;
  background-color: transparent;
  border-width: 0;

  text-align: left;
  font-size: 1rem;
  color: var(--text-colour);
  cursor: pointer;
}
.icon {
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 1.25rem;
  max-width: 1.25rem;
  min-height: 1.25rem;
  max-height: 1.25rem;
}
.icon div {
  --loading-spinner: var(--text-colour);

  height: 80%;
  width: 80%;
}
.icon button {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  border-width: 0;
  border-radius: 0.25rem;
  color: var(--text-colour);
  margin: 0;
  padding: 0;
  cursor: pointer;
}
.icon button:hover {
  background-color: var(--sub-entry-colour);
}

svg {
  height: 100%;
  width: 100%;
}
</style>
