<template>
    <div id="page-indicator" class="page-indicator flex justify-center gap-2 absolute z-50 bottom-20 left-1/2 -translate-x-1/2">
        <div v-for="(page, index) in pages" class="w-3 h-3 rounded-full"
            :class="[currentPage === index ? 'bg-white/90' : 'bg-white/50']" @click="moveToPage({ pageIndex: index })">
        </div>
    </div>
</template>

<script setup>
import { inject, defineProps } from 'vue'

const pages = inject("pages");
const props = defineProps({
    currentPage: {
        type: Number,
        default: 0,
    },
});

const moveToPage = inject("moveToPage");

</script>
<style scoped></style>