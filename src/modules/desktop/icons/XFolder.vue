<template>
    <Teleport :disabled="isContract" to="body">
        <div class="xfolder relative transition-all" :class="[xfolderClassName, { 'border': xfolder.isSearchTarget }, {draggable:!isDragging}]">
            <!-- 图标列表 -->
            <!-- :disabled="isContract" -->
            <VueDraggable class="xfolder-icons" :id="'draggable-area-' + xfolder.id" :group="{name:'xfolder',put:'desktop',pull:'desktop'}" :animation="150" ref="el"
                v-model="xfolder.icons" :disabled="isContract && !isDragging" @move="onMove" @sort="onSort" @start="onStart" @end="onEnd" @click="expandXfolder">
                <Application v-for="item in xfolder.icons" :key="item.id" :icon="item"
                    :place="isContract ? 'in-contract-xfolder' : 'in-expand-xfolder'" />
            </VueDraggable>
            <div class="xfolder-name">
                <div>{{ xfolder.name }}</div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { defineProps, ref, inject, computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import Application from "./Application.vue";

defineProps({
    xfolder: {
        type: Object,
        required: true
    }
})

const isContract = ref(true);

// 注入
const layout = inject('layout')
const pages = inject('pages')
const currentPage = inject('currentPage')

const isDragging = inject('isDragging')

// 文件夹的样式
const xfolderClassName = computed(() => {
    return isContract.value ? "contract-xfolder" : "expand-xfolder";
})

function expandXfolder(event) {
    event.stopPropagation();
    if (isContract.value) {
        console.log("click contract xfolder");
        isContract.value = false;
    }
}


function onMove(event) {
    console.log("onMove xfolder", event);
    const toPageIndex = parseInt(event.to.id.split('-').pop());
    // 不是同一个页面，且拖动至页面区域
    if (event.from.id !== event.to.id && event.to.className === 'draggable-area') {
        // 收起文件夹
        console.log("收起文件夹");
        isContract.value = true;
        event.dragged.className = "icon on-desktop"
        // event.dragged.children[0].className = "icon-image on-desktop"
        // event.dragged.children[0].className = "icon-name on-desktop"

        // console.log("toPageIndex", toPageIndex);
        // console.log("pages[toPageIndex]", pages.value[toPageIndex]);
        if (pages.value[toPageIndex].length >= layout.value.pageCapacity) {
            // console.log("toPageIndex", toPageIndex);
            // console.log("pages[toPageIndex]", pages[toPageIndex]);
            // 放回原位
            console.log("页面已满");
            return false; // 拒绝添加到 area 中
        }
    }

    if (event.to.id === 'right-area') {
        if (currentPage.value < pages.value.length - 1) {
            currentPage.value++;
        }
        return false; // 拒绝添加到 area 中
    }
    if (event.to.id === 'left-area') {
        if (currentPage.value > 0) {
            currentPage.value--;
        }
        return false; // 拒绝添加到 area 中
    }
}

function onSort(event) {
    console.log("onSort xfolder", event);
    console.log("pages.value xfolder", pages.value);
}

function onStart() {
    console.log("onStart xfolder");
}

function onEnd() {
    console.log("onEnd xfolder");
}

// 点击其它地方，收起文件夹
window.addEventListener('click', function (event) {
    if (!isContract.value && event.target.className !== 'xfolder expand-xfolder') {
        isContract.value = true;
    }
})

</script>
<style scoped>
.xfolder.sortable-ghost {
    opacity: 0;
}

.icon-image:hover {
    filter: drop-shadow(0 0 1rem rgba(255, 255, 255, 0.5));
}


/* 收起的文件夹 */
.xfolder.contract-xfolder {
    width: 110px;
    height: 110px;
    /* padding: 1rem; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    user-select: none;
}

.xfolder.contract-xfolder .xfolder-icons {
    width: 54px;
    height: 54px;
    margin: 10px;
    /* padding: 5px; */
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    border: 1px solid #aaa;
    border-radius: 0.5rem;
}

.xfolder.contract-xfolder .xfolder-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-align: center;
    font-size: 0.875rem;
    line-height: 0.875rem;
    width: 100%;
}

/* 展开的文件夹 */
.xfolder.expand-xfolder {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;
    user-select: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.82);
    border-radius: 0.5rem;
    /* padding: 1rem; */
    z-index: 100;
    border: 1px solid #aaa;
}

.xfolder.expand-xfolder .xfolder-icons {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 0.5rem;
}

.xfolder.expand-xfolder .xfolder-name {
    display: inline-block;
}
</style>