import VideoPlayerContainer from "../../src/VideoPlayerContainer.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

const mountContainer = () =>
  mount(VideoPlayerContainer, {
    global: { stubs: { VideoPlayer: true } },
  });

const subtitleIds = (wrapper: ReturnType<typeof mountContainer>) =>
  (wrapper.vm as unknown as { subtitles: { id: number }[] }).subtitles
    .map((subtitle) => subtitle.id)
    .sort((left, right) => left - right);

describe("VideoPlayerContainer subtitle search", () => {
  test("WHEN a language is picked \
    THEN the downloaded subtitles of the other language are still listed", () => {
    const wrapper = mountContainer();

    (
      wrapper.vm as unknown as {
        searchFunc: (searchTerm: string, language: string) => void;
      }
    ).searchFunc("", "fr");

    // id 1 is the active English subtitle, id 2 the downloaded French one.
    expect(subtitleIds(wrapper)).toEqual([1, 2]);
  });

  test("WHEN English is picked \
    THEN the downloaded French subtitle and every English subtitle are listed", () => {
    const wrapper = mountContainer();

    (
      wrapper.vm as unknown as {
        searchFunc: (searchTerm: string, language: string) => void;
      }
    ).searchFunc("", "en");

    expect(subtitleIds(wrapper)).toEqual([1, 2, 3]);
  });
});
