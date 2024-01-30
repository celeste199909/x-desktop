<template>
  <div id="desktop" class="relative w-screen h-screen bg-transparent">
    <!-- 页面 -->
    <div id="view" class="w-screen h-screen overflow-hidden flex flex-col">
      <div id="pages" class="h-full w-fit flex flex-row items-center">
        <Page
          v-for="(page, index) in pagedIcons"
          :id="'page-' + index"
          :key="index"
          :pagedIcons="pagedIcons"
          :pageIndex="index"
          :currentPage="currentPage"
          @setCurrentPage="setCurrentPage"
          :isDragging="isDragging"
          @setIsDragging="setIsDragging"
          :isOnQuickSearchMode="isOnQuickSearchMode"
          :moveToPage="moveToPage"
          :saveNowSortInfo="saveNowSortInfo"
        />
      </div>
    </div>
    <!-- 侧边栏-->
    <Sidebar
      :isShowSidebar="isShowSidebar"
      :setDesktopAppearance="setDesktopAppearance"
      :setDesktopFunction="setDesktopFunction"
      :addPath="addPath"
      :removePath="removePath"
      :activePath="activePath"
      :inactivePath="inactivePath"
      :foldPath="foldPath"
      :unfoldPath="unfoldPath"
      :saveNowSortInfo="saveNowSortInfo"
    />
    <!-- 右键菜单 -->
    <ContextMenu
      :isShowContextMenu="isShowContextMenu"
      @showContextMenu="showContextMenu"
      :isShowSidebar="isShowSidebar"
      @showSidebar="showSidebar"
      :pagedIcons="pagedIcons"
      :currentPage="currentPage"
      :moveToPage="moveToPage"
      :addPage="addPage"
      :removePage="removePage"
    />
    <!-- 页面指示器 -->
    <PageIndicator
      :currentPage="currentPage"
      :pagedIcons="pagedIcons"
      :moveToPage="moveToPage"
    />
    <!-- 左右检测区域 -->
    <SideArea />
    <!-- 快速搜索 -->
    <QuickSearch
      :pagedIcons="pagedIcons"
      :currentPage="currentPage"
      :moveToPage="moveToPage"
      :isOnQuickSearchMode="isOnQuickSearchMode"
      @setIsOnQuickSearchMode="setIsOnQuickSearchMode"
    />
  </div>
</template>

<script setup>
import { inject, ref, onBeforeMount, provide } from "vue";
// 组件
import Page from "@/modules/desktop/widgets/Page.vue";
import PageIndicator from "@/modules/desktop/widgets/PageIndicator.vue";
import SideArea from "@/modules/desktop/widgets/SideArea.vue";
import QuickSearch from "@/modules/desktop/widgets/QuickSearch.vue";
import Sidebar from "@/modules/desktop/sidebar/Sidebar.vue";
import ContextMenu from "@/modules/desktop/contextmenu/ContextMenu.vue";
// 组合式函数
import { useWheelToPage } from "@/modules/desktop/composables/wheelToPage.js";
import { useMoveToPage } from "@/modules/desktop/composables/moveToPage.js";
// 工具
import {
  getDesktopAppearance,
  getDesktopLayout,
} from "@/functions/desktop/desktopAppearance";
import { getDesktopFunction } from "@/functions/desktop/desktopFunction";
import { getDesktopSortInfo } from "@/functions/desktop/desktopSortInfo";
// 更新排序
import { handleRawIcons } from "@/functions/desktop/handleRawIcons";
// showToast
import showToast from "@/components/toast/index";
import _ from "lodash";

// 来自 App.vue
const currentModule = inject("currentModule");
const icons = ref({});
const pagedIcons = ref([]);
const isExpandXFolder = ref(false);
provide("isExpandXFolder", isExpandXFolder);

onBeforeMount(() => {
  init();
});

async function init() {
  const allIcons = await loadAllIcons();
  icons.value = _.cloneDeep(allIcons);
  console.log(
    "%c [ 初始化 所有图标 ]-93",
    "font-size:13px;  background:green; color:white;",
    allIcons
  );
  const paged = paginateIcons(_.cloneDeep(allIcons));
  pagedIcons.value = paged;
  // // 保存排序信息
  // saveNowSortInfo();
  console.log(
    "%c [ 初始化 分页图标 ]-113",
    "font-size:13px; background:green; color:white;",
    pagedIcons.value
  );
}

// 所有路径的图标
// 分页用于展示的图标
function paginateIcons(icons) {
  // 获取本地 iconPaths
  const iconPaths = getDesktopFunction().iconPaths;
  // 获取页面容量
  const pageSize = getDesktopLayout().pageSize;
  // 排序信息
  const sortInfo = getDesktopSortInfo();
  // console.log(
  //   "%c [ 开始排序分页 ]-125",
  //   "font-size:13px; background:pink; color:#bf2c9f;",
  //   sortInfo
  // );
  let _icons = { ...icons };
  // 如果有排序信息，则按照排序信息排序
  if (sortInfo.length > 0) {
    let pages = [];
    // 根据 sortInfo 对页面进行排序
    sortInfo.forEach((pageSortInfo) => {
      let page = [];
      pageSortInfo.forEach((iconSortInfo) => {

        if (iconSortInfo.type === "xfolder") {
          // 根据 sortInfo 对 xfolder 中的图标进行排序
          const xfolderSortInfo = iconSortInfo.sortInfo;
          const xfolderIcons = [];
          xfolderSortInfo.forEach((iconSortInfo) => {
            const pathId = iconSortInfo.fromPathId;
            const icon = _icons[pathId].find((icon) => {
              return icon.rawName === iconSortInfo.rawName;
            });
            if (icon) xfolderIcons.push(icon);
            // 从 _icons 中删除该图标
            const index = _.findIndex(_icons[pathId], { rawName: iconSortInfo.rawName });
            _icons[pathId].splice(index, 1);

          });
          const pathId = iconSortInfo.id;
          // make xfolder
          const xfolder = {
            type: "xfolder",
            id: pathId,
            name: iconSortInfo.name,
            path: iconSortInfo.path,
            isFolded: true,
            sortInfo: iconSortInfo.sortInfo,
            icons: xfolderIcons,
            searchKeywords: iconSortInfo.searchKeywords,
          };
          page.push(xfolder);
        } else {
          const pathId = iconSortInfo.fromPathId;
          const icon = _icons[pathId].find((icon) => {
            return icon.rawName === iconSortInfo.rawName;
          });
          if (icon){
            page.push(icon);
            // 从 _icons 中删除该图标
            const index = _.findIndex(_icons[pathId], { rawName: iconSortInfo.rawName });
            _icons[pathId].splice(index, 1);

          }
        }
      });
      pages.push(page);
    });
    // 把所有剩余的图标放到一个数组中
    let _iconsArr = [];
    for (const key in _icons) {
      _iconsArr = [..._iconsArr, ..._icons[key]];
    }
    console.log('%c [ 剩余图标_iconsArr ]-189', 'font-size:13px; background:pink; color:#bf2c9f;', _iconsArr)
    // 将剩余的图标添加到最后有空位的页面
    _iconsArr.forEach((icon) => {
      let currentPage = pages.length - 1;
      if (pages[currentPage].length < pageSize) {
        pages[currentPage].push(icon);
      } else {
        pages.push([]);
        currentPage++;
        pages[currentPage].push(icon);
      }
    });
    
    // 返回 pages
    return pages;
  } else {
    // 如果没有排序信息
    let pages = [];
    let page = [];
    iconPaths.forEach((path) => {
      const pathId = path.id;
      const thePathIcons = [..._icons[pathId]];
      const isFolded = path.isFolded;
      const isActive = path.active;
      // 如果路径未激活，则跳过
      if (!isActive) return;
      // 如果路径被收纳，则创建文件夹
      if (isFolded) {
        // make xfolder
        const xfolder = {
          type: "xfolder",
          id: path.id,
          name: path.name,
          path: path.path,
          isFolded: true,
          sortInfo: path.sortInfo,
          icons: thePathIcons,
          searchKeywords: path.searchKeywords,
        };
        if (page.length < pageSize) {
          page.push(xfolder);
        } else {
          pages.push(page);
          page = [];
          page.push(xfolder);
        }
      } else {
        // 如果路径未被收纳，则创建图标
        for (let i = 0; i < thePathIcons.length; i++) {
          const icon = {
            type: "icon",
            ...thePathIcons[i],
          };
          // 如果当前页未满，则添加到当前页
          if (page.length < pageSize) {
            page.push(icon);
          } else {
            pages.push(page);
            page = [];
            page.push(icon);
          }
        }
      }
    });
    pages.push(page);
    return pages;
  }
}

async function loadAllIcons() {
  return new Promise(async (resolve, reject) => {
    const icons = {};
    const iconPaths = getDesktopFunction().iconPaths;
    for (let i = 0; i < iconPaths.length; i++) {
      const path = iconPaths[i];
      const handledIcons = await loadIcons(path);
      icons[path.id] = handledIcons;
    }
    resolve(icons);
  });
}

async function loadIcons(path) {
  const rawIcons = await window.getIconsByPath(path);
  const handledIcons = handleRawIcons(rawIcons);
  return handledIcons;
}

// 添加路径
async function addPath(path) {
  // 将该路径下的图标添加到 icons 中
  const handledIcons = await loadIcons(path);
  icons.value[path.id] = handledIcons;
  console.log(
    "%c [ 添加新路径 ]-157",
    "font-size:13px; background:pink; color:#bf2c9f;",
    icons.value
  );
}

// 删除路径
function removePath(path) {
  // 如果只有一页，则不删除
  if (pagedIcons.value.length === 1) {
    showToast("至少保留一个路径");
    return;
  }
  // 1 如果该路径下的图标已经被收纳，则在pagedIcons找到该图标所在的文件夹，删除该文件夹
  // 此前已调用 inactivePath ，将该路径下的图标已从 pagedIcons 中删除
  const pathId = path.id;
  const isFolded = path.isFolded;
  if (isFolded) {
    pagedIcons.value = pagedIcons.value.map((page) => {
      const newPage = page.filter((obj) => {
        if (obj.type === "xfolder" && obj.id === pathId) {
          return false;
        } else {
          return true;
        }
      });
      return newPage;
    });
  }
  // 2 将该路径下的图标从 icons 中删除
  delete icons.value[pathId];
  console.log(
    "%c [ 删除路径 ]-163",
    "font-size:13px; background:pink; color:#bf2c9f;",
    icons.value
  );
  saveNowSortInfo();
}

// 启用路径
async function activePath(path) {
  // 将该路径下的图标添加到 pagedicons中
  const handledIcons = await loadIcons(path);
  const pageSize = getDesktopLayout().pageSize;
  const _handledIcons = [...handledIcons];
  const isFolded = path.isFolded;
  if (isFolded) {
    // make xfolder
    const xfolder = {
      type: "xfolder",
      id: path.id,
      name: path.name,
      path: path.path,
      isFolded: true,
      sortInfo: path.sortInfo,
      icons: _handledIcons,
      searchKeywords: path.searchKeywords,
    };
    let currentPage = pagedIcons.value.length - 1;
    if (pagedIcons.value[currentPage].length < pageSize) {
      pagedIcons.value[currentPage].push(xfolder);
    } else {
      pagedIcons.value.push([]);
      currentPage++;
      pagedIcons.value[currentPage].push(xfolder);
      moveToPage({ pageIndex: currentPage });
    }
  } else {
    _handledIcons.forEach((icon) => {
      let currentPage = pagedIcons.value.length - 1;
      if (pagedIcons.value[currentPage].length < pageSize) {
        pagedIcons.value[currentPage].push(icon);
      } else {
        pagedIcons.value.push([]);
        currentPage++;
        pagedIcons.value[currentPage].push(icon);
        moveToPage({ pageIndex: currentPage });
      }
    });
  }

  console.log(
    "%c [ 启用路径 ]-157",
    "font-size:13px; background:pink; color:#bf2c9f;",
    pagedIcons.value
  );
  saveNowSortInfo();
}

// 不启用路径
function inactivePath(path) {
  const remveId = path.id;
  // 如果该路径下的图标已经被收纳，则在pagedIcons找到该图标所在的文件夹，删除该文件夹
  const isFolded = path.isFolded;
  if (isFolded) {
    pagedIcons.value = pagedIcons.value.map((page) => {
      const newPage = page.filter((obj) => {
        if (obj.type === "xfolder" && obj.id === remveId) {
          return false;
        } else {
          return true;
        }
      });
      return newPage;
    });
  } else {
    // 如果该路径下的图标未被收纳，则在pagedIcons找到该图标，删除该图标
    // // 将该路径下的图标从 pagedicons中删除
    const newpagedIcons = pagedIcons.value.map((page) => {
      return page.filter((icon) => {
        return icon.fromPathId !== remveId;
      });
    });
    pagedIcons.value = newpagedIcons;
  }

  // 如果有空页面，则删除
  pagedIcons.value = pagedIcons.value.filter((page) => {
    return page.length > 0;
  });

  // 如果当前页是最后一页，则切换至前一页
  if (currentPage.value === pagedIcons.value.length) {
    moveToPage({ pageIndex: currentPage.value - 1, transition: true });
  }
  console.log(
    "%c [ 不启用路径 ]-157",
    "font-size:13px; background:pink; color:#bf2c9f;",
    pagedIcons.value
  );
  saveNowSortInfo();
}

// 收纳到文件夹中
function foldPath(path) {
  // const pathModel = {
  //   active: true,
  //   id: "desktop",
  //   isFolded: true,
  //   name: "桌面",
  //   path: "C:\\Users\\celeste\\Desktop",
  //   sortInfo: [],
  // };
  // 如果还没有启用，提示先启用
  if (!path.active) {
    showToast("请先启用该路径");
    return;
  }
  // 从 pagedIcons 中获取路径下的图标，移到文件夹中
  const pathId = path.id;
  const thePathIcons = [];
  pagedIcons.value = pagedIcons.value.map((page) => {
    const newPage = page.filter((icon) => {
      if (icon.fromPathId === pathId) {
        thePathIcons.push(icon);
        return false;
      } else {
        return true;
      }
    });
    return newPage;
  });

  // 新建文件夹，添加到 pagedIcons 中
  // make xfolder
  const xfolder = {
    type: "xfolder",
    id: path.id,
    name: path.name,
    path: path.path,
    isFolded: false,
    sortInfo: path.sortInfo,
    icons: thePathIcons,
    searchKeywords: path.searchKeywords,
  };
  const pageSize = getDesktopLayout().pageSize;
  let _currentPage = pagedIcons.value.length - 1;

  if (pagedIcons.value[_currentPage].length < pageSize) {
    pagedIcons.value[_currentPage].push(xfolder);
  } else {
    pagedIcons.value.push([]);
    _currentPage++;
    pagedIcons.value[_currentPage].push(xfolder);
    moveToPage({ pageIndex: _currentPage });
  }
  // 把 iocnPaths 中的路径isFolded设置为 true
  const iconPaths = getDesktopFunction().iconPaths;
  const index = _.findIndex(iconPaths, { id: pathId });
  iconPaths[index].isFolded = true;
  // 如果有空页面，则删除
  pagedIcons.value = pagedIcons.value.filter((page) => {
    return page.length > 0;
  });
  // 如果当前页是最后一页，则切换至前一页
  if (currentPage.value === pagedIcons.value.length) {
    moveToPage({ pageIndex: currentPage.value - 1, transition: true });
  }
  setDesktopFunction({ iconPaths: iconPaths });

  console.log(
    "%c [ 收纳到文件夹中 ]-176",
    "font-size:13px; background:pink; color:#bf2c9f;",
    getDesktopFunction()
  );
  console.log(
    "%c [ 收纳的图标 ]-176",
    "font-size:13px; background:pink; color:#bf2c9f;",
    xfolder
  );
  saveNowSortInfo();
}

// 从文件夹中释放
function unfoldPath(path) {
  // 找到 pagedIcons 中type 为 xfolder 且 id 为 path.id 的图标，移到桌面中
  const pathId = path.id;
  let thePathIcons = [];
  pagedIcons.value = pagedIcons.value.map((page) => {
    const newPage = page.filter((obj) => {
      if (obj.type === "xfolder" && obj.id === pathId) {
        thePathIcons = [...obj.icons];
        return false;
      } else {
        return true;
      }
    });
    return newPage;
  });
  // 将图标添加到 pagedIcons 中
  const pageSize = getDesktopLayout().pageSize;
  const _thePathIcons = [...thePathIcons];
  _thePathIcons.forEach((icon) => {
    let currentPage = pagedIcons.value.length - 1;
    if (pagedIcons.value[currentPage].length < pageSize) {
      pagedIcons.value[currentPage].push(icon);
    } else {
      pagedIcons.value.push([]);
      currentPage++;
      pagedIcons.value[currentPage].push(icon);
      moveToPage({ pageIndex: currentPage });
    }
  });
  // 把 iocnPaths 中的路径isFolded设置为 false
  const iconPaths = getDesktopFunction().iconPaths;
  const index = _.findIndex(iconPaths, { id: pathId });
  iconPaths[index].isFolded = false;
  setDesktopFunction({ iconPaths: iconPaths });

  console.log(
    "%c [ 从文件夹中释放 ]-176",
    "font-size:13px; background:pink; color:#bf2c9f;",
    getDesktopFunction()
  );
  saveNowSortInfo();
}
// --- 桌面外观
function setDesktopAppearance(updateObj) {
  const newDesktopAppearance = {
    ...getDesktopAppearance(),
    ...updateObj,
  };
  utools.dbStorage.setItem(
    "desktopAppearance",
    JSON.parse(JSON.stringify(newDesktopAppearance))
  );
  console.log(
    "%c [ 桌面外观设置更新, 已保存至本地 ]-166",
    "font-size:13px; background:blue; color:white;",
    getDesktopAppearance()
  );
}

// --- 桌面功能
function setDesktopFunction(updateObj) {
  const newDesktopFunction = {
    ...getDesktopFunction(),
    ...updateObj,
  };
  utools.dbStorage.setItem(
    "desktopFunction",
    JSON.parse(JSON.stringify(newDesktopFunction))
  );
  console.log(
    "%c [ 桌面 function 设置更新, 已保存至本地 ]-173",
    "font-size:13px; background:blue; color:white;",
    getDesktopFunction()
  );
}

// 桌面排序信息
const desktopSortInfo = ref(getDesktopSortInfo()); // 本地 desktopSortInfo

function setDesktopSortInfo(newVal) {
  desktopSortInfo.value = newVal;
  utools.dbStorage.setItem(
    "desktopSortInfo",
    JSON.parse(JSON.stringify(newVal))
  );

  console.log(
    "%c [ 保存桌面排序信息 ]-480",
    "font-size:13px; background:green; color:white;",
    getDesktopSortInfo()
  );
}

function saveNowSortInfo() {
  const nowSortInfo = [];
  pagedIcons.value.forEach((page) => {
    const pageSortInfo = [];
    page.forEach((obj) => {
      let iconSortInfo = {};
      if (obj.type === "xfolder") {
        const xfolderSortInfo = [];
        obj.icons.forEach((icon) => {
          xfolderSortInfo.push({
            type: "icon",
            rawName: icon.rawName,
            fromPathId: icon.fromPathId,
          });
        });
        // make xfolder
        iconSortInfo = {
          type: "xfolder",
          id: obj.id,
          name: obj.name,
          path: obj.path,
          isFolded: obj.isFolded,
          sortInfo: xfolderSortInfo,
          // icons: obj.icons,
          searchKeywords: obj.searchKeywords,
        };
      } else {
        iconSortInfo = {
          type: "icon",
          rawName: obj.rawName,
          fromPathId: obj.fromPathId,
        };
      }
      pageSortInfo.push(iconSortInfo);
    });
    nowSortInfo.push(pageSortInfo);
  });
  setDesktopSortInfo(nowSortInfo);
}
// 更新排序信息
// const { updateSortInfo } = useUpdateSortInfo(pagedIcons, setDesktopSortInfo);

// 当前页
const currentPage = ref(0); // 当前页 emit: setCurrentPage
function setCurrentPage(value) {
  currentPage.value = value;
}

// 添加页面
function addPage() {
  const newPage = [];
  pagedIcons.value.push(newPage);
  moveToPage({ pageIndex: currentPage.value, transition: false });
  saveNowSortInfo();
}

// 删除页面
function removePage() {
  // 如果只有一页，则不删除
  if (pagedIcons.value.length === 1) {
    showToast("至少保留一个页面");
    return;
  }
  // 如果不为空，则不删除
  if (pagedIcons.value[currentPage.value].length > 0) {
    showToast("页面不为空，不能删除");
    return;
  }
  // 删除当前页
  pagedIcons.value.splice(currentPage.value, 1);
  // 如果当前页是最后一页，则切换至前一页
  if (currentPage.value === pagedIcons.value.length) {
    moveToPage({ pageIndex: currentPage.value - 1, transition: true });
  }
  saveNowSortInfo();
}

// 翻页功能
const { moveToPage } = useMoveToPage(pagedIcons, setCurrentPage);
useWheelToPage(
  currentModule,
  pagedIcons,
  currentPage,
  moveToPage,
  isExpandXFolder
); // 滚轮翻页

// 右键菜单显隐
const isShowContextMenu = ref(false); // 右键菜单 emit: showContextMenu
function showContextMenu(value) {
  isShowContextMenu.value = value;
}

// 侧边栏显隐
const isShowSidebar = ref(false); // 侧边栏 emit: showSidebar
function showSidebar(value) {
  isShowSidebar.value = value;
}

// 是否处于拖拽状态
const isDragging = ref(false); // 用于控制拖拽时的样式（背景） emit: setIsDragging
function setIsDragging(value) {
  isDragging.value = value;
}

// 是否处于快速搜索模式
const isOnQuickSearchMode = ref(false); // 搜索模式 emit: setIsOnQuickSearchMode
function setIsOnQuickSearchMode(value) {
  isOnQuickSearchMode.value = value;
}
</script>
<style scoped></style>
