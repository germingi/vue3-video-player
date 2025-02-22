import SubtitleSelector from "@/components/SubtitleSelector/SubtitleSelector.vue";
import SubtitleSelectorSearchBar from "@/components/SubtitleSelector/SubtitleSelectorSearchBar.vue";
import SubtitleSelectorTable from "@/components/SubtitleSelector/SubtitleSelectorTable.vue";
import type { SubtitleInfo } from "@/models/Subtitles";
import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";

const deleteSubtitle = vi.fn();
const downloadSubtitle = vi.fn();
const deselectSubtitle = vi.fn();
const selectSubtitle = vi.fn();
const searchSubtitles = vi.fn();
const subtitles: SubtitleInfo[] = [];

describe("SubtitleSelector", () => {
  const wrapper = mount(SubtitleSelector, {
    props: {
      deleteSubtitle,
      downloadSubtitle,
      deselectSubtitle,
      selectSubtitle,
      searchSubtitles,
      subtitles,
    },
  });

  test("WHEN SubtitleSelector rendered \
    THEN renders the search bar and the table", () => {
    expect(wrapper.findComponent(SubtitleSelectorSearchBar).exists()).toBe(
      true,
    );
    expect(wrapper.findComponent(SubtitleSelectorTable).exists()).toBe(true);
  });
});
