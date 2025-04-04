import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SubtitleContainer from "@/components/SubtitleContainer.vue";
import SubtitleSelector from "@/components/SubtitleSelector/SubtitleSelector.vue";
import VideoControls from "@/components/VideoControls.vue";
import VideoPlayer, {
  type VideoPlayerSubtitleProps,
} from "@/components/VideoPlayer.vue";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";

const deleteFunc = vi.fn();
const downloadFunc = vi.fn();
const deselectFunc = vi.fn();
const selectFunc = vi.fn();
const searchFunc = vi.fn();
const subtitles: VideoPlayerSubtitleProps = {
  enabled: true,
  deleteFunc,
  downloadFunc,
  deselectFunc,
  selectFunc,
  searchFunc,
  subtitles: [],
  cues: [],
};
const videoHeight = 1080;
const videoWidth = 1920;
const videoUrl = "www.someurl.com";

describe("VideoPlayer", () => {
  function wrap() {
    return mount(VideoPlayer, {
      props: {
        subtitles,
        videoHeight,
        videoWidth,
        videoUrl,
      },
    });
  }

  beforeEach(() => {
    subtitles.cues = [];
    vi.resetAllMocks();
  });

  test("WHEN render VideoPlayer \
    THEN aspect ratio is set", () => {
    const wrapper = wrap();
    const videoContainer = wrapper.get(".video-container");

    expect(videoContainer.attributes("style")).toContain("aspect-ratio: 1.77");
  });

  test("WHEN render VideoPlayer \
    THEN video source set", () => {
    const wrapper = wrap();
    const videoSource = wrapper.get("video").get("source");

    expect(videoSource.attributes("src")).toContain(videoUrl);
  });

  test("GIVEN subtitle cues \
    WHEN render VideoPlayer \
    THEN render SubtitleContainer component", () => {
    subtitles.cues = [
      {
        start: 0,
        end: 10,
        text: "hello world",
      },
    ];
    const wrapper = wrap();

    expect(wrapper.getComponent(SubtitleContainer).isVisible()).toBe(true);
  });

  test("GIVEN no subtitle cues \
    WHEN render VideoPlayer \
    THEN don't render SubtitleContainer component", () => {
    subtitles.cues = undefined;
    const wrapper = wrap();

    expect(wrapper.getComponent(SubtitleContainer).isVisible()).toBe(false);
  });

  test("WHEN render VideoPlayer \
    THEN SubtitleSelector starts hidden", () => {
    const wrapper = wrap();

    expect(wrapper.findComponent(SubtitleSelector).exists()).toBe(false);
  });

  test("GIVEN showSubtitlesComponent true \
    WHEN render VideoPlayer \
    THEN SubtitleSelector is visible", async () => {
    const wrapper = wrap();
    await wrapper.setData({ showSubtitlesComponent: true });

    expect(wrapper.findComponent(SubtitleSelector).exists()).toBe(true);
  });

  test("WHEN render VideoPlayer \
    THEN controls start as active", async () => {
    const wrapper = wrap();
    await wrapper.setData({ loadingMetaData: false });
    const controls = wrapper.get(".controls");

    expect(controls.classes()).toContain("active");
  });

  test.each`
    loadingMetaData | seeking  | videoControlsExists | spinnerVisible
    ${false}        | ${false} | ${true}             | ${false}
    ${false}        | ${true}  | ${true}             | ${true}
    ${true}         | ${false} | ${false}            | ${true}
    ${true}         | ${true}  | ${false}            | ${true}
  `(
    "GIVEN loadingMetaData = $loadingMetaData \
    AND seeking = $seeking \
    WHEN render VideoPlayer \
    THEN videoControlsExists = $videoControlsExists \
    AND spinnerVisible = $spinnerVisible",
    async ({
      loadingMetaData,
      seeking,
      videoControlsExists,
      spinnerVisible,
    }: {
      loadingMetaData: boolean;
      seeking: boolean;
      videoControlsExists: boolean;
      spinnerVisible: boolean;
    }) => {
      const wrapper = wrap();
      await wrapper.setData({ loadingMetaData, seeking });

      expect(wrapper.findComponent(VideoControls).exists()).toBe(
        videoControlsExists,
      );
      expect(wrapper.getComponent(LoadingSpinner).isVisible()).toBe(
        spinnerVisible,
      );
    },
  );
});
