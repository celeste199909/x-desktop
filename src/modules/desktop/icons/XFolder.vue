<template>
  <div
    class="xfolder flex flex-col items-center justify-center overflow-hidden"
    :style="{
      width: layout.cellLength + 'px',
      height: layout.cellLength + 'px',
    }"
  >
    <div class="xfolder-wrapper">
      <template v-for="item in xfolder.icons" :key="item.id">
        <Application :icon="item" :isOnQuickSearchMode="isOnQuickSearchMode" />
      </template>
    </div>
    <div class="xfolder-name">{{ xfolder.name }}</div>
  </div>
</template>

<script setup>
import { defineProps, ref, inject, computed } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import Application from "./Application.vue";
import { getDesktopLayout } from "@/functions/desktop/desktopAppearance";

// const xfolder = {
//     type: "xfolder",
//     id: path.id,
//     name: path.name,
//     path: path.path,
//     isFolded: false,
//     sortInfo: path.sortInfo,
//     icons: thePathIcons
//   };
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
// function expandXfolder(event) {
//   event.stopPropagation();
//   if (isContract.value) {
//     isContract.value = false;
//   }
// }

// function onMove(event) {
//   const toPageIndex = parseInt(event.to.id.split("-").pop());
//   // 不是同一个页面，且拖动至页面区域
//   if (
//     event.from.id !== event.to.id &&
//     event.to.className === "draggable-area"
//   ) {
//     // 收起文件夹
//     isContract.value = true;
//     event.dragged.className = "icon on-desktop";
//     // event.dragged.children[0].className = "icon-image on-desktop"
//     // event.dragged.children[0].className = "icon-name on-desktop"

//     if (pages.value[toPageIndex].length >= layout.value.pageSize) {
//       // 放回原位
//       return false; // 拒绝添加到 area 中
//     }
//   }

//   if (event.to.id === "right-area") {
//     if (currentPage.value < pages.value.length - 1) {
//       currentPage.value++;
//     }
//     return false; // 拒绝添加到 area 中
//   }
//   if (event.to.id === "left-area") {
//     if (currentPage.value > 0) {
//       currentPage.value--;
//     }
//     return false; // 拒绝添加到 area 中
//   }
// }

// function onSort(event) {}

// function onStart() {}

// function onEnd() {}

// // 点击其它地方，收起文件夹
// window.addEventListener("click", function (event) {
//   if (
//     !isContract.value &&
//     event.target.className !== "xfolder expand-xfolder"
//   ) {
//     isContract.value = true;
//   }
// });
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
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
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
</style>
