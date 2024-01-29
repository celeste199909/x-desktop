<template>
  <!-- 模块栏 -->
  <div
    v-if="activeModuleNumber > 1"
    id="module-bar"
    class="w-[60px] h-fit select-none hover:backdrop-blur-sm bg-slate-900/40 backdrop-blur-[1px] opacity-20 hover:opacity-100 rounded-[40px] fixed left-6 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-5 p-5 transition-all duration-300 z-50"
  >
    <template v-for="mo in modulesList" :key="mo.name">
      <div
        v-if="mo.active"
        class="w-[40px] h-[40px] p-[6px] overflow-hidden rounded-full cursor-pointer flex justify-center items-center"
        @click="handleSwitchExpand(mo.name)"
      >
        <img
          :src="getAssetsIcon(mo.icon)"
          class="w-full h-full opacity-50 hover:opacity-100 transition-all duration-300"
          :alt="mo.title"
          srcset=""
        />
      </div>
    </template>
    <!-- <div
      class="w-[40px] h-[40px] p-[6px] overflow-hidden rounded-full cursor-pointer flex justify-center items-center"
      @click="handleSwitchExpand('desktop')"
    >
      <img
        src="@/assets/icons/desktop.png"
        class="w-full h-full opacity-50 hover:opacity-100 transition-all duration-300"
        alt="桌面"
        srcset=""
      />
    </div>
    <div
      class="w-[40px] h-[40px] p-1 overflow-hidden rounded-full cursor-pointer flex justify-center items-center"
      @click="handleSwitchExpand('steam')"
    >
      <img
        src="@/assets/icons/steam.png"
        class="w-full h-full opacity-50 hover:opacity-100 transition-all duration-300"
        alt="Steam"
        srcset=""
      />
    </div>
    <div
      class="w-[40px] h-[40px] p-1 overflow-hidden rounded-full cursor-pointer flex justify-center items-center"
      @click="handleSwitchExpand('browser')"
    >
      <img
        src="@/assets/icons/chrome.png"
        class="w-full h-full opacity-50 hover:opacity-100 transition-all duration-300"
        alt="Browser"
        srcset=""
      />
    </div> -->
  </div>
</template>

<script setup>
import { ref, inject, computed } from "vue";

const modulesList = inject("modulesList");
const currentModule = inject("currentModule");

const activeModuleNumber = computed(() => {
  let count = 0;
  modulesList.value.forEach((item) => {
    if (item.active) {
      count++;
    }
  });
  return count;
})

function handleSwitchExpand(moduleName) {
  currentModule.value = moduleName;
}

const getAssetsIcon = (name) => {
  return new URL(`/src/assets/icons/${name}`, import.meta.url).href;
};
</script>
<style scoped></style>
