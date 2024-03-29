import { createApp } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./style.less";
import App from "./App.vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
