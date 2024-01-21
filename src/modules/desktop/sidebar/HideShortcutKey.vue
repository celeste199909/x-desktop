<template>
  <!-- <div class="flex flex-row items-center gap-x-3">
    <input
      type="text"
      id="input1"
      @focus="handleFocus($event)"
      :value="setting.hideShortcutKey[0]"
      class="py-3 px-2 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
      placeholder="快捷键1"
    />
    <input
      type="text"
      id="input2"
      @focus="handleFocus($event)"
      :value="setting.hideShortcutKey[1]"
      class="py-3 px-2 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
      placeholder="快捷键2(可选)"
    />
  </div> -->
  <div>hideShortcutKey</div>
</template>

<script setup>
// import { inject, ref } from "vue";
// import _ from "lodash";
// const setting = inject("setting");

// // 设置快捷键
// function handleFocus(event) {
//   event.target.addEventListener("keydown", (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     if (
//       event.key === "Backspace" ||
//       event.key === "Delete" ||
//       event.keyCode === 8 ||
//       event.keyCode === 46
//     ) {
//       setting.value.hideShortcutKey[1] = "";
//       // event.target.value = "";
//       return;
//     }
//     if (event.target.id === "input1") {
//       setting.value.hideShortcutKey[0] = _.capitalize(event.key);
//     }
//     if (event.target.id === "input2") {
//       setting.value.hideShortcutKey[1] = _.capitalize(event.key);
//     }
//     event.target.value = _.capitalize(event.key);
//   });
// }

// // 监听按下快捷键
// let keydownedList = ref([]);
// let keydownTimer = ref(null);
// function handleKeydown(event) {
//   // 如果不是快捷键，直接返回
//   if (!setting.value.hideShortcutKey.includes(_.capitalize(event.key))) return;

//   event.preventDefault();
//   event.stopPropagation();
//   // 是快捷键，添加到数组中
//   keydownedList.value.push(_.capitalize(event.key));
//   // 只设置了一个快捷键
//   if (
//     setting.value.hideShortcutKey[0] &&
//     !setting.value.hideShortcutKey[1] &&
//     keydownedList.value[0] === setting.value.hideShortcutKey[0]
//   ) {
//     console.log(`一个快捷键，按下了 ${setting.value.hideShortcutKey[0]} 键`);
//     window.hideDesk();
//     // 在这里执行你想要的操作
//     return;
//   }
//   keydownTimer = setTimeout(() => {
//     console.log("时间到，清空");
//     keydownedList.value = [];
//   }, 1000);

//   // 两个快捷键
//   if (
//     setting.value.hideShortcutKey[0] &&
//     setting.value.hideShortcutKey[1] &&
//     keydownedList.value[0] === setting.value.hideShortcutKey[0] &&
//     keydownedList.value[1] === setting.value.hideShortcutKey[1]
//   ) {
//     console.log(
//       `两个快捷键,按下了 ${keydownedList.value[0]} , ${keydownedList.value[1]} 键`
//     );
//     window.hideDesk();
//     return;
//   }
// }

// window.addEventListener("keydown", handleKeydown);
</script>
<style scoped></style>
