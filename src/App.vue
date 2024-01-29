<template>
  <!-- desktop -->
  <KeepAlive>
    <component :is="curMouduleComponent" />
  </KeepAlive>
  <!-- 模块栏 -->
  <ModuleBar />
  <!-- 设置 -->
  <Setting v-if="isShowSetting" />
</template>

<script setup>
import { onBeforeMount, ref, provide, computed } from "vue";
// 模块
import Desktop from "@/modules/desktop/Desktop.vue";
import Steam from "@/modules/steam/Steam.vue";
import Browser from "@/modules/browser/Browser.vue";
// // 部件
import ModuleBar from "@/components/ModuleBar.vue";
import Setting from "@/components/Setting.vue";
// 第三方工具库
import _ from "lodash";

// 全局
const modulesList = ref([
  {
    name: "desktop",
    icon: "desktop",
    title: "桌面",
    component: Desktop,
    active: true,
  },
  {
    name: "steam",
    icon: "steam",
    title: "Steam",
    component: Steam,
    active: true,
  },
  // {
  //   name: "browser",
  //   icon: "chrome",
  //   title: "浏览器",
  //   component: Browser,
  //   active: true,
  // },
]);
provide("modulesList", modulesList); // 模块

const currentModule = ref("desktop"); // 模块切换
provide("currentModule", currentModule); // 模块切换

const curMouduleComponent = computed(() => {
  return _.find(modulesList.value, { name: currentModule.value }).component;
}); // 当前模块组件

const isShowSetting = ref(false); // 设置
provide("isShowSetting", isShowSetting); // 设置 仅限 ContextMenu 使用

// 获取桌面图标，分页
onBeforeMount(() => {});
</script>
<style scoped></style>
