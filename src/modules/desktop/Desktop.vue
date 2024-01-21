<template>
  <div id="desktop" class="relative w-screen h-screen bg-transparent">
    <!-- 页面 -->
    <div id="view" class="w-screen h-screen overflow-hidden flex flex-col">
      <div id="pages" class="h-full w-fit flex flex-row items-center">
        <Page
          v-for="(page, index) in pages"
          :id="'page-' + index"
          :key="index"
          :pageIndex="index"
          :currentPage="currentPage"
          @setCurrentPage="setCurrentPage"
          :isDragging="isDragging"
          @setIsDragging="setIsDragging"
        />
      </div>
    </div>
    <!-- 侧边栏-->
    <Sidebar
      :isShowSidebar="isShowSidebar"
    />
    <!-- 右键菜单 -->
    <ContextMenu
      :isShowContextMenu="isShowContextMenu"
      @showContextMenu="showContextMenu"
      :isShowSidebar="isShowSidebar"
      @showSidebar="showSidebar"
      :currentPage="currentPage"
    />
    <!-- 页面指示器 -->
    <PageIndicator :currentPage="currentPage"/>
    <!-- 左右检测区域 -->
    <SideArea />
    <!-- 快速搜索 -->
    <QuickSearch :currentPage="currentPage"/>
  </div>
</template>

<script setup>
import { inject, onMounted,ref, provide } from "vue";
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

// 来自 App.vue
const pages = inject("pages");
const currentModule = inject("currentModule");

const isShowContextMenu = ref(false);
const isShowSidebar = ref(false);
const currentPage = ref(0);
const isDragging = ref(false); // 用于控制拖拽时的样式（背景）
const isOnQuickSearchMode = ref(false); // 搜索模式
provide("isOnQuickSearchMode", isOnQuickSearchMode);

const { moveToPage } = useMoveToPage(pages, setCurrentPage);
provide("moveToPage", moveToPage);
useWheelToPage(currentModule, pages, currentPage, moveToPage); // 滚轮翻页


// 供子组件更新的方法
// 更新右键菜单显示状态
/**
 * @param {boolean} value - 新的显示状态
 *
 */
function showContextMenu(value) {
  isShowContextMenu.value = value;
}
// 更新侧边栏显示状态
/**
 * @param {boolean} value - 新的显示状态
 *
 */
function showSidebar(value) {
  isShowSidebar.value = value;
}
// 更新当前页面
/**
 * @param {number} value - 新的页面索引
 *
 */
function setCurrentPage(value) {
  currentPage.value = value;
}
// 更新拖拽状态
/**
 * @param {boolean} value - 新的拖拽状态
 *
 */
function setIsDragging(value) {
  isDragging.value = value;
}
</script>
<style scoped></style>
