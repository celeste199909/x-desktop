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
          :desktopFunction="desktopFunction"
          :isOnQuickSearchMode="isOnQuickSearchMode"
          :moveToPage="moveToPage"
          :updateSortInfo="updateSortInfo"
        />
      </div>
    </div>
    <!-- 侧边栏-->
    <Sidebar
      :isShowSidebar="isShowSidebar"
      :desktopAppearance="desktopAppearance"
      :setDesktopAppearance="setDesktopAppearance"
      :desktopFunction="desktopFunction"
      :setDesktopFunction="setDesktopFunction"
      :initDesktop="initDesktop"
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
import {
  inject,
  onMounted,
  ref,
  provide,
  defineProps,
  computed,
  defineEmits,
} from "vue";
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
import {  useUpdateSortInfo } from "@/modules/desktop/composables/updateSortInfo.js";
// 工具
import { getDesktopAppearance } from "@/functions/desktop/desktopAppearance";
import { getDesktopFunction } from "@/functions/desktop/desktopFunction";
import { getDesktopSortInfo } from "@/functions/desktop/desktopSortInfo";
// 分页
import { paginateArray } from "@/functions/desktop/paginateArray";
// 更新排序


const props = defineProps({
  // 处理过, 未经分页的图标
  desktopIcons: {
    type: Array,
    required: true,
  },
  // 重新加载图标
  initDesktop: {
    type: Function,
    required: true,
  },
});

// 来自 App.vue
const currentModule = inject("currentModule");

// 未经分页的图标，包括所有路径（不论是否启用）下的图标, 
// const wholeDesktopIcons = computed(()=> props.desktopIcons);  
const pagedIcons = ref([]); // 分页后的图标
const computedPageIcons = computed(() => paginateArray(props.desktopIcons));
watchDeep(computedPageIcons, (newVal) => {
  pagedIcons.value = computedPageIcons.value;
  // 分页完成时更新排序信息
  updateSortInfo();
});

// 桌面外观
const desktopAppearance = ref(getDesktopAppearance());
function setDesktopAppearance(newVal) {
  desktopAppearance.value = newVal;
}
watchDeep(desktopAppearance, (newVal) => {
  utools.dbStorage.setItem(
    "desktopAppearance",
    JSON.parse(JSON.stringify(newVal))
  );
});

// 桌面功能
const desktopFunction = ref(getDesktopFunction());
watchDeep(desktopFunction, (newVal) => {
  utools.dbStorage.setItem(
    "desktopFunction",
    JSON.parse(JSON.stringify(newVal))
  );
});
function setDesktopFunction(newVal) {
  desktopFunction.value = newVal;
}
watchDeep(desktopFunction.value.iconPaths, (newVal) => {
  props.initDesktop();
});

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
