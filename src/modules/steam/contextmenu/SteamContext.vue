<template>
  <template v-for="item in menuOptions" :key="item.name">
    <div
      class="flex justify-start items-center text-slate-900 hover:bg-slate-400/70 dark:text-slate-200 dark:hover:bg-slate-600 px-4 py-2 rounded-lg cursor-pointer"
      v-if="item.enabled.includes(clickTargetType)"
      @click.left="item.handler($event)"
    >
      {{ item.name }}
    </div>
  </template>
</template>
<script setup>
import { computed, inject,  ref, defineProps } from "vue";

const props = defineProps({
  clickTarget: {
    type: Object,
    required: true,
  },
});

// 右键菜单

// desktop icon xfolder other
const clickTargetType = computed(() => {
  if(!props.clickTarget) return

  console.log("steam clickTargetType", props.clickTarget.className);
  const classList = props.clickTarget.className.split(" ");
  if (classList.includes("steam")) {
    return "steam";
  } else {
    return "other";
  }
});

const menuOptions = ref([
  {
    name: "打开",
    enabled: ["steam"],
    handler: () => {},
  },
  {
    name: "Steam 设置",
    enabled: ["other"],
    handler: handleClickSetting,
  },
]);

function handleClickSetting(event) {
  event.stopPropagation();
  isShowContextMenu.value = false;
  isShowSidebar.value = true;
}
</script>
<style scoped></style>
