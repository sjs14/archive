import * as VueRouter from "vue-router";
import Home from "../views/home/index.vue";
import About from "../views/about/index.vue";
import Prebuild from "../views/prebuild/index.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/prebuild", component: Prebuild },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

export default router;
