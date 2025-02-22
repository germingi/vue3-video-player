import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*"],
      coverage: {
        include: ["lib/**/*"],
        exclude: ["lib/index.ts"],
        thresholds: {
          statements: 80,
          branches: 90,
          functions: 45,
          lines: 80,
        },
      },
    },
  }),
);
