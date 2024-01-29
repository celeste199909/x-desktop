<template>
  <div class="item w-full my-4">
    <div class="mb-4 font-bold">背景颜色</div>
    <div class="flex flex-wrap gap-3 my-3">
      <div
        v-for="item in bgColor"
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
          @click="setBgColor(item)"
        ></div>
        <div
          v-else
          class="w-full h-full rounded-full"
          :style="{ background: item.color }"
          @click="setBgColor(item)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, ref  } from "vue";
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

onMounted(() => {
  applyBgColor();
});

function applyBgColor() {
  bgColor.value.forEach((item) => {
    if (item.current) {
      setBgColor(item);
    }
  });
}

// 设置背景颜色
function setBgColor(colorObj) {
  resetBg();
  bgColor.value.forEach((item) => {
    if (item.color === colorObj.color) {
      item.current = true;
    }
  });
  props.setDesktopAppearance({
    bgColor: bgColor.value,
    bgImage: bgImage.value,
    localBgImage: localBgImage.value,
  });
  // 设置背景色
  if (Array.isArray(colorObj.color)) {
    document.body.style.background = `linear-gradient(${colorObj.direction}, ${colorObj.color[0]}, ${colorObj.color[1]})`;
  } else {
    document.body.style.background = colorObj.color;
  }
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
</script>
<style scoped></style>
