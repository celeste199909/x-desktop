<template>
  <div class="item w-full my-4">
    <div class="mb-4 font-bold">遮罩浓度</div>
    <label for="basic-range-slider-usage" class="sr-only">Example range</label>
    <input
      type="range"
      v-model="bgOpacity"
      @input="onInput"
      class="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:-mt-0.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:ease-in-out [&::-webkit-slider-thumb]:dark:bg-slate-700 [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-gray-100 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:dark:bg-gray-700"
      id="basic-range-slider-usage"
    />
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

const bgOpacity = ref(getDesktopAppearance().bgOpacity);

onMounted(() => {
  setBgOpacity();
});

function onInput(event) {
  setBgOpacity();
}

function setBgOpacity() {
  props.setDesktopAppearance({
    bgOpacity: bgOpacity.value,
  });
  document
    .getElementById("app")
    .setAttribute(
      "style",
      `background-color: rgba(0,0,0,${bgOpacity.value / 100})`
    );
}
</script>
<style scoped></style>
