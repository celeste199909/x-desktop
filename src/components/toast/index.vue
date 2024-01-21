<template>
    <div v-if="isShow"
        class="toast fixed top-3 w-fit h-14 backdrop-blur-sm text-slate-900 bg-slate-200/90 dark:text-slate-200 dark:bg-slate-900/90 text-slate-10 font-bold tracking-widest px-6 flex justify-center items-center border rounded-2xl border-slate-500 left-1/2 -translate-x-1/2 transition-all">
        {{ msg }}
    </div>
</template>
  
<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    msg: {
        type: String,
        default: 'message',
    },
    duration: {
        type: Number,
        default: 1500
    }
})

const isShow = ref(props.show)
const emit = defineEmits(['update:show'])

watch(() => props.show, (newVal, oldVal) => {
    isShow.value = newVal
    if (newVal) {
        clearInterval(timer)
        var timer = setTimeout(() => {
            isShow.value = false
            emit('update:show', false)
        }, props.duration)
    }
})
</script>
  
<style scoped>
</style>
  