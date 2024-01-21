<template>
  <!-- <div>预设颜色</div> -->
  <!-- <div class="flex flex-wrap gap-3 my-3">
    <div
      v-for="item in setting.bgColor"
      :key="item"
      class="border-2 w-12 h-12 p-1 rounded-full flex flex-row justify-center items-center overflow-hidden cursor-pointer"
      :class="item.current ? 'border-blue-500' : 'border-transparent'"
    >
      <div
        v-if="Array.isArray(item.color)"
        class="w-full h-full rounded-full"
        :style="{
          background: `linear-gradient(${item.direction}, ${item.color[0]}, ${item.color[1]})`,
        }"
      ></div>
      <div
        v-else
        class="w-full h-full rounded-full"
        :style="{ background: item.color }"
      ></div>
    </div>
  </div> -->
    <div>bgColor</div>
</template>

<script setup>
// import { onMounted } from "vue";
// import { inject } from "vue";
// const setting = inject("setting")

// onMounted(() => {
//     // 设置背景
//     updateBgColor()
// })

// function updateBgColor() {
//     setting.value.bgColor.forEach((item) => {
//         if (item.current) {
//             console.log(item.color)
//             setBgColor(item)
//         }
//     })
// }

// 设置背景颜色
// function setBgColor(item) {
//     resetBg();
//     setting.value.bgColor.forEach((x) => {
//         if (x.color === item.color) {
//             x.current = true;
//         }
//     });
//     if (Array.isArray(item.color)) {
//         document.body.style.background = `linear-gradient(${item.direction}, ${item.color[0]}, ${item.color[1]})`;
//     } else {
//         document.body.style.background = item.color;
//     }
// }

// function resetBg() {
//     setting.value.bgImage.forEach((item) => {
//         item.current = false;
//     });
//     setting.value.localBgImage.forEach((item) => {
//         item.current = false;
//     });
//     setting.value.bgColor.forEach((item) => {
//         item.current = false;
//     });
// }
</script>
<style scoped></style>
