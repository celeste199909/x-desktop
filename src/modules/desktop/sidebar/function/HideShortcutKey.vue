<template>
  <div class="item w-full my-4">
    <div class="font-bold">隐藏快捷键</div>
    <div class="mt-1 mb-4 text-[13px]">请勿与启动快捷键相同</div>
    <div class="flex flex-row items-center gap-x-3 my-4">
      <input
        type="text"
        id="input1"
        @focus="handleFocus($event)"
        :value="hideShotcutKey[0]"
        class="py-3 px-2 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder="快捷键1"
      />
      <input
        type="text"
        id="input2"
        @focus="handleFocus($event)"
        :value="hideShotcutKey[1]"
        class="py-3 px-2 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        placeholder="快捷键2(可选)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { onMounted, defineProps, inject } from "vue";
import _ from "lodash";
import { getDesktopFunction } from "@/functions/desktop/desktopFunction";

const props = defineProps({
  setDesktopFunction: {
    type: Function,
    required: true,
  },
});

const hideShotcutKey = ref(getDesktopFunction().hideShotcutKey);

// 设置快捷键
function handleFocus(event) {
  event.target.addEventListener("keydown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (
      event.key === "Backspace" ||
      event.key === "Delete" ||
      event.key === "Space" ||
      event.keyCode === 8 ||
      event.keyCode === 46 ||
      event.keyCode === 32
    ) {
      hideShotcutKey.value[1] = "";
      props.setDesktopFunction({ hideShotcutKey: hideShotcutKey.value });
      return;
    }
    if (event.target.id === "input1") {
      hideShotcutKey.value[0] = _.capitalize(event.key);
    }
    if (event.target.id === "input2") {
      hideShotcutKey.value[1] = _.capitalize(event.key);
    }
    props.setDesktopFunction({ hideShotcutKey: hideShotcutKey.value });
  });
}

window.addEventListener("keydown", handleKeydown);

// 监听按下快捷键
let keydownedList = ref([]);
let keydownTimer = ref(null);
function handleKeydown(event) {
  // 如果不是快捷键，直接返回
  if (!hideShotcutKey.value.includes(_.capitalize(event.key))) return;

  event.preventDefault();
  event.stopPropagation();
  // 是快捷键，添加到数组中
  keydownedList.value.push(_.capitalize(event.key));
  // 只设置了一个快捷键
  if (
    hideShotcutKey.value[0] &&
    !hideShotcutKey.value[1] &&
    keydownedList.value[0] === hideShotcutKey.value[0]
  ) {
    window.hideDesk();
    // 在这里执行你想要的操作
    return;
  }
  keydownTimer = setTimeout(() => {
    console.log("时间到，清空");
    keydownedList.value = [];
  }, 1000);

  // 两个快捷键
  if (
    hideShotcutKey.value[0] &&
    hideShotcutKey.value[1] &&
    keydownedList.value[0] === hideShotcutKey.value[0] &&
    keydownedList.value[1] === hideShotcutKey.value[1]
  ) {
    window.hideDesk();
    return;
  }
}
</script>
<style scoped></style>
