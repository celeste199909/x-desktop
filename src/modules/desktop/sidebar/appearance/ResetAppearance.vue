<template>
  <div class="item w-full my-4">
    <div class="mb-4 font-bold">重置外观设置</div>
    <div class="my-2 text-red-400" @click="resetDesktopAppearance">
      重置（需要重启才生效）
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, ref  } from "vue";
import { getDesktopAppearance, defaultDesktopAppearance } from "@/functions/desktop/desktopAppearance";

const props = defineProps({
  setDesktopAppearance: {
    type: Function,
    required: true,
  },
});
function resetDesktopAppearance() {
  props.setDesktopAppearance({
    ...defaultDesktopAppearance
  });
  console.log('%c [ 重置外观设置 ]-22', 'font-size:13px; background:skyblue; color:white;', getDesktopAppearance())
}
</script>
<style scoped></style>
