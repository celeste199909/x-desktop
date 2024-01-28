<template>
  <!-- desktop -->
  <KeepAlive>
    <Desktop v-if="currentModule === 'desktop'" />
    <!-- steam -->
    <Steam v-else-if="currentModule === 'steam'"/>
    <!-- 浏览器 -->
    <Browser v-else-if="currentModule === 'browser'" />
  </KeepAlive>
  <!-- 模块栏 -->
  <ModuleBar />
  <!-- 右键菜单 -->
  <ContextMenu />
</template>

<script setup>
import { onBeforeMount, ref, provide } from "vue";
// 模块
import Desktop from "@/modules/desktop/Desktop.vue";
import Steam from "@/modules/steam/Steam.vue";
import Browser from "@/modules/browser/Browser.vue";
// // 部件
import ModuleBar from "@/components/ModuleBar.vue";
// 第三方工具库
import _ from "lodash";

// 全局
const currentModule = ref("desktop"); // 模块切换
provide("currentModule", currentModule); // 模块切换

// 获取桌面图标，分页
onBeforeMount(() => {
  initBrowser();
});



// 获取 chrome 书签数据
function initBrowser() {
  window.getChromeBookmarks(function (bookmarks) {
  });
}
</script>
<style scoped></style>
