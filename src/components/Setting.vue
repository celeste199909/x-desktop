<template>
  <div
    id="setting"
    @click.self="isShowSetting = false"
    class="fixed top-0 left-0 w-screen h-screen bg-slate-900/20 flex justify-center items-center z-[500]"
  >
    <div
      class="inner p-10 w-9/12 h-3/4 select-none overflow-hidden flex flex-col transition-all text-gray-700 bg-slate-100/90 border-2 dark:border-slate-600 dark:text-slate-100 dark:bg-slate-900/90 bottom-0 m-4 backdrop-blur-sm rounded-xl z-100"
    >
      <div class="mb-4 font-bold">启用模块</div>
      <div class="flex flex-row justify-start items-start flex-wrap gap-6">
        <div
          v-for="item in modulesList"
          :key="item.name"
          class="rounded-xl bg-slate-950 hover:bg-slate-700 border-2 dark:hover:bg-slate-700 p-6 flex flex-col justify-center items-center gap-4 text-slate-100 dark:bg-slate-800 dark:text-slate-2 transition-all duration-300 cursor-pointer"
          :style="{border: item.active ? '2px solid #3b82f6' : '2px solid transparent'}"
          @click="toggleModuleActive(item.name)"
        >
          <!-- 图标和名字 -->
          <div class="w-24 h-24 p-3 flex flex-col justify-center items-center gap-2">
            <img
              :src="getAssetsIcon(item.icon)"
              class="w-10 h-10 opacity-50 hover:opacity-100 transition-all duration-300"
            />
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import showToast from "@/components/toast/index";

const isShowSetting = inject("isShowSetting");
const modulesList = inject("modulesList");
const currentModule = inject("currentModule");

function toggleModuleActive(muduleName) {
  // 桌面模块不能禁用
  if (muduleName === "desktop") {
    showToast("桌面模块不能禁用");
    return;
  }
  // 判断当前模块是否为启用状态
  const isActive = modulesList.value.find(
    (item) => item.name === muduleName
  ).active;
  // 是否是当前模块
  const isCurrentModule = currentModule.value.name === muduleName;
  // 当前为启用状态，点击后变为禁用状态
  if (isActive) {
    // 如果启用的模块只有一个，那么不能禁用
    if (modulesList.value.filter((item) => item.active).length === 1) {
      showToast("至少启用一个模块");
      return;
    }
    modulesList.value.forEach((item) => {
      if (item.name === muduleName) {
        item.active = false;
        showToast(`已禁用 ${item.title} 模块`);
      }
    });
    // 如果禁用的模块是当前模块，那么切换到桌面模块
    if (isCurrentModule) {
      currentModule.value = "desktop";
    }
  } else {
    // 当前为禁用状态，点击后变为启用状态
    modulesList.value.forEach((item) => {
      if (item.name === muduleName) {
        item.active = true;
        showToast(`已启用 ${item.title} 模块`);
      }
    });
  }
}

const getAssetsIcon = (name) => {
  return new URL(`/src/assets/icons/${name}`, import.meta.url).href;
};
</script>
<style scoped></style>
