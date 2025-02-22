import { mount } from "@vue/test-utils";
import SubtitleSelectorTable from "@/components/SubtitleSelector/SubtitleSelectorTable.vue";
import { describe, expect, test, vi } from "vitest";
import { SubtitleState, type SubtitleInfo } from "@/models/Subtitles";

const deleteSubtitle = vi.fn();
const downloadSubtitle = vi.fn();
const deselectSubtitle = vi.fn();
const selectSubtitle = vi.fn();
const subtitle: SubtitleInfo = {
  downloadCount: 1,
  foreignOnly: false,
  fps: 24,
  id: 123,
  title: "title",
  language: "en",
  state: SubtitleState.NONE,
};
let subtitles: SubtitleInfo[] = [];

function wrap() {
  return mount(SubtitleSelectorTable, {
    props: {
      deleteSubtitle,
      downloadSubtitle,
      deselectSubtitle,
      selectSubtitle,
      subtitles,
    },
  });
}

const wrapper = wrap();

describe("SubtitleSelectorTable", () => {
  test("GIVEN no subtitles \
    THEN display no subtitles found", () => {
    expect(wrapper.text()).toBe("no subtitles found");
    expect(wrapper.get("table").isVisible()).toBe(false);
  });

  test("GIVEN there are subtitles \
    THEN display no subtitles found", () => {
    subtitles = [subtitle];
    const wrapper = wrap();

    expect(wrapper.text()).not.toBe("no subtitles found");
    expect(wrapper.get("table").isVisible()).toBe(true);
  });

  test("GIVEN there are subtitles \
    THEN display the subtitles in order", () => {
    subtitles = [
      { ...subtitle, title: "5" },
      { ...subtitle, title: "6" },
      { ...subtitle, title: "7" },
    ];
    const wrapper = wrap();

    const trs = wrapper.findAll("tr");

    expect(trs.length).toBe(3);
    expect(trs.at(0)?.text()).toBe("5en");
    expect(trs.at(1)?.text()).toBe("6en");
    expect(trs.at(2)?.text()).toBe("7en");
  });
});
