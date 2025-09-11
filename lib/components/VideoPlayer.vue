<template>
  <div
    class="video-container"
    :style="{
      'aspect-ratio': videoWidth / videoHeight,
    }"
    @mousedown="handleShowFunctions"
    @mousemove="handleShowFunctions"
    @touchend.stop="handleShowFunctions"
    @touchmove.stop="handleShowFunctions"
  >
    <video
      ref="videoPlayerRef"
      controlslist="nodownload"
      oncontextmenu="return false;"
      @click="toggleVideoPlay"
      @loadedmetadata="loadingMetaData = false"
      @seeking="seeking = true"
      @seeked="seeking = false"
      @timeupdate="updateVideoTime"
    >
      <source :src="videoSrc" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <SubtitleContainer
      v-show="subtitles && subtitles.cues"
      class="subtitles-container"
      :cues="subtitles?.cues ?? []"
      :video-time="videoTime"
      @click="toggleVideoPlay"
    />
    <div v-show="loadingMetaData || seeking" class="loading-metadata">
      <div class="spinner">
        <LoadingSpinner />
      </div>
    </div>
    <!-- must use v-if for computations around scroll and fade text -->
    <div v-if="subtitles && showSubtitlesComponent" class="subtitle-selector">
      <SubtitleSelector
        :delete-subtitle="subtitles?.deleteFunc"
        :download-subtitle="subtitles?.downloadFunc"
        :deselect-subtitle="subtitles?.deselectFunc"
        :select-subtitle="subtitles?.selectFunc"
        :search-subtitles="subtitles?.searchFunc"
        :subtitles="subtitles?.subtitles"
        :default-search-language="subtitles?.defaultSearchLanguage"
        :second-search-language="subtitles?.secondSearchLanguage"
      />
    </div>
    <VideoControls
      v-if="!loadingMetaData && videoPlayerRef"
      ref="videoControlsRef"
      class="controls active"
      :handle-subtitle-selector-click="handleSubtitleSelectorClick"
      :is-video-muted="isVideoMuted"
      :is-video-paused="isVideoPaused"
      :set-video-current-time="setVideoCurrentTime"
      :subtitles-enabled="subtitles?.enabled"
      :toggle-video-mute="toggleVideoMute"
      :toggle-video-play="toggleVideoPlay"
      :video-current-time="videoTime"
      :video-duration="videoPlayerRef.duration"
    />
  </div>
</template>

<script lang="ts">
import { ref, type PropType } from "vue";
import SubtitleContainer from "./SubtitleContainer.vue";
import SubtitleSelector from "./SubtitleSelector/SubtitleSelector.vue";
import VideoControls from "./VideoControls.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import type { SubtitleCue, SubtitleInfo } from "@/models/Subtitles";

const CONTROL_TIMEOUT_MS = 6000;

export type VideoPlayerSubtitleProps = {
  enabled: boolean;
  deleteFunc: (subtitleId: number) => void;
  downloadFunc: (subtitleId: number) => void;
  deselectFunc: (subtitleId: number) => void;
  selectFunc: (subtitleId: number) => void;
  searchFunc: (searchTerm: string, language: string) => void;
  subtitles: SubtitleInfo[];
  cues?: SubtitleCue[];
  defaultSearchLanguage?: string;
  secondSearchLanguage?: string;
};

export default {
  name: "VideoPlayer",
  components: {
    LoadingSpinner,
    SubtitleContainer,
    SubtitleSelector,
    VideoControls,
  },
  props: {
    subtitles: {
      type: Object as PropType<VideoPlayerSubtitleProps>,
      default: null,
    },
    videoHeight: {
      type: Number,
      default: 720,
    },
    videoWidth: {
      type: Number,
      default: 1280,
    },
    videoUrl: {
      required: true,
      type: String,
    },
  },
  setup() {
    const videoControlsRef = ref<typeof VideoControls | null>(null);
    const videoPlayerRef = ref<HTMLVideoElement | null>(null);
    return {
      videoControlsRef,
      videoPlayerRef,
    };
  },
  data() {
    return {
      loadingMetaData: true,
      seeking: false,
      showProgressBar: false,
      showSubtitlesComponent: false,
      timeoutControls: undefined as NodeJS.Timeout | undefined,
      videoSrc: this.videoUrl,
      // need these as videoPlayerRef doesn't always update
      isVideoMuted: false,
      isVideoPaused: true,
      videoTime: 0,
    };
  },
  watch: {
    videoUrl(val) {
      if (!!val && val !== this.videoSrc) {
        this.videoSrc = val;
        this.$forceUpdate();
      }
    },
  },
  mounted() {
    this.startHideVideoControlsTimeout();

    window.addEventListener("keydown", this.handleShowFunctions);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleShowFunctions);
  },
  methods: {
    controlsSlideUp() {
      this.videoControlsRef?.$el.classList.add("active");
    },
    controlsSlideDown() {
      // don't hide video controls if the subtitle selector is open
      if (!this.showSubtitlesComponent) {
        this.videoControlsRef?.$el.classList.remove("active");
      }
    },
    handleShowFunctions() {
      // stop timeouts to hide video controls
      clearTimeout(this.timeoutControls);
      // start the animation to slide up
      this.controlsSlideUp();
      // start the timeout to hide the video controls
      this.startHideVideoControlsTimeout();
    },
    handleSubtitleSelectorClick() {
      this.showSubtitlesComponent = !this.showSubtitlesComponent;
      // start to hide video controls if we're not showing the component
      if (!this.showSubtitlesComponent) {
        this.startHideVideoControlsTimeout();
      }
    },
    setVideoCurrentTime(currentTime: number) {
      if (this.videoPlayerRef) {
        this.videoPlayerRef.currentTime = currentTime;
      }
    },
    startHideVideoControlsTimeout() {
      this.timeoutControls = setTimeout(
        this.controlsSlideDown,
        CONTROL_TIMEOUT_MS,
      );
    },
    toggleVideoMute() {
      if (this.videoPlayerRef) {
        if (this.videoPlayerRef.volume > 0) {
          this.videoPlayerRef.volume = 0;
          this.isVideoMuted = true;
        } else {
          this.videoPlayerRef.volume = 1;
          this.isVideoMuted = false;
        }
      }
    },
    toggleVideoPlay() {
      if (this.videoPlayerRef) {
        if (this.videoPlayerRef.paused) {
          this.videoPlayerRef.play();
          this.isVideoPaused = false;
        } else {
          this.videoPlayerRef.pause();
          this.isVideoPaused = true;
        }
      }
    },
    updateVideoTime() {
      if (this.videoPlayerRef) {
        this.videoTime = this.videoPlayerRef.currentTime;
      }
    },
  },
};
</script>

<style>
.video-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;

  --background-color: var(--germingi-background-colour, #000);
  --loading-dim-color: var(--germingi-loading-dim-colour, #000a);
  --video-control-colour: var(--germingi-video-control-colour, #2d2d2d);
  --text-colour: var(--germingi-text-colour, #eee);
  --lang-select-colour: var(--germingi-lang-select-colour, #904efc);

  --sub-search-colour: var(--germingi-sub-search-colour, #222);
  --sub-border-colour: var(--germingi-sub-border-colour, #888);
  --sub-entry-colour: var(--germingi-sub-entry-colour, #444);
  --sub-entry-active-colour: var(--germingi-sub-entry-active-colour, #666);
  --sub-entry-hover-colour: var(--germingi-sub-entry-hover-colour, #333);

  background-color: var(--background-color);
}
.video-container > .loading-metadata {
  background-color: var(--loading-dim-color);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
}
.video-container > .loading-metadata > .spinner {
  height: 25%;
  aspect-ratio: 1;
}
.video-container > video {
  width: 100%;
  height: 100%;
}
.video-container > video source {
  height: 100%;
}
.video-container > .subtitles-container {
  position: absolute;
  bottom: 5%;
}
.video-container > .subtitle-selector {
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  transform: translateY(-0.75rem);
  height: min(70%, 25rem);
  width: min(90%, 50rem);
}
.video-container > .controls {
  position: absolute;
  bottom: 0;
  translate: 0 100%;
  width: 100%;
  transition: translate 0.1s linear;
}
.video-container > .controls.active {
  translate: 0 0 !important;
}
</style>
