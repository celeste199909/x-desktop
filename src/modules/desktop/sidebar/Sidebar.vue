<template>
  <div
    id="sidebar"
    :style="{
      transform: isShowSidebar ? 'translateX(0)' : 'translateX(-110%)',
    }"
    class="sidebar select-none overflow-hidden flex flex-col z-[200] transition-all w-96 p-3 text-gray-700 bg-slate-100/90 border-2 dark:border-slate-600 dark:text-slate-100 dark:bg-slate-900/90 absolute left-0 top-0 bottom-0 m-4 backdrop-blur-sm rounded-xl"
  >
    <!-- 选项卡 -->
    <div class="h-12 my-2 flex flex-row">
      <div
        v-for="(item, index) in tabs"
        :key="index"
        @click="curTabIndex = index"
        :class="[index === curTabIndex ? 'active' : '']"
        class="tab flex justify-center items-center "
      >
        {{ item }}
      </div>
    </div>
    <!-- 内容 -->
    <div class="overflow-y-scroll flex-1">
      <!-- 外观 -->
      <div
        v-show="curTabIndex === 0"
        class="appearance flex flex-col items-center p-2"
      >
        <template v-for="(com, index) in content[0]" :key="index">
          <component
            :is="com"
            :desktopAppearance="desktopAppearance"
          ></component>
        </template>
      </div>
      <!-- 功能 -->
      <div
        v-show="curTabIndex === 1"
        class="appearance flex flex-col items-center p-2"
      >
        <template v-for="(com, index) in content[1]" :key="index">
          <component :is="com" :desktopFunction="desktopFunction"></component>
        </template>
      </div>
      <!-- 帮助 -->
      <div
        v-show="curTabIndex === 2"
        class="appearance flex flex-col items-center p-2"
      >
        <template v-for="(com, index) in content[2]" :key="index">
          <component :is="com"></component>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, defineProps } from "vue";
// 外观
import Theme from "./appearance/Theme.vue";
import BgColor from "./appearance/BgColor.vue";
import BgImage from "./appearance/BgImage.vue";
import BgOpacity from "./appearance/BgOpacity.vue";
import ResetAppearance from "./appearance/ResetAppearance.vue";
// 功能
import HideShortcutKey from "./function/HideShortcutKey.vue";
import SetPath from "./function/SetPath.vue";
// 帮助
import Help from "./help/Help.vue";

const utools = inject("utools");
const props = defineProps({
  isShowSidebar: {
    type: Boolean,
    default: false,
  },
  desktopAppearance: {
    type: Object,
    default: () => ({}),
  },
  desktopFunction: {
    type: Object,
    default: () => ({}),
  },
});

// 标签页
const tabs = ref(["外观", "功能", "帮助"]);
const curTabIndex = ref(0);
// 内容
const content = ref([
  [Theme, BgColor, BgImage, BgOpacity, ResetAppearance],
  [SetPath, HideShortcutKey],
  [Help],
]);

// function handleClickClearSetting() {
//   utools.dbStorage.removeItem("setting");
//   init();
// initDesktop();
// }
</script>
<style scoped>
.tab {
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  color: #6d6d6d;
  font-size: 16px;
  border-bottom: 3px solid transparent;
}
.dark .tab {
  color: rgb(199, 195, 195);
}
.tab:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.tab.active {
  font-size: 20px;
  color: rgb(51, 136, 255);
  border-bottom: 3px solid rgb(51, 136, 255);
}


</style>
