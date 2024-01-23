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
import { computed } from "vue";
import { onMounted, defineProps, inject } from "vue";

const props = defineProps({
  desktopAppearance: {
    type: Object,
    required: true,
  },
});

const bgColor = computed(() => props.desktopAppearance.bgColor);
const setDesktopAppearance = inject("setDesktopAppearance");
onMounted(() => {
  updateBgColor();
});

function updateBgColor() {
  bgColor.value.forEach((item) => {
    if (item.current) {
      setBgColor(item);
    }
  });
}

// 设置背景颜色
function setBgColor(item) {
  const newDesktopAppearance = {
    ...props.desktopAppearance,
    bgColor: props.desktopAppearance.bgColor.map((x) => {
      if (x.color === item.color) {
        x.current = true;
        return x;
      } else {
        x.current = false;
        return x;
      }
    }),
    bgImage: props.desktopAppearance.bgImage.map((x) => {
      x.current = false;
      return x;
    }),
    localBgImage: props.desktopAppearance.localBgImage.map((x) => {
      x.current = false;
      return x;
    }),
  };
  setDesktopAppearance(newDesktopAppearance);
  // 设置背景色
  if (Array.isArray(item.color)) {
    document.body.style.background = `linear-gradient(${item.direction}, ${item.color[0]}, ${item.color[1]})`;
  } else {
    document.body.style.background = item.color;
  }
}
</script>
<style scoped></style>