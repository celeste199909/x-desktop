<template>
  <div class="item w-full my-4">
    <div class="mb-4 font-bold">主题</div>
    <div
      class="flex flex-row w-fit items-center rounded-lg overflow-hidden shadow-sm bg-slate-100 dark:bg-slate-700"
    >
      <div
        class="py-2 px-4 flex justify-center items-center cursor-pointer"
        :class="
          theme === 'light'
            ? 'bg-blue-500 text-slate-100 dark:bg-blue-700 dark:text-slate-200'
            : ''
        "
        @click="setTheme('light')"
      >
        浅色
      </div>
      <div
        class="py-2 px-4 flex justify-center items-center cursor-pointer"
        :class="
          theme === 'dark'
            ? 'bg-blue-500 text-slate-100 dark:bg-blue-700 dark:text-slate-200'
            : ''
        "
        @click="setTheme('dark')"
      >
        深色
      </div>
      <div
        class="py-2 px-4 flex justify-center items-center cursor-pointer"
        :class="
          theme === 'auto'
            ? 'bg-blue-500 text-slate-100 dark:bg-blue-700 dark:text-slate-200'
            : ''
        "
        @click="setTheme('auto')"
      >
        跟随系统
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, inject, ref } from "vue";
import { getDesktopAppearance } from "@/functions/desktop/desktopAppearance";

const props = defineProps({
  setDesktopAppearance: {
    type: Function,
    required: true,
  },
});

const utools = inject("utools");
const theme = ref(getDesktopAppearance().theme);

onMounted(() => {
  setTheme(theme.value);
});

// 设置主题
function setTheme(themeName) {
  theme.value = themeName;
  if (themeName === "auto") {
    utools.isDarkColors()
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  } else if (themeName === "light") {
    document.documentElement.classList.remove("dark");
  } else if (themeName === "dark") {
    document.documentElement.classList.add("dark");
  }
  props.setDesktopAppearance({
    theme: themeName,
  });
}
</script>
<style scoped></style>
