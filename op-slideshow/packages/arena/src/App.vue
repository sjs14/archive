<script setup>
import { computed, ref, watch } from "vue";
import linkData from "./assets/linkData.json";
import NavList from "./components/NavList.vue";
const realLinkData = window.linkData || linkData;
const isPdf = ref(false);
const currentLink = ref("");
const currentPdfLink = ref("");
const realShowLink = computed(() => {
  return isPdf.value ? currentPdfLink.value : currentLink.value;
});

const getPdfUrl = (link) => {
  const reg = /([^\/]*)\/([^\/]*\.html.*)$/;
  return link.replace(reg, (match, name) => {
    return `${name}/${name}.pdf`;
  });
};
const handleSelect = (link) => {
  currentLink.value = link;
  currentPdfLink.value = getPdfUrl(link);
};

const isCollapse = ref(true);
const iframeRef = ref();
watch([isCollapse, realShowLink], () => {
  iframeRef.value.contentWindow.focus();
});
</script>

<template>
  <section class="App">
    <NavList
      v-model:isCollapse="isCollapse"
      v-model:isPdf="isPdf"
      class="App-nav"
      :list="realLinkData"
      @select="handleSelect"
    />
    <div class="App-iframe" @click="isCollapse = true">
      <iframe
        ref="iframeRef"
        :class="{ rotate: !isCollapse }"
        :src="realShowLink"
      ></iframe>
      <div
        :class="{ rotate: !isCollapse }"
        class="tips"
        v-show="!currentLink || !isCollapse"
      >
        <span v-show="!currentLink">请选择需要展示的内容</span>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped>
.App {
  height: 100%;
  display: flex;

  .App-iframe {
    flex: 1;
    overflow: hidden;
    position: relative;
    perspective: 800px;

    iframe {
      width: 100%;
      height: 100%;
      border: none;
      background-color: #000;
      transition: 0.3s;
      transform-origin: 0 center;
      &.rotate {
        transform: rotateY(15deg);
      }
    }
    .tips {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      color: #fff;
      position: absolute;
      top: 0;
      left: 0;
      transition: 0.2s;
      transform-origin: 0 center;
      &.rotate {
        transform: rotateY(15deg);
      }
    }
  }
}
</style>
