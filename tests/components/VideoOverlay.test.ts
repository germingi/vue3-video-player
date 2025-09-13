import LoadingSpinner from "@/components/LoadingSpinner.vue";
import VideoOverlay from "@/components/VideoOverlay.vue";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, test } from "vitest";

const title = "Big Buck Bunny";
let isPausedProp = false;
let isLoadingProp = false;

describe("VideoOverlay", () => {
  function wrap() {
    return mount(VideoOverlay, {
      props: {
        isPaused: isPausedProp,
        isLoading: isLoadingProp,
        title,
      },
    });
  }

  beforeEach(() => {
    // reset props
    isPausedProp = false;
    isLoadingProp = false;
  });

  test.each`
    isPaused | isLoading
    ${true}  | ${false}
    ${false} | ${true}
    ${true}  | ${true}
  `(
    "GIVEN isPaused = $isPaused \
    AND isLoading = $isLoading \
    WHEN render VideoOverlay \
    THEN component has active class",
    ({ isPaused, isLoading }: { isPaused: boolean; isLoading: boolean }) => {
      isLoadingProp = isLoading;
      isPausedProp = isPaused;
      const wrapper = wrap();
      const overlay = wrapper.get(".overlay");
      expect(overlay.classes()).toContain("active");
    },
  );

  test("GIVEN video is not paused \
    AND video is not loading \
    WHEN render VideoOverlay \
    THEN component does not have active class", () => {
    const wrapper = wrap();
    const overlay = wrapper.get(".overlay");
    expect(overlay.classes()).not.toContain("active");
  });

  test("GIVEN video is loading \
    WHEN render VideoOverlay \
    THEN loading spinner is visible", () => {
    isLoadingProp = true;
    const wrapper = wrap();
    expect(wrapper.getComponent(LoadingSpinner).isVisible()).toBe(true);
  });

  test("GIVEN video is not loading \
    WHEN render VideoOverlay \
    THEN loading spinner is not visible", () => {
    const wrapper = wrap();
    expect(wrapper.getComponent(LoadingSpinner).isVisible()).toBe(false);
  });

  test("GIVEN video is paused \
    WHEN render VideoOverlay \
    THEN title is visible", () => {
    isPausedProp = true;
    const wrapper = wrap();
    const titleElement = wrapper.get(".title");
    expect(titleElement.classes()).toContain("active");
  });

  test("GIVEN video is not paused \
    WHEN render VideoOverlay \
    THEN title is not visible", () => {
    const wrapper = wrap();
    const titleElement = wrapper.get(".title");
    expect(titleElement.classes()).not.toContain("active");
  });

  test("WHEN render VideoOverlay \
    THEN title text is correct", () => {
    const wrapper = wrap();
    const titleElement = wrapper.get(".title");
    expect(titleElement.text()).toBe(title);
  });
});
