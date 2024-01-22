<template>
  <div class="item w-full my-4">
    <div class="mb-4 font-bold">重置外观设置</div>
    <div class="my-2 text-red-400" @click="resetDesktopAppearance">
      重置
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { defaultDesktopAppearance } from "@/functions/desktop/desktopAppearance";

const setDesktopAppearance = inject("setDesktopAppearance");

function resetDesktopAppearance() {
  setDesktopAppearance(defaultDesktopAppearance);
  console.log("重置外观设置（缺少应用设置）");
}
</script>
<style scoped></style>
