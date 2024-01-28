<template>
  <div
    id="steam"
    class="steam relative h-screen w-screen justify-center items-center flex flex-row overflow-hidden select-none"
  >
    <!-- 游戏列表 -->
    >
    <VueDraggable
      class="w-full h-full p-20 flex flex-row justify-center flex-wrap gap-6 overflow-y-scroll"
      v-model="steamApps"
      ghostClass="ghost"
    >
      <div
        v-for="item in steamApps"
        :key="item.appid"
        :id="item.appid"
        class="card w-52 aspect-[6/9] overflow-hidden cursor-pointer"
        @click="openSteamApp(item, $event)"
      >
        <div class="card-inner w-full aspect-[6/9] overflow-hidden">
          <img :src="getLocalImage(item.coverImage)" />
        </div>
      </div>
    </VueDraggable>
    <!-- 未设置路径提示 -->
    <div
      v-if="steamApps.length === 0"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl z-10"
    >
      <div class="text-center">
        <div
          class="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out active:scale-105"
          @click="setSteamRootPath"
        >
          选择 Steam 目录
        </div>
        <div
          class="text-[14px] text-slate-400 mt-2 cursor-pointer hover:text-slate-100 hover:font-bold"
        >
          如何找到我的 Steam 目录？
        </div>
      </div>
    </div>
    <MouseLight />
  </div>
</template>

<script setup>
import { defineProps, ref, onBeforeMount, inject } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import MouseLight from "./widgets/MouseLight.vue";
import _ from "lodash";
import { getSteamRootPath } from "@/modules/steam/storage/steamPath.js";
import showToast from "@/components/toast/index";

const props = defineProps({});

const utools = inject("utools");
// steam 模块
const steamApps = ref([]); // steam 应用
const steamRootPath = ref(getSteamRootPath()); // steam 根目录

onBeforeMount(() => {
  initSteam();
});

function setSteamRootPath() {
  const paths = utools.showOpenDialog({
    properties: ["openDirectory"],
  });

  console.log(
    "%c [ paths ]-69",
    "font-size:13px; background:pink; color:#bf2c9f;",
    paths
  );
  // if (!paths) {
  //   return;
  // }
  const path = paths[0];
  steamRootPath.value = path;
  utools.dbStorage.setItem("steamRootPath", path);
  initSteam(path);
}

// 获取 steam 应用数据
async function initSteam() {
  if (!steamRootPath.value) {
    showToast("请先设置 Steam 目录");
    return;
  }
  try {
    const result = await window.getSteamApps(steamRootPath.value);
    steamApps.value = result;
    console.log(
      "%c [ 初始化 获取 steam 应用数据 ]-47",
      "font-size:13px; background:green; color:white;",
      steamApps.value
    );
  } catch (error) {
    showToast("请确保设置了正确 Steam 目录");
  }
}

// 打开 steam 应用
function openSteamApp(steamApp, event) {
  event.stopPropagation();
  event.preventDefault();
  // utools.shellOpenPath(realPath);
  window.openSteamApp(steamApp);
  window.hideDesk();
}

const getLocalImage = (path) => {
  return new URL(path, import.meta.url).href;
};
</script>

<style scoped>
#steam {
  background: radial-gradient(circle at center, #3a475f 0%, #161a1f 100%);
}
.card {
  background-image: linear-gradient(163deg, #946bfa 0%, #4576ff 100%);
  border-radius: 20px;
  transition: all 0.3s;
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
}
.card.ghost {
  opacity: 0;
}

.card-inner {
  background-color: #1a1a1a;
  transition: all 0.2s;
  position: relative;
}
.card-inner::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: -100%;
  width: 200%;
  height: 20%;
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.2));
  z-index: 1;
  transform: rotate(30deg) translateY(0);
  transform-origin: top right; /* 设置为右上角 */
}
.card-inner:hover::after {
  animation: shine 0.6s linear;
}

@keyframes shine {
  0% {
    transform: rotate(30deg) translateY(0);
  }
  100% {
    transform: rotate(30deg) translateY(700%);
  }
}

.card-inner:hover {
  transform: scale(0.98);
  border-radius: 20px;
}

.card:hover {
  box-shadow: 0px 0px 40px 1px rgba(58, 147, 255, 0.79);
}

.mouse-light {
  width: 0px;
  height: 0px;
  border-radius: 50%;
  box-shadow: 0px 0px 100px 80px #446eb6ca;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}
</style>
