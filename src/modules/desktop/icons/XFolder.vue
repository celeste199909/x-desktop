<template>
  <div
    class="xfolder flex flex-col items-center justify-center overflow-hidden"
    :class="[
      isOnQuickSearchMode
        ? xfolder.isSearchTarget
          ? 'is-search-target'
          : 'not-search-target'
        : '',
      isOnQuickSearchMode ? (xfolder.isSelected ? 'is-selected' : '') : '',
    ]"
    :style="{
      width: layout.cellLength + 'px',
      height: layout.cellLength + 'px',
    }"
    @click="expandFolder"
  >
    <div class="xfolder-wrapper border border-slate-500">
      <template v-for="item in xfolder.icons" :key="item.id">
        <img class="p-1" :src="item.iconImage" />
      </template>
    </div>
    <div class="xfolder-name">{{ xfolder.name }}</div>
  </div>
  <!-- 展开的 xfolder -->
  <Teleport to="body" :disabled="isContract">
    <Transition>
      <div
        @click.self="contractXFolder"
        v-show="!isContract"
        class="expand-xfolder w-screen h-screen bg-black/0 fixed top-0 left-0 flex justify-center items-center z-[300]"
      >
        <VueDraggable
          class="rounded-xl p-4 border border-slate-500 bg-black/20 overflow-y-scroll overflow-x-hidden"
          :animation="150"
          ghostClass="ghost"
          v-model="xfolder.icons"
          :style="gridStyle"
          @end="onEnd"
        >
          <div cl v-for="item in xfolder.icons" :key="item.id" class="icon">
            <Application
              :icon="item"
              :isOnQuickSearchMode="isOnQuickSearchMode"
            />
          </div>
        </VueDraggable>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { defineProps, ref, inject, computed } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import Application from "./Application.vue";
import { getDesktopLayout } from "@/functions/desktop/desktopAppearance";

const props = defineProps({
  xfolder: {
    type: Object,
    required: true,
  },
  isOnQuickSearchMode: {
    type: Boolean,
    default: false,
  },
  saveNowSortInfo: {
    type: Function,
    required: true,
  },
});

const isContract = ref(true);
const layout = ref(getDesktopLayout());
const isExpandXFolder = inject("isExpandXFolder");

// app容器 grid 布局
const gridStyle = ref({
  width: layout.value.minWidth + "px",
  height: layout.value.minHeight + "px",
  display: "grid",
  gridTemplateColumns: `repeat(${layout.value.column}, 1fr)`,
  gridTemplateRows: `repeat(${layout.value.row}, 1fr)`,
  gap: `${layout.value.gapY}px ${layout.value.gapX}px`,
});

function expandFolder() {
  isContract.value = false;
  isExpandXFolder.value = true;
}

function contractXFolder() {
  isContract.value = true;
  isExpandXFolder.value = false;
}

function onEnd() {
  props.saveNowSortInfo();
}
</script>
<style scoped>
/* 定义滚动条的样式 */

.xfolder {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  border: 2px solid #00000000;
  transition: all 0.3s;
  padding: 10px;
}
.xfolder.sortable-ghost {
  opacity: 0;
}

.xfolder .xfolder-wrapper {
  width: 50%;
  height: 50%;
  margin: 10px;
  padding: 2px;
  border-radius: 10px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px 2px;
}

.xfolder .xfolder-name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1rem;
}
.icon.ghost {
  opacity: 0;
}

/* 搜索和选择 */
.xfolder.is-search-target {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  border: 2px solid #eeeeee86;
  backdrop-filter: blur(10px);
}
.xfolder.is-search-target.is-selected {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  border: 2px solid rgb(39, 140, 255);
  backdrop-filter: blur(10px);
}
.xfolder.not-search-target {
  opacity: 0.6;
}


.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
</style>
