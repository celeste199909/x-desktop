<template>
  <div class="item w-full my-4">
    <div class="mb-4 font-bold">重置外观设置</div>
    <div class="my-2 text-red-400 cursor-pointer" @click="resetDesktopAppearance">
      重置（重启生效）
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, ref  } from "vue";
import { getDesktopAppearance, defaultDesktopAppearance } from "@/functions/desktop/desktopAppearance";
import showToast from "@/components/toast/index";

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
  showToast("重置成功，重启生效");
}
</script>
<style scoped></style>
