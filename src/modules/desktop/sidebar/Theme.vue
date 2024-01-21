<template>
    <!-- <div class="flex flex-row w-fit items-center rounded-lg overflow-hidden shadow-sm bg-slate-100 dark:bg-slate-700">
        <div class="py-2 px-4 flex justify-center items-center  cursor-pointer"
            :class="setting.theme === 'light' ? 'bg-blue-500 text-slate-100 dark:bg-blue-700 dark:text-slate-200' : ''" @click="setTheme('light')">
            浅色
        </div>
        <div class="py-2 px-4 flex justify-center items-center  cursor-pointer"
            :class="setting.theme === 'dark' ? 'bg-blue-500 text-slate-100 dark:bg-blue-700 dark:text-slate-200' : ''" @click="setTheme('dark')">
            深色
        </div>
        <div class="py-2 px-4 flex justify-center items-center cursor-pointer"
            :class="setting.theme === 'auto' ? 'bg-blue-500 text-slate-100 dark:bg-blue-700 dark:text-slate-200' : ''" @click="setTheme('auto')">
            跟随系统
        </div>
    </div> -->
    <div>theme</div>
</template>

<script setup>
// import { onMounted } from "vue";
// import { inject } from "vue";
// const setting = inject("setting");

// onMounted(() => {
//     // 设置主题
//     setTheme(setting.value.theme);
// });

// // 设置主题
// function setTheme(theme) {
//     if (theme === "auto") {
//         setting.value.theme = "auto";
//         utools.isDarkColors()
//             ? document.documentElement.classList.add("dark")
//             : document.documentElement.classList.remove("dark");
//     } else if (theme === "light") {
//         setting.value.theme = "light";
//         document.documentElement.classList.remove("dark");
//     } else if (theme === "dark") {
//         setting.value.theme = "dark";
//         document.documentElement.classList.add("dark");
//     }
// }
</script>
<style scoped></style>
