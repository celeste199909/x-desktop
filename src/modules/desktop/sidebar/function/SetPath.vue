<template>
  <div class="item w-full my-4">
    <div class="flex flex-row justify-start items-center gap-x-3">
      <div class="font-bold">自定义路径</div>
      <div class="text-blue-500 cursor-pointer" @click="handleAddPath">
        添加
      </div>
    </div>
    <div class="mt-1 mb-4 text-[13px]">启用的路径包含的图标会显示在桌面上</div>
    <!-- 路径卡片 -->
    <VueDraggable
      v-model="iconPaths"
      ghostClass="ghost"
      class="flex flex-col justify-start items-center gap-y-4"
    >
      <div
        v-for="item in iconPaths"
        :key="item.id"
        class="path-card w-full transition-all h-20 flex flex-row gap-x-2 py-4 px-5 justify-between items-center rounded-2xl border-[3px] hover:border-blue-500"
        :class="item.active ? 'border-blue-500' : 'border-slate-400'"
      >
        <!-- 名字和路径 -->
        <div class="flex flex-1 flex-col gap-y-1">
          <!-- 名字 -->
          <div class="font-bold" :class="[{ 'text-blue-500': item.active }]">
            {{ item.name }}
          </div>
          <!-- 路径 -->
          <div
            class="text-[12px] text-slate-500 hover:text-blue-500 hover:underline cursor-pointer line-clamp-1"
            ::class="[{ 'text-blue-500': item.active }]"
            @click="openFolder(item.path)"
          >
            {{ item.path }}
          </div>
        </div>
        <!-- 图标数量 和 删除 -->
        <div class="flex w-16 flex-col justify-center items-center gap-y-1">
          <div
            class="text-blue-500 hover:font-bold hover:underline cursor-pointer"
            @click="toggleActive(item.id)"
          >
            {{ item.active ? "不启用" : "启用" }}
          </div>
          <div
            v-if="item.id !== 'desktop'"
            class="w-8 h-8 flex justify-center items-center text-red-400 hover:text-red-500 hover:font-bold cursor-pointer"
            @click="removePath(item.id)"
          >
            删除
          </div>
        </div>
      </div>
    </VueDraggable>
    <!-- 添加路径卡片 -->
    <div
      class="h-16 my-4 flex flex-row gap-x-2 py-4 px-5 justify-center items-center rounded-2xl bg-slate-300/80 hover:bg-slate-400/95 cursor-pointer transition-all"
      @click="handleAddPath"
    >
      <div class="text-2xl">+</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { onMounted, defineProps, inject } from "vue";
import _ from "lodash";
import showToast from "@/components/toast/index";
import { nanoid } from "nanoid";
import { VueDraggable } from "vue-draggable-plus";
import { watchDeep } from "@vueuse/core";

const props = defineProps({
  desktopFunction: {
    type: Object,
    required: true,
  },
});

// iconPaths: [{ name: "桌面", path: getUserDesktopPath(), active: true,} ...]
const iconPaths = ref(props.desktopFunction.iconPaths);
const setDesktopFunction = inject("setDesktopFunction");

watchDeep(iconPaths, (newVal) => {
  setDesktopFunction({
    ...props.desktopFunction,
    iconPaths: newVal,
  });
});

// 添加路径
function handleAddPath() {
  const paths = utools.showOpenDialog({
    properties: ["openDirectory"],
    defaultPath: utools.getPath("desktop"),
  });

  if (!paths) return;

  const newPath = paths[0];
  const isExist = _.find(iconPaths.value, { path: newPath });

  if (isExist) {
    showToast("路径已存在");
    return;
  }

  iconPaths.value.push({
    id: nanoid(),
    name: _.last(newPath.split("\\")),
    path: newPath,
    active: false,
  });
}
// 删除路径
function removePath(id) {
  _.remove(iconPaths.value, { id });
}
// 切换启用状态
function toggleActive(id) {
  const index = _.findIndex(iconPaths.value, { id });
  iconPaths.value[index].active = !iconPaths.value[index].active;
}
// 打开文件夹
function openFolder(path) {
  utools.shellOpenPath(path);
  window.hideDesk();
}
</script>
<style scoped>
.path-card.ghost {
  opacity: 0;
}
.path-card.sortable-fallback {
  opacity: 1;
}
</style>
