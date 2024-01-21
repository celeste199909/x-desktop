<template>
  <div
    class="mouse-light absolute"
    :style="{ top: y + 'px', left: x + 'px' }"
  ></div>
</template>

<script setup>
import { useMouse } from "@vueuse/core";

const { x, y, sourceType } = useMouse();
</script>
<style scoped></style>