<template>
  <div class="item w-full my-4">
    <div class="flex flex-row justify-start items-center gap-x-3">
      <div class="font-bold">自定义路径</div>
      <div class="text-blue-500 cursor-pointer" @click="handleAddPath">
        添加
      </div>
    </div>
    <div class="mt-1 mb-4 text-[13px]">启用的路径所含图标会显示在桌面上</div>
    <!-- 路径卡片 -->
    <VueDraggable
      v-model="iconPaths"
      ghostClass="ghost"
      class="flex flex-col justify-start items-center gap-y-4"
      @end="setDesktopFunction({ iconPaths: iconPaths })"
    >
      <div
        v-for="item in iconPaths"
        :key="item.id"
        class="path-card w-full transition-all h-28 flex flex-col gap-x-2 py-4 px-5 justify-start items-start rounded-2xl border-[3px] hover:border-blue-500"
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
        <!-- 启用 删除 收纳 -->
        <div class="flex w-full flex-row justify-start items-center gap-x-4">
          <div
            class="text-blue-500 hover:font-bold hover:underline cursor-pointer"
            @click="toggleActive(item)"
          >
            {{ item.active ? "禁用" : "启用" }}
          </div>
          <div
            class="text-blue-500 hover:font-bold hover:underline cursor-pointer"
            @click="toggleFolder(item)"
          >
            {{ item.isFolded ? "释放" : "收纳" }}
          </div>
          <div
            v-if="item.id !== 'desktop'"
            class="text-red-400 hover:text-red-500 hover:font-bold cursor-pointer"
            @click="handleRemovePath(item)"
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
import { ref } from "vue";
import { defineProps } from "vue";
import _ from "lodash";
import showToast from "@/components/toast/index";
import { nanoid } from "nanoid";
import { VueDraggable } from "vue-draggable-plus";
import { getDesktopFunction } from "@/functions/desktop/desktopFunction";

const props = defineProps({
  setDesktopFunction: {
    type: Function,
    required: true,
  },
  addPath: {
    type: Function,
    required: true,
  },
  removePath: {
    type: Function,
    required: true,
  },
  activePath: {
    type: Function,
    required: true,
  },
  inactivePath: {
    type: Function,
    required: true,
  },
  foldPath: {
    type: Function,
    default: () => {},
  },
  unfoldPath: {
    type: Function,
    default: () => {},
  },
  saveNowSortInfo: {
    type: Function,
    default: () => {},
  },
});

// iconPaths: [{ name: "桌面", path: getUserDesktopPath(), active: true,} ...]
const iconPaths = ref(getDesktopFunction().iconPaths);

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

  const p = {
    id: nanoid(),
    name: _.last(newPath.split("\\")),
    path: newPath,
    active: false,
    isFolded: false,
    sortInfo: [],
  };

  iconPaths.value.push(p);

  props.setDesktopFunction({ iconPaths: iconPaths.value }); // 保存path数据到本地
  props.addPath(p); // 添加路径下的图标到全部icon中
}
// 删除路径
function handleRemovePath(path) {
  // 先将激活的路径设置为 false
  const index = _.findIndex(iconPaths.value, { id: path.id });
  iconPaths.value[index].active = false;
  props.setDesktopFunction({ iconPaths: iconPaths.value });
  props.inactivePath(path);
  // 再删除路径
  _.remove(iconPaths.value, { id: path.id });
  props.setDesktopFunction({ iconPaths: iconPaths.value });
  props.removePath(path);
}

// 切换启用状态
function toggleActive(path) {
  // console.log('%c [ 切换路径的启用状态 ]-121', 'font-size:13px; background:yellow; color:green;', id)
  const isActive = path.active;
  const index = _.findIndex(iconPaths.value, { id: path.id });

  console.log(
    "%c [ isActive ]-144",
    "font-size:13px; background:pink; color:#bf2c9f;",
    isActive
  );
  if (isActive) {
    // iconPaths 当前是否只有一个激活的路径
    const activeItems = iconPaths.value.filter((item) => item.active);
    console.log("[ activeItems ] >", activeItems);
    const hasOnlyOneActive = activeItems.length === 1;
    if (hasOnlyOneActive) {
      showToast("至少保留一个启用的路径");
      return;
    }
    iconPaths.value[index].active = false;
    props.setDesktopFunction({ iconPaths: iconPaths.value });
    props.inactivePath(path);
  } else {
    iconPaths.value[index].active = true;
    props.setDesktopFunction({ iconPaths: iconPaths.value });
    props.activePath(path);
  }
}

// 切换收纳状态
function toggleFolder(path) {
  if (!path.active) {
    showToast("请先启用该路径");
    return;
  }
  const isFolded = path.isFolded;
  const index = _.findIndex(iconPaths.value, { id: path.id });
  if (isFolded) {
    iconPaths.value[index].isFolded = false;
    props.setDesktopFunction({ iconPaths: iconPaths.value });
    props.unfoldPath(path);
  } else {
    iconPaths.value[index].isFolded = true;
    props.setDesktopFunction({ iconPaths: iconPaths.value });
    props.foldPath(path);
  }
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
