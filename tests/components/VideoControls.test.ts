import VideoControls from "@/components/VideoControls.vue";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test, vi } from "vitest";

const handleSubtitleSelectorClick = vi.fn();
const setVideoCurrentTime = vi.fn();
const toggleVideoMute = vi.fn();
const toggleVideoPlay = vi.fn();
let isVideoMuted = false;
let isVideoPaused = false;
let subtitlesEnabled = false;
const videoCurrentTime = 123;
const videoDuration = 987654;

describe("VideoControls", () => {
  function wrap() {
    return mount(VideoControls, {
      props: {
        handleSubtitleSelectorClick,
        setVideoCurrentTime,
        toggleVideoMute,
        toggleVideoPlay,
        isVideoMuted,
        isVideoPaused,
        subtitlesEnabled,
        videoCurrentTime,
        videoDuration,
      },
    });
  }

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("GIVEN isVideoPaused prop is false \
    WHEN render VideoControls \
    THEN render pause icon", () => {
    isVideoPaused = false;

    const wrapper = wrap();

    expect(wrapper.get('[data-test="pause-icon"]').isVisible()).toBe(true);
    expect(wrapper.get('[data-test="play-icon"]').isVisible()).toBe(false);
  });

  test("GIVEN isVideoPaused prop is true \
    WHEN render VideoControls \
    THEN render play icon", () => {
    isVideoPaused = true;

    const wrapper = wrap();

    expect(wrapper.get('[data-test="play-icon"]').isVisible()).toBe(true);
    expect(wrapper.get('[data-test="pause-icon"]').isVisible()).toBe(false);
  });

  test("WHEN play pause button clicked \
    THEN toggleVideoPlay called", async () => {
    const wrapper = wrap();
    const button = wrapper.get('[data-test="play-button"]');

    await button.trigger("click");

    expect(toggleVideoPlay).toHaveBeenCalled();
  });

  test("WHEN render VideoControls \
    THEN render slider", () => {
    const wrapper = wrap();
    const slider = wrapper.get("input");

    expect(slider.attributes("type")).toBe("range");
    expect(slider.attributes("min")).toBe("0");
    expect(slider.attributes("max")).toBe("987654");
  });

  test("WHEN slider value changed \
    THEN call setVideoCurrentTime", async () => {
    const wrapper = wrap();
    const slider = wrapper.get("input");

    await slider.setValue("30");

    expect(setVideoCurrentTime).toHaveBeenCalledWith(30);
  });

  test("WHEN VideoControls rendered \
    THEN time and duration are correctly displayed", () => {
    const wrapper = wrap();
    const duration = wrapper.get(".duration");

    expect(duration.text()).toContain("02:03");
    expect(duration.text()).toContain("/");
    expect(duration.text()).toContain("274:20:54");
  });

  test("GIVEN isVideoMuted prop is false \
    WHEN render VideoControls \
    THEN render mute icon", () => {
    isVideoMuted = false;

    const wrapper = wrap();

    expect(wrapper.get('[data-test="mute-icon"]').isVisible()).toBe(true);
    expect(wrapper.get('[data-test="unmute-icon"]').isVisible()).toBe(false);
  });

  test("GIVEN isVideoMuted prop is true \
    WHEN render VideoControls \
    THEN render unmute icon", () => {
    isVideoMuted = true;

    const wrapper = wrap();

    expect(wrapper.get('[data-test="unmute-icon"]').isVisible()).toBe(true);
    expect(wrapper.get('[data-test="mute-icon"]').isVisible()).toBe(false);
  });

  test("WHEN (un)mute button clicked \
    THEN toggleVideoMute called", async () => {
    const wrapper = wrap();
    const button = wrapper.get('[data-test="mute-button"]');

    await button.trigger("click");

    expect(toggleVideoMute).toHaveBeenCalled();
  });

  test("WHEN subtitlesEnabled is false \
    THEN don't render subtitle button", () => {
    subtitlesEnabled = false;

    const wrapper = wrap();

    expect(wrapper.find('[data-test="subtitle-button"]').exists()).toBe(false);
  });

  test("GIVEN subtitlesEnabled is true \
    WHEN subtitle button clicked \
    THEN call handleSubtitleSelectorClick", async () => {
    subtitlesEnabled = true;

    const wrapper = wrap();
    const button = wrapper.get('[data-test="subtitle-button"]');

    await button.trigger("click");

    expect(handleSubtitleSelectorClick).toHaveBeenCalled();
  });

  test("WHEN render VideoControls \
    THEN render expand icon", () => {
    const wrapper = wrap();

    expect(wrapper.get('[data-test="expand-icon"]').isVisible()).toBe(true);
    expect(wrapper.get('[data-test="shrink-icon"]').isVisible()).toBe(false);
  });

  test("WHEN fullscreen button called \
    THEN render shrink icon", async () => {
    const wrapper = wrap();
    const button = wrapper.get('[data-test="fullscreen-button"]');

    await button.trigger("click");

    expect(wrapper.get('[data-test="shrink-icon"]').isVisible()).toBe(true);
    expect(wrapper.get('[data-test="expand-icon"]').isVisible()).toBe(false);
  });
});
