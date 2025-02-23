import VideoPlayer, {
  type VideoPlayerSubtitleProps,
} from "./components/VideoPlayer.vue";
import {
  type SubtitleCue,
  type SubtitleInfo,
  SubtitleState,
} from "./models/Subtitles";

export { SubtitleState, VideoPlayer };
export type { SubtitleCue, SubtitleInfo, VideoPlayerSubtitleProps };
