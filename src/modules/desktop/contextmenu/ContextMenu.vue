<template>
  <div
    id="context-menu"
    v-show="isShowContextMenu"
    :style="{
      left: contextMenuPosition.x + 'px',
      top: contextMenuPosition.y + 'px',
    }"
    class="context-menu select-none px-2 py-3 rounded-lg backdrop-blur-sm bg-slate-200/90 dark:bg-slate-900/90 fixed w-40 z-100"
  >
    <!-- 桌面菜单 -->
    <template v-for="item in menuOptions" :key="item.name">
      <div
        class="flex justify-start items-center text-slate-900 hover:bg-slate-400/70 dark:text-slate-200 dark:hover:bg-slate-600 px-4 py-2 rounded-lg cursor-pointer"
        v-if="item.enabled.includes(clickTargetType)"
        @click.left="item.handler($event)"
      >
        {{ item.name }}
      </div>
    </template>
    <!-- 分隔线 -->
    <div class="my-1 w-full h-[1px] bg-slate-500/50"></div>
    <!-- 全局桌面 -->
    <template v-for="item in globalContextMenuOptions" :key="item.name">
      <div
        class="flex justify-start items-center text-slate-900 hover:bg-slate-400/70 dark:text-slate-200 dark:hover:bg-slate-600 px-4 py-2 rounded-lg cursor-pointer"
        @click.left="item.handler($event)"
      >
        {{ item.name }}
      </div>
    </template>
  </div>
</template>
<script setup>
import { inject, ref, computed, defineProps, defineEmits } from "vue";
import { nanoid } from "nanoid";
import showToast from "@/components/toast/index";
import { useGlobalContextMenu } from "@/composables/globalContextMenu.js";

const props = defineProps({
  pagedIcons: {
    type: Array,
    required: true,
  },
  isShowContextMenu: {
    type: Boolean,
    default: false,
  },
  isShowSidebar: {
    type: Boolean,
    default: false,
  },
  currentPage: {
    type: Number,
    default: 0,
  },
  moveToPage: {
    type: Function,
    required: true,
  },
  addPage: {
    type: Function,
    required: true,
  },
  removePage: {
    type: Function,
    required: true,
  },
});

const utools = inject("utools");
const emit = defineEmits(["showContextMenu", "showSidebar"]);
const clickTarget = ref(null); // 点击的目标
const contextMenuPosition = ref({ x: 0, y: 0 }); // 右键菜单位置
const { globalContextMenuOptions } = useGlobalContextMenu(); // 全局右键菜单项

const clickTargetType = computed(() => {
  if (!clickTarget.value) return null;
  const classList = clickTarget.value.className.split(" ");
  if (
    classList.includes("xfolder-icons") ||
    classList.includes("xfolder-name")
  ) {
    return "xfolder";
  } else if (
    classList.includes("icon-image") ||
    classList.includes("icon-name")
  ) {
    return "icon";
  } else if (
    classList.includes("icon") ||
    classList.includes("page") ||
    classList.includes("draggable-area") ||
    classList.includes("side-area")
  ) {
    return "desktop";
  } else {
    return "other";
  }
});

const menuOptions = ref([
  {
    name: "打开",
    enabled: ["icon"],
    handler: openApp,
  },
  {
    name: "新建页面",
    enabled: ["desktop", "other"],
    handler: newPage,
  },
  {
    name: "删除页面",
    enabled: ["desktop", "other"],
    handler: removePage,
  },
  {
    name: "桌面设置",
    enabled: ["desktop", "other"],
    handler: openDesktopSetting,
  },
]);

// 监听鼠标右键
window.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  clickTarget.value = event.target;
  contextMenuPosition.value.x = event.clientX;
  contextMenuPosition.value.y = event.clientY;
  emit("showContextMenu", true);
});

// 监听点击空白处 隐藏右键菜单 和 设置窗口
window.addEventListener("click", (e) => {
  e.preventDefault();
  emit("showContextMenu", false); // 隐藏右键菜单
  clickTarget.value = null; // 清除上次点击的目标
  // 如果侧边栏打开，且点击的不是侧边栏，则关闭侧边栏
  if (
    props.isShowSidebar &&
    !e.path.includes(document.querySelector("#sidebar"))
  ) {
    // isShowSidebar.value = false;
    emit("showSidebar", false);
  }
});

// 打开图标
function openApp(event) {
  var pattern = /icon-image-(.*)/; // 使用正则表达式捕获括号中的内容
  const result = clickTarget.value.id.match(pattern);

  const iconId = result[1];
  const icon = props.pagedIcons[props.currentPage].find(
    (item) => item.id === iconId
  );

  if (!icon) return;
  utools.shellOpenPath(icon.realPath);
  window.hideDesk();
}

// 新建页面
function newPage() {
  props.addPage();
}

// 删除页面
function removePage() {
  props.removePage();
}

// 打开桌面设置
function openDesktopSetting(event) {
  event.stopPropagation();
  emit("showContextMenu", false);
  emit("showSidebar", true);
}

</script>
<style scoped></style>
