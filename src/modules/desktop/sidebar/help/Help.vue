<template>
  <!-- 使用说明 -->
  <div class="item w-full my-4">
    <div class="mb-4 font-bold">使用说明</div>
    <div
      class="my-4 text-blue-500 cursor-pointer underline"
      @click="handleClickManual"
    >
      查看说明（在浏览器中打开）
    </div>
    <div class="mb-4 font-bold">隐私</div>
    <div class="my-4">
      <div>本插件仅读取您的选择和允许的目录，并且不会修改（包括复制，移动，编辑等）它们，也不会将它们上传，请放心使用！</div>
    </div>
    <div class="mb-4 font-bold">其它</div>
    <div class="my-4">
      <div>如果您希望软件变得更好，烦请给个好评。</div>
      <div>您的支持是我最大的动力！</div>
      <div>感谢使用！祝您新年快乐！🎉</div>
    </div>
  </div>
</template>

<script setup>
function handleClickManual() {
  utools.shellOpenExternal("https://sourl.cn/dgwfig");
  window.hideDesk();
}
</script>
<style scoped></style>
