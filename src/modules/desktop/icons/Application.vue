<template>
  <div
    class="icon"
    :class="[
      isOnQuickSearchMode
        ? icon.isSearchTarget
          ? 'is-search-target'
          : 'not-search-target'
        : '',
      isOnQuickSearchMode ? (icon.isSelected ? 'is-selected' : '') : '',
    ]"
    :style="{
      width: layout.cellLength + 'px',
      height: layout.cellLength + 'px',
    }"
  >
    <img
      class="icon-image"
      :id="`icon-image-${icon.id}`"
      :src="icon.iconImage"
      alt=""
      srcset=""
      ref="iconImage"
      @mousedown.left="handleMouseDown($event)"
      @mouseup.left="handleMouseUp(icon, $event)"
    />
    <div class="icon-name">{{ icon.showName }}</div>
  </div>
</template>

<script setup>
import { defineProps, inject, ref, computed } from "vue";
import { getDesktopLayout } from "../../../functions/desktop/desktopAppearance";

const props = defineProps({
  icon: {
    type: Object,
    required: true,
  },
  isOnQuickSearchMode: {
    type: Boolean,
    default: false,
  },
});

const utools = inject("utools");
const layout = ref(getDesktopLayout());
const iconImage = ref();
const position = { x: 0, y: 0 };

// 处理打开图标
function handleMouseDown(event) {
  position.x = event.clientX;
  position.y = event.clientY;
}

function handleMouseUp(icon, event) {
  // iconImage.value.classList.remove('scale-110');
  const x = event.clientX;
  const y = event.clientY;
  if (Math.abs(x - position.x) < 1 && Math.abs(y - position.y) < 1) {
    utools.shellOpenPath(icon.realPath);
    window.hideDesk();
  }
}
</script>
<style scoped>
.icon {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  border: 3px solid #00000000;
  transition: all 0.3s;
  padding: 10px;
}
.xfolder .icon {
  /* 文件夹中 */
  width: 20px !important;
  height: 20px !important;
  overflow: hidden;
  padding: 0;
}
/* 展开的文件夹中 */
.expand-xfolder .icon {
  color: #fff;
}
.icon .icon-image {
  width: 50%;
  height: 50%;
  margin: 10px;
}
.xfolder .icon .icon-image {
  /* 文件夹中 */
  width: 100%;
  height: 100%;
  margin: 0;
}
.icon .icon-name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1rem;
}
.xfolder .icon .icon-name {
  /* 文件夹中 */
  display: none;
}
.icon.is-search-target {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  border: 3px solid #eeeeee86;
  backdrop-filter: blur(10px);
}
.icon.is-search-target.is-selected {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  border: 3px solid rgb(39, 140, 255);
  backdrop-filter: blur(10px);
}
.icon.not-search-target {
  opacity: 0.6;
}
.icon.ghost {
  opacity: 0;
}

.icon-image:hover {
  filter: drop-shadow(0 0 0.5rem rgba(206, 206, 206, 0.438));
}

</style>
