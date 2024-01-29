<template>
  <div
    class="xfolder flex flex-col items-center justify-center overflow-hidden"
    :style="{
      width: layout.cellLength + 'px',
      height: layout.cellLength + 'px',
    }"
    @click="expandFolder"
  >
    <div class="xfolder-wrapper">
      <template v-for="item in xfolder.icons" :key="item.id">
        <img :src="item.iconImage" />
      </template>
    </div>
    <div class="xfolder-name">{{ xfolder.name }}</div>
  </div>
  <!-- 展开的 xfolder -->
  <Teleport to="body" :disabled="isContract">
    <div
      @click.self="contractXFolder"
      v-show="!isContract"
      class="expand-xfolder w-screen h-screen bg-black/0 fixed top-0 left-0 flex justify-center items-center z-[300]"
    >
      <VueDraggable
        class="rounded-xl p-4 border border-slate-700 bg-black/20"
        :animation="150"
        ghostClass="ghost"
        v-model="xfolder.icons"
        :style="gridStyle"
      >
        <div cl v-for="item in xfolder.icons" :key="item.id" class="icon">
          <Application
            :icon="item"
            :isOnQuickSearchMode="isOnQuickSearchMode"
          />
        </div>
      </VueDraggable>
    </div>
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
});

const isContract = ref(true);
const layout = ref(getDesktopLayout());
const isExpandXFolder = inject("isExpandXFolder");

// app容器 grid 布局
const gridStyle = ref({
  minWidth: layout.value.minWidth + "px",
  minHeight: layout.value.minHeight + "px",
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
</script>
<style scoped>
.xfolder {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  border: 3px solid #00000000;
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
  border: 1px solid #eeeeee;
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
</style>
