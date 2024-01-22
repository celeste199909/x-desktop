<template>
  <!-- desktop -->
  <Desktop v-if="currentModule === 'desktop'" />
  <!-- steam -->
  <Steam v-if="currentModule === 'steam'" />
  <!-- 浏览器 -->
  <Browser v-if="currentModule === 'browser'" />
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
// 工具
import { handleRawIcons } from "@/functions/desktop/handleRawIcons";
import { paginateArray } from "@/functions/desktop/paginateArray";

// 获取数据


// 第三方工具库
import _ from "lodash";

// 全局
const currentModule = ref("desktop"); // 模块切换
// 桌面模块
const pages = ref([]); // 分页数据
// steam 模块
const steamApps = ref([]); // steam 应用

// 全局
provide("currentModule", currentModule); // 模块切换
// 桌面模块
provide("pages", pages);
provide("initDesktop", initDesktop);
// steam 模块
provide("steamApps", steamApps);

// 获取桌面图标，分页
onBeforeMount(() => {
  initDesktop();
  initSteam();
  initBrowser();
});

function initDesktop() {
  // 获取原始图标数据，并处理成需要的格式
  window.getDesktopIcons(function (rawIcons) {
    const handleIcons = handleRawIcons(rawIcons); // 处理图标
    pages.value = paginateArray(handleIcons); // 分页
    console.log("initDesktop pages", pages.value);
  });
}

function initSteam() {
  // 获取 steam 应用数据
  window.getSteamApps(function (apps) {
    steamApps.value = apps;
    console.log("initSteam steamApps", steamApps.value);
  });
}

function initBrowser() {
  // 获取 chrome 书签数据
  window.getChromeBookmarks(function (bookmarks) {
    console.log("initBrowser bookmarks", bookmarks);
  });
}
</script>
<style scoped></style>
