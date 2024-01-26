<template>
  <div id="desktop" class="relative w-screen h-screen bg-transparent">
    <!-- 页面 -->
    <div id="view" class="w-screen h-screen overflow-hidden flex flex-col">
      <div id="pages" class="h-full w-fit flex flex-row items-center">
        <Page
          v-for="(page, index) in pagedIcons"
          :id="'page-' + index"
          :key="index"
          :pagedIcons="pagedIcons"
          :pageIndex="index"
          :currentPage="currentPage"
          @setCurrentPage="setCurrentPage"
          :isDragging="isDragging"
          @setIsDragging="setIsDragging"
          :isOnQuickSearchMode="isOnQuickSearchMode"
          :moveToPage="moveToPage"
          :updateSortInfo="updateSortInfo"
        />
      </div>
    </div>
    <!-- 侧边栏-->
    <Sidebar
      :isShowSidebar="isShowSidebar"
      :setDesktopAppearance="setDesktopAppearance"
      :setDesktopFunction="setDesktopFunction"
      :addPath="addPath"
      :removePath="removePath"
      :activePath="activePath"
      :inactivePath="inactivePath"
    />
    <!-- 右键菜单 -->
    <ContextMenu
      :isShowContextMenu="isShowContextMenu"
      @showContextMenu="showContextMenu"
      :isShowSidebar="isShowSidebar"
      @showSidebar="showSidebar"
      :currentPage="currentPage"
      :moveToPage="moveToPage"
    />
    <!-- 页面指示器 -->
    <PageIndicator
      :currentPage="currentPage"
      :pagedIcons="pagedIcons"
      :moveToPage="moveToPage"
    />
    <!-- 左右检测区域 -->
    <SideArea />
    <!-- 快速搜索 -->
    <QuickSearch
      :pagedIcons="pagedIcons"
      :currentPage="currentPage"
      :moveToPage="moveToPage"
      :isOnQuickSearchMode="isOnQuickSearchMode"
      @setIsOnQuickSearchMode="setIsOnQuickSearchMode"
    />
  </div>
</template>

<script setup>
import { inject, ref, onBeforeMount } from "vue";
// 组件
import Page from "@/modules/desktop/widgets/Page.vue";
import PageIndicator from "@/modules/desktop/widgets/PageIndicator.vue";
import SideArea from "@/modules/desktop/widgets/SideArea.vue";
import QuickSearch from "@/modules/desktop/widgets/QuickSearch.vue";
import Sidebar from "@/modules/desktop/sidebar/Sidebar.vue";
import ContextMenu from "@/modules/desktop/contextmenu/ContextMenu.vue";
// 组合式函数
import { useWheelToPage } from "@/modules/desktop/composables/wheelToPage.js";
import { useMoveToPage } from "@/modules/desktop/composables/moveToPage.js";
import { watchDeep } from "@vueuse/core";
// 参数：pagedIcons, setDesktopSortInfo
import { useUpdateSortInfo } from "@/modules/desktop/composables/updateSortInfo.js";
// 工具
import {
  getDesktopAppearance,
  getDesktopLayout,
} from "@/functions/desktop/desktopAppearance";
import { getDesktopFunction } from "@/functions/desktop/desktopFunction";
import { getDesktopSortInfo } from "@/functions/desktop/desktopSortInfo";
// 更新排序
import { handleRawIcons } from "@/functions/desktop/handleRawIcons";
// showToast
import showToast from "@/components/toast/index";

// 来自 App.vue
const currentModule = inject("currentModule");
const icons = ref({});
const pagedIcons = ref([]);

onBeforeMount(() => {
  init();
});

async function init() {
  const allIcons = await loadAllIcons();
  icons.value = allIcons;
  console.log(
    "%c [ 初始化 所有图标 ]-93",
    "font-size:13px;  background:green; color:white;",
    icons.value
  );
  const paged = paginateIcons(allIcons);
  pagedIcons.value = paged;
  console.log(
    "%c [ 初始化 分页图标 ]-113",
    "font-size:13px; background:green; color:white;",
    pagedIcons.value
  );
}

// 所有路径的图标
// 分页用于展示的图标
function paginateIcons(icons) {
  // 获取本地 iconPaths
  const iconPaths = getDesktopFunction().iconPaths;
  // 获取页面容量
  const pageSize = getDesktopLayout().pageSize;
  let _icons = { ...icons };
  let _pages = [];
  let _page = [];
  iconPaths.forEach((path) => {
    const pathId = path.id;
    const _pageIcons = [..._icons[pathId]];
    // 如果路径未激活，则跳过
    if (!path.active) return;
    for (let i = 0; i < _pageIcons.length; i++) {
      if (_page.length < pageSize) {
        _page.push(_pageIcons[i]);
      } else {
        _pages.push(_page);
        _page = [];
        _page.push(_pageIcons[i]);
      }
    }
  });
  _pages.push(_page);
  return _pages;
}

async function loadAllIcons() {
  return new Promise(async (resolve, reject) => {
    const icons = {};
    const iconPaths = getDesktopFunction().iconPaths;
    for (let i = 0; i < iconPaths.length; i++) {
      const path = iconPaths[i];
      const handledIcons = await loadIcons(path);
      icons[path.id] = handledIcons;
    }
    resolve(icons);
  });
}

async function loadIcons(path) {
  const rawIcons = await window.getIconsByPath(path);
  const handledIcons = handleRawIcons(rawIcons);
  return handledIcons;
}

// 添加路径
async function addPath(path) {
  // 将该路径下的图标添加到 icons 中
  const handledIcons = await loadIcons(path);
  icons.value[path.id] = handledIcons;
  console.log(
    "%c [ 添加新路径 ]-157",
    "font-size:13px; background:pink; color:#bf2c9f;",
    icons.value
  );
}

// 删除路径
function removePath(path) {
  // 如果只有一页，则不删除
  if (pagedIcons.value.length === 1) {
    showToast("至少保留一个路径");
    return;
  }
  // 将该路径下的图标从 icons 中删除
  delete icons.value[path.id];
  console.log(
    "%c [ 删除路径 ]-163",
    "font-size:13px; background:pink; color:#bf2c9f;",
    icons.value
  );
}

// 启用路径
async function activePath(path) {
  // 将该路径下的图标添加到 pagedicons中
  const handledIcons = await loadIcons(path);
  const pageSize = getDesktopLayout().pageSize;
  const _handledIcons = [...handledIcons];
  _handledIcons.forEach((icon) => {
    let currentPage = pagedIcons.value.length - 1;
    if (pagedIcons.value[currentPage].length < pageSize) {
      pagedIcons.value[currentPage].push(icon);
    } else {
      pagedIcons.value.push([]);
      currentPage++;
      pagedIcons.value[currentPage].push(icon);
      moveToPage({ pageIndex: currentPage });
    }
  });

  console.log(
    "%c [ 启用路径 ]-157",
    "font-size:13px; background:pink; color:#bf2c9f;",
    pagedIcons.value
  );
}

// 不启用路径
function inactivePath(path) {

  const remveId = path.id;
  // 将该路径下的图标从 pagedicons中删除
  const newpagedIcons = pagedIcons.value.map((page) => {
    return page.filter((icon) => {
      return icon.fromPathId !== remveId;
    });
  });
  pagedIcons.value = newpagedIcons;
  // 如果有空页面，则删除
  pagedIcons.value = pagedIcons.value.filter((page) => {
    return page.length > 0;
  });
  // 如果当前页是最后一页，则切换至前一页
  if (currentPage.value === pagedIcons.value.length) {
    moveToPage({ pageIndex: currentPage.value - 1, transition: true });
  }
  console.log(
    "%c [ 不启用路径 ]-157",
    "font-size:13px; background:pink; color:#bf2c9f;",
    pagedIcons.value
  );
}

// 桌面外观
function setDesktopAppearance(updateObj) {
  const newDesktopAppearance = {
    ...getDesktopAppearance(),
    ...updateObj,
  };
  utools.dbStorage.setItem(
    "desktopAppearance",
    JSON.parse(JSON.stringify(newDesktopAppearance))
  );
  console.log(
    "%c [ 桌面外观设置更新, 已保存至本地 ]-166",
    "font-size:13px; background:blue; color:white;",
    getDesktopAppearance()
  );
}

// 桌面功能
function setDesktopFunction(updateObj) {
  const newDesktopFunction = {
    ...getDesktopFunction(),
    ...updateObj,
  };
  utools.dbStorage.setItem(
    "desktopFunction",
    JSON.parse(JSON.stringify(newDesktopFunction))
  );
  console.log(
    "%c [ 桌面功能设置更新, 已保存至本地 ]-173",
    "font-size:13px; background:blue; color:white;",
    getDesktopFunction()
  );
}

// 桌面排序信息
const desktopSortInfo = ref(getDesktopSortInfo());
watchDeep(desktopSortInfo, (newVal) => {
  utools.dbStorage.setItem(
    "desktopSortInfo",
    JSON.parse(JSON.stringify(newVal))
  );
});
function setDesktopSortInfo(newVal) {
  desktopSortInfo.value = newVal;
}
// 更新排序信息
const { updateSortInfo } = useUpdateSortInfo(pagedIcons, setDesktopSortInfo);
// 当前页
const currentPage = ref(0); // 当前页 emit: setCurrentPage
function setCurrentPage(value) {
  currentPage.value = value;
}

// 翻页功能
const { moveToPage } = useMoveToPage(pagedIcons, setCurrentPage);
useWheelToPage(currentModule, pagedIcons, currentPage, moveToPage); // 滚轮翻页

// 右键菜单显隐
const isShowContextMenu = ref(false); // 右键菜单 emit: showContextMenu
function showContextMenu(value) {
  isShowContextMenu.value = value;
}

// 侧边栏显隐
const isShowSidebar = ref(false); // 侧边栏 emit: showSidebar
function showSidebar(value) {
  isShowSidebar.value = value;
}

// 是否处于拖拽状态
const isDragging = ref(false); // 用于控制拖拽时的样式（背景） emit: setIsDragging
function setIsDragging(value) {
  isDragging.value = value;
}

// 是否处于快速搜索模式
const isOnQuickSearchMode = ref(false); // 搜索模式 emit: setIsOnQuickSearchMode
function setIsOnQuickSearchMode(value) {
  isOnQuickSearchMode.value = value;
}
</script>
<style scoped></style>
