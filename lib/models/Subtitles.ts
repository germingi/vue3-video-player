interface SubtitleCue {
  start: number;
  end: number;
  text: string;
}

interface SubtitleInfo {
  state: SubtitleState;
  id: number;
  language: string;
  title: string;
}

enum SubtitleState {
  NONE = 0,
  DOWNLOADING,
  DOWNLOADED,
  ACTIVE,
}

export { SubtitleState };
export type { SubtitleCue, SubtitleInfo };
