<template>
  <div class="video-player-container">
    <VideoPlayer
      :callbacks="callbacks"
      :subtitles="subtitleProps"
      title="Big Buck Bunny"
      :video-width="1280"
      :video-height="720"
      video-url="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    />
  </div>
</template>

<script lang="ts">
import {
  SubtitleState,
  VideoPlayer,
  type SubtitleCue,
  type SubtitleInfo,
  type VideoPlayerSubtitleProps,
} from "@/index";

const englishCues: SubtitleCue[] = [
  {
    start: 1,
    end: 5,
    text: "These are\nEnglish subtitles",
  },
  {
    start: 6,
    end: 10,
    text: "As a treat, here's some more",
  },
];
const frenchCues: SubtitleCue[] = [
  {
    start: 1,
    end: 5,
    text: "These are\nFrench subtitles",
  },
  {
    start: 6,
    end: 10,
    text: "qu'est-ce que c'est?\nfafafafa fafa fafa fa fa",
  },
];
const remoteCues: SubtitleCue[] = [
  {
    start: 1,
    end: 5,
    text: "These are\nRemote subtitles",
  },
  {
    start: 6,
    end: 10,
    text: "You downloaded these, kind of",
  },
];
const cuesMap = [englishCues, frenchCues, remoteCues];
const allSubtitles: SubtitleInfo[] = [
  {
    id: 1,
    language: "en",
    title: "English subs",
    state: SubtitleState.ACTIVE,
  },
  {
    id: 2,
    language: "fr",
    title: "French subs",
    state: SubtitleState.DOWNLOADED,
  },
  {
    id: 3,
    language: "en",
    title: "Remote subs",
    state: SubtitleState.NONE,
  },
];

export default {
  components: {
    VideoPlayer,
  },
  data: () => {
    return {
      callbacks: [
        {
          event: "timeupdate",
          callback: () => {
            const video = document.querySelector("video");
            const percentPlayed =
              ((video?.currentTime ?? 0) / (video?.duration ?? 1)) * 100;
            console.log(`Video is ${percentPlayed.toFixed(2)}% played`);
          },
        },
      ],
      subtitles: allSubtitles,
    };
  },
  computed: {
    activeCues() {
      if (this.activeSubtitleId < 1) {
        return [];
      } else {
        return cuesMap[this.activeSubtitleId - 1];
      }
    },
    activeSubtitleId() {
      const activeSubs = this.subtitles.find(
        (sub) => sub.state === SubtitleState.ACTIVE,
      );
      return activeSubs?.id ?? 0;
    },
    subtitleProps() {
      const subtitleProps: VideoPlayerSubtitleProps = {
        enabled: true,
        deleteFunc: this.deleteFunc,
        downloadFunc: this.downloadFunc,
        deselectFunc: this.deselectFunc,
        selectFunc: this.selectFunc,
        searchFunc: this.searchFunc,
        subtitles: this.subtitles,
        cues: this.activeCues,
        defaultSearchLanguage: "en",
        secondSearchLanguage: "fr",
      };
      return subtitleProps;
    },
  },
  methods: {
    setSubstate(subtitleId: number, state: SubtitleState) {
      const matchingSub = this.subtitles.find((sub) => sub.id === subtitleId);
      if (matchingSub) matchingSub.state = state;
    },
    deleteFunc(subtitleId: number) {
      this.setSubstate(subtitleId, SubtitleState.NONE);
    },
    downloadFunc(subtitleId: number) {
      this.setSubstate(subtitleId, SubtitleState.DOWNLOADING);
      setTimeout(
        () => this.setSubstate(subtitleId, SubtitleState.DOWNLOADED),
        500,
      );
    },
    deselectFunc(subtitleId: number) {
      this.setSubstate(subtitleId, SubtitleState.DOWNLOADED);
    },
    selectFunc(subtitleId: number) {
      this.subtitles
        .filter((sub) => sub.state === SubtitleState.ACTIVE)
        .forEach((sub) => (sub.state = SubtitleState.DOWNLOADED));
      this.setSubstate(subtitleId, SubtitleState.ACTIVE);
    },
    searchFunc(searchTerm: string, language: string) {
      this.subtitles = allSubtitles.filter((sub) => {
        return (
          sub.language.toLowerCase() === language.toLowerCase() &&
          (!searchTerm ||
            sub.title.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
    },
  },
};
</script>

<style scoped>
.video-player-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;

  /* override theme colours */
  --germingi-lang-select-colour: teal;
}
</style>
