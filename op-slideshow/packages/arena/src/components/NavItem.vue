<script setup>
import { toRefs } from "vue";
defineOptions({
  name: "NavItem",
});

const props = defineProps({
  item: {
    type: Array,
    required: true,
  },
});

const { item } = toRefs(props);
</script>

<template>
  <el-sub-menu
    :index="item.title"
    popper-class="subMenuPop"
    v-if="item.children"
  >
    <template #title>
      <el-icon size="20"><FolderOpened /></el-icon>
      <span>{{ item.title }}</span>
    </template>
    <NavItem
      v-for="subItem in item.children"
      :key="subItem.link"
      :index="subItem.link || subItem.title"
      :item="subItem"
    ></NavItem>
  </el-sub-menu>
  <el-menu-item :index="item.link" v-else>
    <el-icon size="20"><DataLine /></el-icon>
    <template #title>
      <span>{{ item.title }}</span>
    </template>
  </el-menu-item>
</template>

<style lang="less" scoped>
.el-menu-item1 {
  transition: 0.3s;
  > span {
    z-index: 1;
  }

  &:before {
    content: "";
    width: 0;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #2c2c34;
    // transform: translateX(-100%);
    transition: 0.3s;
  }

  &:hover {
    background-color: transparent;

    &:before {
      width: 100%;
    }
  }

  &.is-active {
    color: #fff;
    &:before {
      width: 100%;
    }
  }
}
</style>
