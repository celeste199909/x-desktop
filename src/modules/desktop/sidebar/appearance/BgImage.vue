<template>
  <div class="item w-full my-4">
    <div class="mb-2 font-bold">背景图片</div>
    <div class="flex flex-wrap gap-3 my-3">
      <div
        v-for="item in bgImage"
        :key="item.name"
        class="border-2 w-32 h-24 p-1 rounded-xl flex justify-center items-center overflow-hidden cursor-pointer"
        :class="item.current ? 'border-blue-500' : 'border-transparent'"
        @click="setBgImage(item.name)"
      >
        <img class="rounded-[8px] h-full" :src="getAssetsFile(item.name)" />
      </div>
    </div>
    <div>
      <div>
        本地图片
        <span @click="handleUploadImage" class="text-blue-500 cursor-pointer"
          >选择</span
        >
      </div>
      <div class="mt-1 mb-4 text-[13px]">本地背景图片仅保存最近 6 张</div>
      <div class="flex flex-wrap gap-3 my-3">
        <template v-if="localBgImage.length > 0">
          <div
            v-for="item in localBgImage"
            :key="item.name"
            class="border-2 w-32 h-24 p-1 rounded-xl flex justify-center items-center overflow-hidden cursor-pointer"
            :class="item.current ? 'border-blue-500' : 'border-transparent'"
            @click="setLocalBgImage(item.path)"
          >
            <img class="rounded-[8px] h-full" :src="getLocalImage(item.path)" />
          </div>
        </template>
        <template v-else>
          <div
            class="border-2 border-slate-50 bg-gray-300 text-gray-400 dark:border-slate-500 dark:bg-gray-800 text-2xl font-bold w-32 h-24 p-1 rounded-xl flex justify-center items-center overflow-hidden cursor-pointer"
            @click="handleUploadImage"
          >
            +
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, inject,ref  } from "vue";
import showToast from "@/components/toast/index";
import { getDesktopAppearance } from "@/functions/desktop/desktopAppearance";

const props = defineProps({
  setDesktopAppearance: {
    type: Function,
    required: true,
  },
});
const bgColor = ref(getDesktopAppearance().bgColor);
const bgImage = ref(getDesktopAppearance().bgImage);
const localBgImage = ref(getDesktopAppearance().localBgImage);

const utools = inject("utools");

onMounted(() => {
  applyBgImage();
});

function applyBgImage() {
  bgImage.value.forEach((item) => {
    if (item.current) {
      setBgImage(item.name);
    }
  });
  localBgImage.value.forEach((item) => {
    if (item.current) {
      setLocalBgImage(item.path);
    }
  });
}

// 设置背景
function setBgImage(name) {
  resetBg();
  bgImage.value.forEach((item) => {
    if (item.name === name) {
      item.current = true;
      document.body.style.backgroundImage = `url(${getAssetsFile(name)})`;
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
    }
  });
  props.setDesktopAppearance({
    bgColor: bgColor.value,
    bgImage: bgImage.value,
    localBgImage: localBgImage.value,
  });
}

// 设置本地背景
function setLocalBgImage(path) {
  resetBg();
  localBgImage.value.forEach((item) => {
    if (item.path === path) {
      item.current = true;
      document.body.style.backgroundImage = `url(${getLocalImage(path)})`;
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
    }
  });
  props.setDesktopAppearance({
    bgColor: bgColor.value,
    bgImage: bgImage.value,
    localBgImage: localBgImage.value,
  });
}

function resetBg() {
  bgColor.value.forEach((item) => {
    item.current = false;
  });
  bgImage.value.forEach((item) => {
    item.current = false;
  });
  localBgImage.value.forEach((item) => {
    item.current = false;
  });
  props.setDesktopAppearance({
    bgColor: bgColor.value,
    bgImage: bgImage.value,
    localBgImage: localBgImage.value,
  });
}

// 上传图片背景
function handleUploadImage() {
  // 选择图片
  const filePathList = utools.showOpenDialog({
    title: "选择图片",
    properties: ["openFile"],
    filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }],
  });
  console.log('%c [ 选择图片 ]-137', 'font-size:13px; background:pink; color:#bf2c9f;', filePathList)
  // 如果没有选择图片，返回
  if (!filePathList) return;
  // 如果选择的图片已经存在，返回
  if (localBgImage.value.some((item) => item.path === filePathList[0])) {
    showToast("图片已存在");
    return;
  }
  // 添加到本地背景
  localBgImage.value.unshift({
    current: false,
    path: filePathList[0],
  });
  // 如果本地背景数量超过4个，删除最后一个
  if (localBgImage.value.length > 6) {
    localBgImage.value.pop();
  }
  props.setDesktopAppearance({
    localBgImage: localBgImage.value,
  });
}

const getLocalImage = (path) => {
  return new URL(path, import.meta.url).href;
};

const getAssetsFile = (name) => {
  return new URL(`/src/assets/wallpapers/${name}`, import.meta.url).href;
};
</script>
<style scoped></style>
