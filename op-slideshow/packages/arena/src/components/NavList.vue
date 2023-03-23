<script setup>
import { ref, toRefs } from "vue";
import NavItem from "./NavItem.vue";
defineOptions({
  name: "NavList",
});

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
  isPdf: {
    type: Boolean,
    default: false,
  },
  list: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["select", "update:isCollapse", "update:isPdf"]);

const { list, isCollapse, isPdf } = toRefs(props);

const handleSelect = (link) => {
  emits("select", link);
};
const handleTriggerCollapse = () => {
  emits("update:isCollapse", !isCollapse.value);
};

const handleTriggerPdf = () => {
  emits("update:isPdf", !isPdf.value);
};
const handleOpen = () => {};
const handleClose = () => {};
</script>

<template>
  <section class="NavList">
    <el-switch
      :value="isPdf"
      @change="handleTriggerPdf"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #409eff"
      inline-prompt
      active-text="pdf"
      inactive-text="ppt"
    />
    <el-menu
      class="NavList-list"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#ABB1B7"
      active-text-color="#ABB1B7"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <template v-for="(item, index) in list" :key="index">
        <NavItem :item="item" />
      </template>
    </el-menu>
    <div class="NavList-footer">
      <el-icon
        class="btn"
        :class="{ 'is-open': !isCollapse }"
        @click="handleTriggerCollapse"
        ><Right
      /></el-icon>
    </div>
  </section>
</template>

<style lang="less" scoped>
.NavList {
  display: flex;
  flex-direction: column;
  background-color: #353441;

  .el-switch {
    margin: 0 auto;
  }
  .NavList-list {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    border: none;
    user-select: none;
  }
  .NavList-footer {
    height: 50px;
    padding: 0 11px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .btn {
      width: 30px;
      font-size: 30px;
      color: #fff;
      transition: 0.3s;

      &.is-open {
        transform: rotate(-180deg);
      }
    }
  }
}
</style>
