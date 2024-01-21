<template>
  <div
    :id="'page-' + pageIndex"
    class="page w-screen h-screen flex justify-center items-center text-lg text-white bg-transparent relative"
  >
    <VueDraggable
      class="draggable-area rounded-xl p-4"
      :class="[{ 'bg-slate-500/30': isDragging }]"
      :id="'draggable-area-' + pageIndex"
      :group="{
        name: 'desktop',
        put: ['desktop', 'xfolder', 'side'],
        pull: ['desktop', 'xfolder', 'side'],
      }"
      :animation="150"
      ghostClass="ghost"
      draggable=".draggable"
      v-model="pages[pageIndex]"
      :style="gridStyle"
      @start="onStart"
      @end="onEnd"
      @move="onMove"
    >
      <div v-for="item in pages[pageIndex]" :key="item.id" class="draggable">
        <Application :icon="item" :place="'on-desktop'" />
      </div>
    </VueDraggable>
  </div>
</template>

<script setup>
import { inject, ref, defineProps, defineEmits } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import Application from "@/modules/desktop/icons/Application.vue";
// 组合式函数
// import { useUpdateSortInfo } from "@/composables/desktop/updateSortInfo.js";
// const { updateSortInfo } = useUpdateSortInfo();

// props
const props = defineProps({
  pageIndex: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  isDragging: {
    type: Boolean,
    default: false,
  },
});

// emit
const emit = defineEmits(["setCurrentPage", "setIsDragging"]);

// 注入 来自 App.vue
const pages = inject("pages");
const layout = inject("layout");
const moveToPage = inject("moveToPage");

// app容器 grid 布局
const gridStyle = ref({
  minWidth: layout.value.minWidth + "px",
  minHeight: layout.value.minHeight + "px",
  display: "grid",
  gridTemplateColumns: `repeat(${layout.value.column}, 1fr)`,
  gridTemplateRows: `repeat(${layout.value.row}, 1fr)`,
  gap: `${layout.value.gapY}px ${layout.value.gapX}px`,
});

// 拖动图标至左右边缘时，切换页面
function onMove(event) {
  const toPageIndex = parseInt(event.to.id.split("-").pop());
  // 不是同一个页面，且拖动至页面区域
  if (
    event.from.id !== event.to.id &&
    event.to.className.split(" ").includes("draggable-area")
  ) {
    if (pages.value[toPageIndex].length >= layout.value.pageCapacity) {
      console.log("页面已满");
      return false; // 拒绝添加到 area 中
    }
  }
  // 如果去往的是文件夹
  if (event.to.className.split(" ").includes("xfolder-icons")) {
    // 放回原位
    return false;
  }

  if (event.to.id === "right-area") {
    if (props.currentPage < pages.value.length - 1) {
      moveToPage({ pageIndex: props.currentPage + 1, transition: true });
      return;
    }
    return false;
  }
  if (event.to.id === "left-area") {
    if (props.currentPage > 0) {
      moveToPage({ pageIndex: props.currentPage - 1, transition: true });
      return;
    }
    return false;
  }
}
// 开始拖拽
function onStart(event) {
  console.log("onStart", event);
  console.log(event.item.className.split(" "));
  if (event.item.className.split(" ").includes("draggable")) {
    emit("setIsDragging", true);
  }
}
// 结束拖拽
function onEnd(event) {
  emit("setIsDragging", false);
  console.log("pages.value", pages.value);
  // updateSortInfo();
}
</script>
<style scoped>
.draggable.ghost {
  opacity: 0;
}
</style>
