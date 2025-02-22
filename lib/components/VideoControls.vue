<template>
  <div class="video-controls">
    <button data-test="play-button" @click.stop="toggleVideoPlay">
      <div v-show="isVideoPaused" data-test="play-icon">
        <PlayIcon />
      </div>
      <div v-show="!isVideoPaused" data-test="pause-icon">
        <PauseIcon />
      </div>
    </button>
    <input
      :value="videoCurrentTime"
      type="range"
      :min="0"
      :max="videoDuration"
      @input="
        (event) => {
          const target = event.target as HTMLInputElement;
          setVideoCurrentTime(+target?.value);
        }
      "
    />
    <div class="duration">
      <span>{{ currentTimeFormatted }}</span>
      &nbsp;/&nbsp;
      <span>{{ durationFormatted }}</span>
    </div>
    <button data-test="mute-button" @click.stop="toggleVideoMute">
      <div v-show="isVideoMuted" data-test="unmute-icon">
        <SpeakerXMarkIcon />
      </div>
      <div v-show="!isVideoMuted" data-test="mute-icon">
        <SpeakerWaveIcon />
      </div>
    </button>
    <button
      v-if="subtitlesEnabled && handleSubtitleSelectorClick"
      data-test="subtitle-button"
      @click.stop="handleSubtitleSelectorClick"
    >
      <LanguageIcon />
    </button>
    <button data-test="fullscreen-button" @click.stop="toggleFullScreen">
      <div v-show="isFullScreen" data-test="shrink-icon">
        <ArrowsPointingInIcon />
      </div>
      <div v-show="!isFullScreen" data-test="expand-icon">
        <ArrowsPointingOutIcon />
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  LanguageIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/vue/24/outline";
import { type PropType } from "vue";

export default {
  components: {
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon,
    LanguageIcon,
    PauseIcon,
    PlayIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
  },
  props: {
    handleSubtitleSelectorClick: {
      default: () => {
        return;
      },
      type: Function as PropType<() => void>,
    },
    isVideoMuted: {
      required: true,
      type: Boolean,
    },
    isVideoPaused: {
      required: true,
      type: Boolean,
    },
    setVideoCurrentTime: {
      required: true,
      type: Function as PropType<(currentTime: number) => void>,
    },
    subtitlesEnabled: {
      default: false,
      type: Boolean,
    },
    toggleVideoMute: {
      required: true,
      type: Function as PropType<() => void>,
    },
    toggleVideoPlay: {
      required: true,
      type: Function as PropType<() => void>,
    },
    videoCurrentTime: {
      required: true,
      type: Number,
    },
    videoDuration: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      isFullScreen: false,
    };
  },
  computed: {
    currentTimeFormatted() {
      return this.formatTime(this.videoCurrentTime);
    },
    durationFormatted() {
      return this.formatTime(this.videoDuration);
    },
  },
  mounted() {
    document.addEventListener("fullscreenchange", this.fullScreenChanged);
  },
  beforeUnmount() {
    document.removeEventListener("fullscreenchange", this.fullScreenChanged);
  },
  methods: {
    formatTime(num: number) {
      const hours = Math.floor(num / 3600);
      const minutes = Math.floor((num % 3600) / 60);
      const seconds = Math.floor(num % 60);

      const hoursStr = hours < 10 ? `0${hours}` : hours;
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      const secondsStr = seconds < 10 ? `0${seconds}` : seconds;

      if (hours > 0) {
        return `${hoursStr}:${minutesStr}:${secondsStr}`;
      }
      return `${minutesStr}:${secondsStr}`;
    },
    fullScreenChanged() {
      this.isFullScreen = document.fullscreenElement ? true : false;
    },
    toggleFullScreen() {
      if (this.isFullScreen) {
        if (document.exitFullscreen) {
          void document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          void document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          void document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          void document.msExitFullscreen();
        }
      } else {
        const el = this.$parent?.$el;
        if (el) {
          if (el.requestFullscreen) {
            el.requestFullscreen();
          } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
          } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
          } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
          }
        }
      }
      this.isFullScreen = !this.isFullScreen;
    },
  },
};
</script>

<style>
.video-controls {
  box-sizing: border-box;
  display: flex;
  gap: 0.25rem;

  position: absolute;
  bottom: 0;
  background: var(--video-control-colour);
  padding: 0.25rem;
  width: 100%;
  align-items: center;
  color: var(--text-colour);
  user-select: none;

  opacity: 90%;
}
.video-controls > button {
  background-color: transparent;
  color: var(--text-colour);
  border-width: 0;
  border-radius: 0.25rem;
  padding: 0;
  cursor: pointer;
}
.video-controls > button:hover {
  background-color: var(--sub-entry-colour);
}
.video-controls > button svg {
  width: 1.5rem;
  height: 1.5rem;
  align-content: center;
  vertical-align: middle;
}
.video-controls > input {
  display: flex;
  align-items: center;
  margin: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.video-controls > .duration {
  font-size: 0.9rem;
  justify-self: flex-end;
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
}
</style>
