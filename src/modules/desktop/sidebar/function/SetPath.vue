<template>
  <div class="item w-full my-4">
    <div class="mb-4 font-bold">自定义路径</div>
    <div v-for="item in iconPaths" :key="index">
      <div>{{ item.name }}</div>
      <div>{{ item.path }}</div>
      <div>{{ item.active }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { onMounted, defineProps, inject } from "vue";
import _ from "lodash";

const props = defineProps({
  desktopFunction: {
    type: Object,
    required: true,
  },
});
// iconPaths: [{ name: "桌面",
//               path: getUserDesktopPath(),
//               active: true,} ...]
const iconPaths = computed(() => props.desktopFunction.iconPaths);
console.log("iconPaths", iconPaths);
const setDesktopFunction = inject("setDesktopFunction");
</script>
<style scoped></style>
