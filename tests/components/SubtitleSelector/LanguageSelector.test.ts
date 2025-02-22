import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import LanguageSelector from "@/components/SubtitleSelector/LanguageSelector.vue";

describe("LanguageSelector", () => {
  const language1 = "en";
  const language2 = "fr";
  let isLanguage1Selected = true;
  const setLanguage = vi.fn();

  function wrap() {
    return mount(LanguageSelector, {
      props: {
        language1,
        language2,
        isLanguage1Selected,
        setLanguage,
      },
    });
  }

  test("WHEN LanguageSelector component rendered \
    THEN render EN and FR buttons \
    AND EN button is selected \
    AND FR button is not selected", () => {
    const wrapper = wrap();

    expect(wrapper.findAll("button")).lengthOf(2);

    const enButton = wrapper.findAll("button").at(0);
    const frButton = wrapper.findAll("button").at(1);

    expect(enButton?.text()).toBe("EN");
    expect(enButton?.classes()).contain("selected");

    expect(frButton?.text()).toBe("FR");
    expect(frButton?.classes()).not.contain("selected");
  });

  test("GIVEN second language is selected \
    WHEN LanguageSelector component rendered \
    THEN EN button is not selected \
    AND FR button is selected", () => {
    isLanguage1Selected = false;
    const wrapper = wrap();

    const enButton = wrapper.findAll("button").at(0);
    const frButton = wrapper.findAll("button").at(1);

    expect(enButton?.classes()).not.contain("selected");
    expect(frButton?.classes()).contain("selected");
  });

  test("GIVEN first language is selected \
    WHEN FR button clicked \
    THEN language changed to fr", () => {
    isLanguage1Selected = true;
    const wrapper = wrap();

    const frButton = wrapper.findAll("button").at(1);
    frButton?.trigger("click");

    expect(setLanguage).toHaveBeenCalledWith("fr");
  });
});
