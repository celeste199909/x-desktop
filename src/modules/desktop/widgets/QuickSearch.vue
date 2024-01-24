<template>
  <div
    v-if="isOnQuickSearchMode && inputText"
    class="fixed top-3 w-fit h-14 backdrop-blur-sm text-slate-900 bg-slate-200/90 dark:text-slate-200 dark:bg-slate-900/90 text-slate-10 font-bold tracking-widest px-6 flex justify-center items-center border rounded-2xl border-slate-500 left-1/2 -translate-x-1/2 transition-all"
  >
    {{ inputText }}
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, defineProps, defineEmits,computed } from "vue";
// 组合式函数

const props = defineProps({
  pagedIcons: {
    type: Array,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 0,
  },
  moveToPage: {
    type: Function,
    required: true,
  },
  isOnQuickSearchMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["setIsOnQuickSearchMode"]);

const inputText = ref("");
let timer = ref(null);

// 监听键盘事件
function quickSearch(event) {
  const keyCode = event.keyCode || event.which;
  if (!isAllowedKey(keyCode)) return;

  clearTimeout(timer.value);
  if (!props.isOnQuickSearchMode) {
    emit("setIsOnQuickSearchMode", true);
  }

  // 如果是退格键，删除最后一个字符
  if (keyCode === "Backspace" || keyCode === 8) {
    inputText.value = inputText.value.slice(0, -1);
    // 如果删除完了，隐藏
    if (!inputText.value) {
      emit("setIsOnQuickSearchMode", false);
    }
    updataSearchTarget();
    return;
  }

  // 字母、数字, 拼接字符串
  inputText.value += event.key;

  timer.value = setTimeout(() => {
    inputText.value = "";
    emit("setIsOnQuickSearchMode", false);
  }, 6000);

  updataSearchTarget();
}

onMounted(() => {
  window.addEventListener("keydown", quickSearch);
});
onUnmounted(() => {
  window.removeEventListener("keydown", quickSearch);
});

// 更新搜索结果
function updataSearchTarget() {
  props.pagedIcons.forEach((page, pageIndex) => {
    page.forEach((element, index) => {
      // 如果输入内容为空，返回
      if (!inputText.value) {
        if (element.isSearchTarget) element.isSearchTarget = false;
        return;
      }
      //  如果搜索关键字包含输入内容，设置为搜索目标
      if (
        element.searchKeywords.some((keyword) =>
          keyword.includes(inputText.value)
        )
      ) {
        element.isSearchTarget = true;
      } else {
        element.isSearchTarget = false;
      }
    });
  });
  // selectFirstTarget();
}

function isAllowedKey(keyCode) {
  return (
    (keyCode >= 48 && keyCode <= 57) || // 数字
    (keyCode >= 65 && keyCode <= 90) || // 大写字母
    (keyCode >= 97 && keyCode <= 122) || // 小写字母
    keyCode === 8
  ); // 退格

  // keyCode === 32 || // 空格
}
</script>
<style scoped></style>
