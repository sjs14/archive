// vite.config.js
import path2 from "path";
import { defineConfig } from "file:///Users/shen910227/Desktop/op-slideshow/node_modules/.pnpm/registry.npmmirror.com+vite@4.1.4_less@4.1.3/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/shen910227/Desktop/op-slideshow/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.0.0_vite@4.1.4+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import DefineOptions from "file:///Users/shen910227/Desktop/op-slideshow/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-define-options@1.2.4_vue@3.2.47/node_modules/unplugin-vue-define-options/dist/vite.mjs";
import AutoImport from "file:///Users/shen910227/Desktop/op-slideshow/node_modules/.pnpm/registry.npmmirror.com+unplugin-auto-import@0.15.1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///Users/shen910227/Desktop/op-slideshow/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///Users/shen910227/Desktop/op-slideshow/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.24.1_vue@3.2.47/node_modules/unplugin-vue-components/dist/resolvers.mjs";

// plugins/vite-plugin-check-exist/index.js
import path from "path";
import fs from "fs";
import chalk from "file:///Users/shen910227/Desktop/op-slideshow/node_modules/.pnpm/registry.npmmirror.com+chalk@4.1.2/node_modules/chalk/source/index.js";
var vite_plugin_check_exist_default = () => {
  return {
    name: "vite-plugin-check-exist",
    enforce: "pre",
    config() {
      const linkDataBuildPath = path.resolve(
        process.cwd(),
        "../../dist/arena/linkData.json"
      );
      const isBuild = process.argv[2] === "build";
      const isForce = process.argv[3] === "--force" || process.argv[3] === "-f";
      if (isBuild && fs.existsSync(linkDataBuildPath)) {
        if (!isForce) {
          console.log(
            chalk.hex("#FFA500")(
              `${linkDataBuildPath} \u5DF2\u5B58\u5728
\u91CD\u65B0\u6253\u5305\u4F1A\u6E05\u7A7A\u5BFC\u822A\u5185\u5BB9\uFF0C\u8BF7\u786E\u8BA4\u5E76\u8FD0\u884C pnpm run build:arena --force `
            )
          );
          process.exit();
        }
      }
    }
  };
};

// vite.config.js
var vite_config_default = defineConfig({
  base: "./",
  plugins: [
    vite_plugin_check_exist_default(),
    vue(),
    DefineOptions(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  build: {
    outDir: `${getDistDir()}/arena`
  }
});
function getDistDir() {
  const rootDir = path2.resolve(process.cwd(), "../..");
  return `${rootDir}/dist`;
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicGx1Z2lucy92aXRlLXBsdWdpbi1jaGVjay1leGlzdC9pbmRleC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9zaGVuOTEwMjI3L0Rlc2t0b3Avb3Atc2xpZGVzaG93L3BhY2thZ2VzL2FyZW5hXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc2hlbjkxMDIyNy9EZXNrdG9wL29wLXNsaWRlc2hvdy9wYWNrYWdlcy9hcmVuYS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc2hlbjkxMDIyNy9EZXNrdG9wL29wLXNsaWRlc2hvdy9wYWNrYWdlcy9hcmVuYS92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgRGVmaW5lT3B0aW9ucyBmcm9tICd1bnBsdWdpbi12dWUtZGVmaW5lLW9wdGlvbnMvdml0ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcbmltcG9ydCBjaGVja0V4aXN0IGZyb20gXCIuL3BsdWdpbnMvdml0ZS1wbHVnaW4tY2hlY2stZXhpc3QvaW5kZXhcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6IFwiLi9cIixcbiAgcGx1Z2luczogW1xuICAgIGNoZWNrRXhpc3QoKSxcbiAgICB2dWUoKSxcbiAgICBEZWZpbmVPcHRpb25zKCksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IGAke2dldERpc3REaXIoKX0vYXJlbmFgLFxuICB9LFxufSk7XG5cbmZ1bmN0aW9uIGdldERpc3REaXIoKSB7XG4gIGNvbnN0IHJvb3REaXIgPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCIuLi8uLlwiKTtcbiAgcmV0dXJuIGAke3Jvb3REaXJ9L2Rpc3RgO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc2hlbjkxMDIyNy9EZXNrdG9wL29wLXNsaWRlc2hvdy9wYWNrYWdlcy9hcmVuYS9wbHVnaW5zL3ZpdGUtcGx1Z2luLWNoZWNrLWV4aXN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc2hlbjkxMDIyNy9EZXNrdG9wL29wLXNsaWRlc2hvdy9wYWNrYWdlcy9hcmVuYS9wbHVnaW5zL3ZpdGUtcGx1Z2luLWNoZWNrLWV4aXN0L2luZGV4LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zaGVuOTEwMjI3L0Rlc2t0b3Avb3Atc2xpZGVzaG93L3BhY2thZ2VzL2FyZW5hL3BsdWdpbnMvdml0ZS1wbHVnaW4tY2hlY2stZXhpc3QvaW5kZXguanNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJ2aXRlLXBsdWdpbi1jaGVjay1leGlzdFwiLFxuICAgIGVuZm9yY2U6IFwicHJlXCIsXG4gICAgY29uZmlnKCkge1xuICAgICAgY29uc3QgbGlua0RhdGFCdWlsZFBhdGggPSBwYXRoLnJlc29sdmUoXG4gICAgICAgIHByb2Nlc3MuY3dkKCksXG4gICAgICAgIFwiLi4vLi4vZGlzdC9hcmVuYS9saW5rRGF0YS5qc29uXCJcbiAgICAgICk7XG4gICAgICBjb25zdCBpc0J1aWxkID0gcHJvY2Vzcy5hcmd2WzJdID09PSBcImJ1aWxkXCI7XG4gICAgICBjb25zdCBpc0ZvcmNlID0gcHJvY2Vzcy5hcmd2WzNdID09PSBcIi0tZm9yY2VcIiB8fCBwcm9jZXNzLmFyZ3ZbM10gPT09IFwiLWZcIjtcbiAgICAgIGlmIChpc0J1aWxkICYmIGZzLmV4aXN0c1N5bmMobGlua0RhdGFCdWlsZFBhdGgpKSB7XG4gICAgICAgIGlmICghaXNGb3JjZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgY2hhbGsuaGV4KFwiI0ZGQTUwMFwiKShcbiAgICAgICAgICAgICAgYCR7bGlua0RhdGFCdWlsZFBhdGh9IFx1NURGMlx1NUI1OFx1NTcyOFxcblx1OTFDRFx1NjVCMFx1NjI1M1x1NTMwNVx1NEYxQVx1NkUwNVx1N0E3QVx1NUJGQ1x1ODIyQVx1NTE4NVx1NUJCOVx1RkYwQ1x1OEJGN1x1Nzg2RVx1OEJBNFx1NUU3Nlx1OEZEMFx1ODg0QyBwbnBtIHJ1biBidWlsZDphcmVuYSAtLWZvcmNlIGBcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICAgIHByb2Nlc3MuZXhpdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlWLE9BQU9BLFdBQVU7QUFDbFcsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCOzs7QUNOaVksT0FBTyxVQUFVO0FBQ3RiLE9BQU8sUUFBUTtBQUNmLE9BQU8sV0FBVztBQUVsQixJQUFPLGtDQUFRLE1BQU07QUFDbkIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLElBQ1QsU0FBUztBQUNQLFlBQU0sb0JBQW9CLEtBQUs7QUFBQSxRQUM3QixRQUFRLElBQUk7QUFBQSxRQUNaO0FBQUEsTUFDRjtBQUNBLFlBQU0sVUFBVSxRQUFRLEtBQUssQ0FBQyxNQUFNO0FBQ3BDLFlBQU0sVUFBVSxRQUFRLEtBQUssQ0FBQyxNQUFNLGFBQWEsUUFBUSxLQUFLLENBQUMsTUFBTTtBQUNyRSxVQUFJLFdBQVcsR0FBRyxXQUFXLGlCQUFpQixHQUFHO0FBQy9DLFlBQUksQ0FBQyxTQUFTO0FBQ1osa0JBQVE7QUFBQSxZQUNOLE1BQU0sSUFBSSxTQUFTO0FBQUEsY0FDakIsR0FBRztBQUFBO0FBQUEsWUFDTDtBQUFBLFVBQ0Y7QUFDQSxrQkFBUSxLQUFLO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QURqQkEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsZ0NBQVc7QUFBQSxJQUNYLElBQUk7QUFBQSxJQUNKLGNBQWM7QUFBQSxJQUNkLFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ25DLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ25DLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRLEdBQUcsV0FBVztBQUFBLEVBQ3hCO0FBQ0YsQ0FBQztBQUVELFNBQVMsYUFBYTtBQUNwQixRQUFNLFVBQVVDLE1BQUssUUFBUSxRQUFRLElBQUksR0FBRyxPQUFPO0FBQ25ELFNBQU8sR0FBRztBQUNaOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgInBhdGgiXQp9Cg==
