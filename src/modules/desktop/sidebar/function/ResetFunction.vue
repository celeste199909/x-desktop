<template>
  <div class="item w-full my-4">
    <div class="mb-4 font-bold">重置功能设置</div>
    <div class="my-2 text-red-400" @click="resetDesktopAppearance">
      重置
    </div>
  </div>
</template>

<script setup>
import { getDesktopFunction } from "@/functions/desktop/desktopFunction";

function resetDesktopAppearance() {
  console.log("重置外观");
}
</script>
<style scoped></style>
