import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import checkExist from "./plugins/vite-plugin-check-exist/index";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    checkExist(),
    vue(),
    DefineOptions(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    outDir: `${getDistDir()}/arena`,
  },
});

function getDistDir() {
  const rootDir = path.resolve(process.cwd(), "../..");
  return `${rootDir}/dist`;
}
