import { mount } from "@vue/test-utils";
import SubtitleSelectorEntry from "@/components/SubtitleSelector/SubtitleSelectorEntry.vue";
import { beforeEach, describe, expect, test, vi } from "vitest";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
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

function wrap() {
  return mount(SubtitleSelectorEntry, {
    props: {
      deleteSubtitle,
      downloadSubtitle,
      deselectSubtitle,
      selectSubtitle,
      subtitle,
    },
  });
}

const wrapper = wrap();

describe("SubtitleSelectorEntry", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("GIVEN subtitle is not downloaded \
    WHEN subtitle is clicked \
    THEN download prop is called", () => {
    subtitle.state = SubtitleState.NONE;

    const subtitleButton = wrapper.get("button");
    subtitleButton.trigger("click");

    expect(downloadSubtitle).toBeCalled();
  });

  test("GIVEN subtitle is downloading \
    WHEN subtitle is clicked \
    THEN download prop is not called", () => {
    subtitle.state = SubtitleState.DOWNLOADING;

    const subtitleButton = wrapper.get("button");
    subtitleButton.trigger("click");

    expect(downloadSubtitle).not.toBeCalled();
  });

  test("GIVEN subtitle is downloaded \
    WHEN subtitle is clicked \
    THEN select prop is called", () => {
    subtitle.state = SubtitleState.DOWNLOADED;

    const subtitleButton = wrapper.get("button");
    subtitleButton.trigger("click");

    expect(selectSubtitle).toBeCalled();
  });

  test("GIVEN subtitle is active \
    WHEN subtitle is clicked \
    THEN download prop is not called", () => {
    subtitle.state = SubtitleState.ACTIVE;

    const subtitleButton = wrapper.get("button");
    subtitleButton.trigger("click");

    expect(deselectSubtitle).toBeCalled();
  });

  test("GIVEN subtitle is active \
    THEN tr has class active", () => {
    subtitle.state = SubtitleState.ACTIVE;
    const wrapper = wrap();

    const trElement = wrapper.get("tr");

    expect(trElement.classes()).toContain("active");
  });

  test("GIVEN subtitle is not active \
    THEN tr does not have class active", () => {
    subtitle.state = SubtitleState.NONE;
    const wrapper = wrap();

    const trElement = wrapper.get("tr");

    expect(trElement.classes()).not.toContain("active");
  });

  test("GIVEN subtitle has title and lang \
    THEN should render that content in the correct columns", () => {
    const nameTd = wrapper.findAll("td").at(0);
    const langTd = wrapper.findAll("td").at(1);

    expect(nameTd?.text()).toBe("title");
    expect(langTd?.text()).toBe("en");
  });

  test("GIVEN subtitle language is too long \
    THEN it should be trimmed", () => {
    subtitle.language = "longstring";
    const wrapper = wrap();

    const langTd = wrapper.findAll("td").at(1);

    expect(langTd?.text()).toBe("lo");
  });

  test.each`
    subtitleState                | spinnerVisible | deleteButtonVisible | downloadButtonVisible
    ${SubtitleState.NONE}        | ${false}       | ${false}            | ${true}
    ${SubtitleState.DOWNLOADING} | ${true}        | ${false}            | ${false}
    ${SubtitleState.DOWNLOADED}  | ${false}       | ${true}             | ${false}
    ${SubtitleState.ACTIVE}      | ${false}       | ${true}             | ${false}
  `(
    "GIVEN subtitle in state $subtitleState \
    THEN render the right action",
    ({
      subtitleState,
      spinnerVisible,
      deleteButtonVisible,
      downloadButtonVisible,
    }: {
      subtitleState: SubtitleState;
      spinnerVisible: boolean;
      deleteButtonVisible: boolean;
      downloadButtonVisible: boolean;
    }) => {
      subtitle.state = subtitleState;
      const wrapper = wrap();

      expect(wrapper.getComponent(LoadingSpinner).isVisible()).toBe(
        spinnerVisible,
      );
      expect(
        wrapper.get('[data-test="delete-subtitle-button"]').isVisible(),
      ).toBe(deleteButtonVisible);
      expect(
        wrapper.get('[data-test="download-subtitle-button"]').isVisible(),
      ).toBe(downloadButtonVisible);
    },
  );
});
