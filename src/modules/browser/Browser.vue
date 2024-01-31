
<template>
  <div
    id="browser"
    class="relative text-slate-200 w-full h-full bg-blue-950 justify-center items-center flex flex-row overflow-hidden"
  >
    浏览器书签
    {{ chromeBookmarks }}
    <div v-for="item in chromeBookmarks"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, onBeforeMount } from "vue";
import _ from "lodash";

const chromeBookmarks = ref([]);
const edgeBookmarks = ref([]);

onBeforeMount(async () => {
  // 获取 chrome 书签
  const chrome = await window.getChromeBookmarks()
  chromeBookmarks.value = _.cloneDeep(chrome)
  console.log('%c [ chrome bookmarks ]-21', 'font-size:13px; background:pink; color:#bf2c9f;', chrome)
  // 获取 edge 书签
  const edge = await window.getEdgeBookmarks()
  edgeBookmarks.value = _.cloneDeep(edge)
  console.log('%c [ edge bookmarks ]-21', 'font-size:13px; background:pink; color:#bf2c9f;', edge)
});
</script>

<style scoped></style>
