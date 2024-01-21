<template>
  <div
    id="sidebar"
    :style="{
      transform: isShowSidebar ? 'translateX(0)' : 'translateX(-110%)',
    }"
    class="sidebar select-none overflow-y-scroll z-[200] transition-all w-96 p-3 text-gray-700 bg-slate-100/90 border-2 dark:border-slate-600 dark:text-slate-100 dark:bg-slate-900/90 absolute left-0 top-0 bottom-0 m-4 backdrop-blur-sm rounded-xl"
  >
    <!-- 选项卡 -->
    <div class="h-12 my-2 flex flex-row">
      <div
        v-for="(item, index) in tabs"
        :key="index"
        @click="curTabIndex = index"
        :class="[index === curTabIndex ? 'active' : '']"
        class="tab flex justify-center items-center"
      >
        {{ item }}
      </div>
    </div>
    <!-- 内容 -->
    <div class="overflow-y-scroll">
      <div
        v-for="(com, index) in content[curTabIndex]"
        :key="index"
        class="appearance flex flex-col items-center p-2"
      >
        <div class="item w-full my-4">
          <component :is="com"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, defineProps } from "vue";
// 外观
import Theme from "./Theme.vue";
import BgColor from "./BgColor.vue";
import BgImage from "./BgImage.vue";
import BgOpacity from "./BgOpacity.vue";
// 功能
import HideShortcutKey from "./HideShortcutKey.vue";
import SetPath from "./SetPath.vue";
// 帮助
import Help from "./Help.vue";

const utools = inject("utools");
const props = defineProps({
  isShowSidebar: {
    type: Boolean,
    default: false,
  },
});

// 标签页
const tabs = ref(["外观", "功能", "帮助"]);
const curTabIndex = ref(0);
// 内容
const content = ref([
  [Theme, BgColor, BgImage, BgOpacity],
  [SetPath, HideShortcutKey],
  [Help],
]);

// function handleClickClearSetting() {
//   utools.dbStorage.removeItem("setting");
//   init();
// }
</script>
<style scoped>
.tab {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  color: #6d6d6d;
  font-size: 16px;
}
.tab:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.tab.active {
  font-size: 20px;
  color: rgb(47, 92, 255);
}
</style>
