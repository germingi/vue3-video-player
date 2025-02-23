import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
  resolve: {
    alias: {
      "@/": new URL("./lib/", import.meta.url).pathname,
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "lib/index.ts"),
      name: "VideoPlayer",
      // the proper extensions will be added
      fileName: "video-player",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
        assetFileNames(assetInfo) {
          if (assetInfo.name == "video-player.css") return "style.css";
          return assetInfo.name;
        },
      },
    },
  },
});
