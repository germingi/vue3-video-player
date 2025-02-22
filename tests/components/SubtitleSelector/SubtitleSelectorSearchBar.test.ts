import { mount } from "@vue/test-utils";
import SubtitleSelectorSearchBar from "@/components/SubtitleSelector/SubtitleSelectorSearchBar.vue";
import { beforeEach, describe, expect, test, vi } from "vitest";
import LanguageSelector from "@/components/SubtitleSelector/LanguageSelector.vue";

const defaultSearchLanguage = "en";
let secondSearchLanguage: string | undefined = "fr";
const searchSubtitles = vi.fn();

function wrap() {
  return mount(SubtitleSelectorSearchBar, {
    props: {
      defaultSearchLanguage,
      secondSearchLanguage,
      searchSubtitles,
    },
  });
}

describe("SubtitleSelectorSearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    secondSearchLanguage = "fr";
  });

  test("WHEN enter is pressed \
    THEN search function is called", async () => {
    const wrapper = wrap();

    const searchBar = wrapper.get("input");
    await searchBar.setValue("hello world");
    await searchBar.trigger("keyup.enter");

    expect(searchSubtitles).toBeCalledWith("hello world", "en");
  });

  test("GIVEN second search language exists \
    WHEN SubtitleSearchBar rendered \
    THEN LanguageSelector component rendered", () => {
    const wrapper = wrap();
    const languageSelectorProps = wrapper
      .getComponent(LanguageSelector)
      .props();

    expect(languageSelectorProps.language1).toBe(defaultSearchLanguage);
    expect(languageSelectorProps.language2).toBe(secondSearchLanguage);
    expect(languageSelectorProps.isLanguage1Selected).toBe(true);
  });

  test("GIVEN second search language selected \
    WHEN LanguageSelector component rendered \
    THEN isLanguage1Selected false", async () => {
    const wrapper = wrap();
    await wrapper.setData({ searchLanguage: secondSearchLanguage });
    const languageSelectorProps = wrapper
      .getComponent(LanguageSelector)
      .props();

    expect(languageSelectorProps.language1).toBe(defaultSearchLanguage);
    expect(languageSelectorProps.language2).toBe(secondSearchLanguage);
    expect(languageSelectorProps.isLanguage1Selected).toBe(false);
  });

  test("GIVEN no second search language \
    WHEN SubtitleSearchBar rendered \
    THEN LanguageSelector component not rendered", () => {
    secondSearchLanguage = undefined;
    const wrapper = wrap();

    expect(wrapper.findComponent(LanguageSelector).exists()).toBe(false);
  });
});
