<!-- 该组件放置屏幕左右两边，检测拖动图标至左右边缘时，切换页面 -->
<template>
    <!-- 左右检测区域 -->
    <VueDraggable :group="{ name: 'side', pull: 'desktop', put: 'desktop' }" :animation="150" v-model="list1"
        id="left-area">
        <div class="side-area absolute z-50 top-0 bottom-0 left-0 w-14"></div>
    </VueDraggable>
    <VueDraggable :group="{ name: 'side', pull: 'desktop', put: 'desktop' }" :animation="150" v-model="list1"
        id="right-area">
        <div class="side-area absolute z-50 top-0 bottom-0 right-0 w-14"></div>
    </VueDraggable>
</template>

<script setup>
import { ref, inject } from 'vue'
// 插件
import { VueDraggable } from 'vue-draggable-plus';

// 注入 来自 App.vue
const isDragging = inject('isDragging')
// 用于左右检测区域
const list1 = ref([])

</script>
<style scoped></style>