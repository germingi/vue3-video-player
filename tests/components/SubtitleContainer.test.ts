import { mount } from "@vue/test-utils";
import SubtitleContainer from "@/components/SubtitleContainer.vue";
import { describe, expect, test } from "vitest";
import type { SubtitleCue } from "@/models/Subtitles";

let cues: SubtitleCue[] = [];
let videoTime = 0;

describe("SubtitleContainer", () => {
  function wrap() {
    return mount(SubtitleContainer, {
      props: {
        cues,
        videoTime,
      },
    });
  }

  test("GIVEN no cues \
    WHEN SubtitleContainer rendered \
    THEN subtitle container is empty", () => {
    cues = [];
    videoTime = 0;

    const wrapper = wrap();

    expect(wrapper.text()).toContain("");
  });

  test.each`
    time | expected
    ${0} | ${""}
    ${2} | ${"hello"}
    ${4} | ${""}
    ${6} | ${"world"}
    ${8} | ${""}
  `(
    "GIVEN subtitle cues \
    AND video time at $time \
    WHEN SubtitleContainer rendered \
    THEN text should be $expected",
    ({ time, expected }: { time: number; expected: string }) => {
      cues = [
        {
          start: 1,
          end: 3,
          text: "hello",
        },
        {
          start: 5,
          end: 7,
          text: "world",
        },
      ];
      videoTime = time;

      const wrapper = wrap();

      expect(wrapper.text()).toBe(expected);
    },
  );

  test("GIVEN cues contain unsafe html \
    THEN the html is sanitised before being displayed", () => {
    cues = [
      {
        start: 0,
        end: 10,
        text: "<script>alert('hello world')</script>",
      },
    ];
    videoTime = 0;

    const wrapper = wrap();

    expect(wrapper.html()).not.toContain("script");
    expect(wrapper.text()).toBe("");
  });

  test("GIVEN cues contain safe html \
    THEN the html is rendered normally", () => {
    cues = [
      {
        start: 0,
        end: 10,
        text: "<i>hello world</i>",
      },
    ];
    videoTime = 0;

    const wrapper = wrap();

    expect(wrapper.html()).toContain("<i>hello world</i>");
    expect(wrapper.text()).toBe("hello world");
  });
});
