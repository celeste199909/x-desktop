<template>
  <div class="item w-full my-4">
    <div class="mb-4 font-bold">主题</div>
    <div
      class="flex flex-row w-fit items-center rounded-lg overflow-hidden shadow-sm bg-slate-100 dark:bg-slate-700"
    >
      <div
        class="py-2 px-4 flex justify-center items-center cursor-pointer"
        :class="
          desktopAppearance.theme === 'light'
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
          desktopAppearance.theme === 'dark'
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
          desktopAppearance.theme === 'auto'
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
import { onMounted, defineProps, inject } from "vue";

const props = defineProps({
  desktopAppearance: {
    type: Object,
    required: true,
  },
  setDesktopAppearance: {
    type: Function,
    required: true,
  },
});

const utools = inject("utools");

onMounted(() => {
  setTheme(props.desktopAppearance.theme);
});

// // 设置主题
function setTheme(theme) {
  if (theme === "auto") {
    utools.isDarkColors()
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  } else if (theme === "light") {
    document.documentElement.classList.remove("dark");
  } else if (theme === "dark") {
    document.documentElement.classList.add("dark");
  }
  const newDesktopAppearance = {
    ...props.desktopAppearance,
    theme: theme,
  };
  props.setDesktopAppearance(newDesktopAppearance);
}
</script>
<style scoped></style>
