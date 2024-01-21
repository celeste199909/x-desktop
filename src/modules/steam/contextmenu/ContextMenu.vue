<template>
  <div
    id="context-menu"
    v-show="isShowContextMenu"
    :style="{
      left: contextMenuPosition.x + 'px',
      top: contextMenuPosition.y + 'px',
    }"
    class="context-menu select-none px-2 py-3 rounded-lg backdrop-blur-sm bg-slate-200/90 dark:bg-slate-900/90 fixed w-40 z-50"
  >
    <DesktopContext
      v-if="currentModule === 'desktop'"
      :clickTarget="clickTarget"
      class=""
    />
    <SteamContext v-if="currentModule === 'steam'" :clickTarget="clickTarget" />
    <!-- 分隔线 -->
    <div class="my-1 w-full h-[1px] bg-slate-500/50"></div>
    <!-- 全局设置 -->
    <template v-for="item in menuOptions" :key="item.name">
      <div
        class="flex justify-start items-center text-slate-900 hover:bg-slate-400/70 dark:text-slate-200 dark:hover:bg-slate-600 px-4 py-2 rounded-lg cursor-pointer"
        @click.left="item.handler($event)"
      >
        {{ item.name }}
      </div>
    </template>
  </div>
</template>
<script setup>
import { inject, ref } from "vue";
import DesktopContext from "./desktop/DesktopContext.vue";
import SteamContext from "./steam/SteamContext.vue";

const currentModule = inject("currentModule");

// 右键菜单
const contextMenuPosition = ref({ x: 0, y: 0 });
// 当前页面
const init = inject("init");
// 点击的目标
const clickTarget = ref(null);

const menuOptions = ref([
  {
    name: "全局设置",
    handler: () => {},
  },
  {
    name: "刷新",
    handler: handleClickRefresh,
  },
]);

// 刷新
function handleClickRefresh() {
  console.log("刷新");
  init();
}

// 监听鼠标右键
window.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  clickTarget.value = event.target;
  contextMenuPosition.value.x = event.clientX;
  contextMenuPosition.value.y = event.clientY;
  isShowContextMenu.value = true;
});

// 监听点击空白处 隐藏右键菜单 和 设置窗口
window.addEventListener("click", (e) => {
  e.preventDefault();
  isShowContextMenu.value = false; // 隐藏右键菜单
  clickTarget.value = null; // 清除上次点击的目标
  // // 如果设置窗口打开，点击的不是设置窗口，关闭设置窗口
  if (
    isShowSidebar.value &&
    !e.path.includes(document.querySelector("#sidebar"))
  ) {
    isShowSidebar.value = false;
  }
});
</script>
<style scoped></style>
