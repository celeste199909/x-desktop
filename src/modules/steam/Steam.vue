<template>
  <div
    id="steam"
    class="steam relative h-screen w-screen justify-center items-center flex flex-row overflow-hidden select-none"
  >
    >
    <VueDraggable
      class="w-full h-full p-20 flex flex-row justify-center flex-wrap gap-6 overflow-y-scroll"
      v-model="_steamApps"
      ghostClass="ghost"
    >
      <div
        v-for="item in _steamApps"
        :key="item.id"
        :id="item.id"
        class="card w-52 aspect-[6/9] overflow-hidden cursor-pointer"
        @click="openSteamApp(item.realPath, $event)"
      >
        <div class="card-inner w-full aspect-[6/9] overflow-hidden">
          <img :src="getLocalImage(item.coverPath)" />
        </div>
      </div>
    </VueDraggable>
    <MouseLight />
  </div>
</template>

<script setup>
import { defineProps,ref } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import MouseLight from "./widgets/MouseLight.vue";

const props = defineProps({
  steamApps: {
    type: Array,
    required: true,
  },
});

const _steamApps = ref(props.steamApps);

// 打开 steam 应用
function openSteamApp(realPath, event) {
  event.stopPropagation();
  event.preventDefault();
  utools.shellOpenPath(realPath);
  window.hideDesk();
}

const getLocalImage = (path) => {
  return new URL(path, import.meta.url).href;
};
</script>

<style scoped>
#steam {
  background: radial-gradient(circle at center, #3a475f 0%, #161a1f 100%);
}
.card {
  background-image: linear-gradient(163deg, #946bfa 0%, #4576ff 100%);
  border-radius: 20px;
  transition: all 0.3s;
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
}
.card.ghost {
  opacity: 0;
}

.card-inner {
  background-color: #1a1a1a;
  transition: all 0.2s;
  position: relative;
}
.card-inner::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  right: -100%;
  width: 200%;
  height: 20%;
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.2));
  z-index: 1;
  transform: rotate(30deg) translateY(0);
  transform-origin: top right; /* 设置为右上角 */
}
.card-inner:hover::after {
  animation: shine 0.6s linear;
}

@keyframes shine {
  0% {
    transform: rotate(30deg) translateY(0);
  }
  100% {
    transform: rotate(30deg) translateY(700%);
  }
}

.card-inner:hover {
  transform: scale(0.98);
  border-radius: 20px;
}

.card:hover {
  box-shadow: 0px 0px 40px 1px rgba(58, 147, 255, 0.79);
}

.mouse-light {
  width: 0px;
  height: 0px;
  border-radius: 50%;
  box-shadow: 0px 0px 100px 80px #446eb6ca;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}
</style>
