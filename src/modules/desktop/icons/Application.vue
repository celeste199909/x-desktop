<template>
  <div
  :key="icon.id"
    class="icon"
    :class="[
      place,
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
      :id="`icon-iamge-${icon.id}`"
      :src="icon.iconImage"
      alt=""
      srcset=""
      :class="place"
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
  place: {
    type: String, // on-desktop, in-contract-xfolder, in-expand-xfolder
    required: true,
    default: "on-desktop",
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
  if (props.place === "in-contract-xfolder") return;
  console.log("Mouse Down Icon");
  position.x = event.clientX;
  position.y = event.clientY;
}

function handleMouseUp(icon, event) {
  // iconImage.value.classList.remove('scale-110');
  if (props.place === "in-contract-xfolder") return;
  console.log("Mouse Up Icon");
  const x = event.clientX;
  const y = event.clientY;
  if (Math.abs(x - position.x) < 1 && Math.abs(y - position.y) < 1) {
    utools.shellOpenPath(icon.realPath);
    window.hideDesk();
  }
}
</script>
<style scoped>
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

/* 在桌面上 */
.icon.on-desktop {
  /* width: 120px;
    height: 120px; */
  /* padding: 1rem; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  border: 3px solid #00000000;
  transition: all 0.3s;
  padding: 10px;
  /* width: 100%;
    height: 100%; */
}

.icon.on-desktop .icon-image {
  width: 54px;
  height: 54px;
  margin: 10px;
}

.icon.on-desktop .icon-name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1rem;
}

/* 在收起的文件夹中 */
.icon.in-contract-xfolder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
}

.icon.in-contract-xfolder .icon-image {
  width: 100%;
  height: 100%;
}

.icon.in-contract-xfolder .icon-name {
  display: none;
}

/* 在展开的文件夹中 */
.icon.in-expand-xfolder {
  width: 110px;
  height: 110px;
  /* padding: 1rem; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
}

.icon.in-expand-xfolder .icon-image {
  width: 54px;
  height: 54px;
  margin: 10px;
}

.icon.in-expand-xfolder .icon-name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-align: center;
  font-size: 0.875rem;
  line-height: 0.875rem;
}
</style>
