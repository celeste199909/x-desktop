<template>
  <!-- <div>
    <div class="flex flex-wrap gap-3 my-3">
      <div
        v-for="item in setting.bgImage"
        :key="item.name"
        class="border-2 w-32 h-24 p-1 rounded-xl flex justify-center items-center overflow-hidden cursor-pointer"
        :class="item.current ? 'border-blue-500' : 'border-transparent'"
        @click="setBackgroud(item.name)"
      >
        <img class="rounded-[8px] h-full" :src="getAssetsFile(item.name)" />
      </div>
    </div>
  </div>
  <div>
    <div>
      本地图片
      <span @click="handleUploadImage" class="text-blue-500 cursor-pointer"
        >选择</span
      >
    </div>
    <div class="mb-4 text-sm">本地背景图片仅保存最近 6 张</div>
    <div class="flex flex-wrap gap-3 my-3">
      <template v-if="setting.localBgImage.length > 0">
        <div
          v-for="item in setting.localBgImage"
          :key="item.name"
          class="border-2 w-32 h-24 p-1 rounded-xl flex justify-center items-center overflow-hidden cursor-pointer"
          :class="item.current ? 'border-blue-500' : 'border-transparent'"
          @click="setlocalBgImage(item.path)"
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
  </div> -->
  <div>bgImage</div>
</template>

<script setup>
// import { onMounted } from "vue";
// import { inject } from "vue";
// const setting = inject("setting");

// onMounted(() => {
//   // 设置背景
//   updateBgImage();
// });

// function updateBgImage() {
//   setting.value.bgImage.forEach((item) => {
//     if (item.current) {
//       console.log(item.name);
//       document.body.style.backgroundImage = `url(${getAssetsFile(item.name)})`;
//       // 居中
//       document.body.style.backgroundPosition = "center";
//       document.body.style.backgroundSize = "cover";
//       document.body.style.backgroundRepeat = "no-repeat";
//       return;
//     }
//   });
//   setting.value.localBgImage.forEach((item) => {
//     if (item.current) {
//       document.body.style.backgroundImage = `url(${getLocalImage(item.path)})`;
//       // 居中
//       document.body.style.backgroundPosition = "center";
//       document.body.style.backgroundSize = "cover";
//       document.body.style.backgroundRepeat = "no-repeat";
//     }
//   });
// }

// // 设置背景
// function setBackgroud(name) {
//   resetBg();
//   setting.value.bgImage.forEach((item) => {
//     if (item.name === name) {
//       item.current = true;
//       document.body.style.backgroundImage = `url(${getAssetsFile(name)})`;
//       // 居中
//       document.body.style.backgroundPosition = "center";
//       document.body.style.backgroundSize = "cover";
//       document.body.style.backgroundRepeat = "no-repeat";
//     }
//   });
// }
// function setlocalBgImage(path) {
//   resetBg();
//   setting.value.localBgImage.forEach((item) => {
//     if (item.path === path) {
//       item.current = true;
//       document.body.style.backgroundImage = `url(${getLocalImage(path)})`;
//       // 居中
//       document.body.style.backgroundPosition = "center";
//       document.body.style.backgroundSize = "cover";
//       document.body.style.backgroundRepeat = "no-repeat";
//     }
//   });
// }

// function resetBg() {
//   setting.value.bgImage.forEach((item) => {
//     item.current = false;
//   });
//   setting.value.localBgImage.forEach((item) => {
//     item.current = false;
//   });
//   setting.value.bgColor.forEach((item) => {
//     item.current = false;
//   });
// }
// // 上传图片背景
// function handleUploadImage() {
//   // 选择图片
//   const filePathList = utools.showOpenDialog({
//     title: "选择图片",
//     properties: ["openFile"],
//     filters: [{ name: "Images", extensions: ["jpg", "png", "gif"] }],
//   });
//   console.log(filePathList);
//   // 如果没有选择图片，返回
//   if (!filePathList) return;
//   // 如果选择的图片已经存在，返回
//   if (setting.value.localBgImage.some((item) => item.path === filePathList[0]))
//     return;
//   // 添加到本地背景
//   setting.value.localBgImage.unshift({
//     current: false,
//     path: filePathList[0],
//   });
//   // 如果本地背景数量超过4个，删除最后一个
//   if (setting.value.localBgImage.length > 6) {
//     setting.value.localBgImage.pop();
//   }
// }
// const getLocalImage = (path) => {
//   return new URL(path, import.meta.url).href;
// };

// const getAssetsFile = (name) => {
//   return new URL(`/src/assets/wallpapers/${name}`, import.meta.url).href;
// };
</script>
<style scoped></style>
