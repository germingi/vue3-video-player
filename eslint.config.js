import pluginVue from "eslint-plugin-vue";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import prettierConfig from "@vue/eslint-config-prettier";
import eslint from "@eslint/js";

export default defineConfigWithVueTs(
  eslint.configs.recommended,
  pluginVue.configs["flat/recommended"],
  vueTsConfigs.recommended,
  prettierConfig,
  {
    ignores: ["dist/", "node_modules/"],
  },
);
