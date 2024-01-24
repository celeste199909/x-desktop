import { ref, inject, computed } from "vue";
// import _ from "lodash";

export function useSelectSearchTarget(pagedIcons, currentPage, moveToPage, isOnQuickSearchMode, timer ) {
  console.log("useSelectSearchTarget",pagedIcons, currentPage, moveToPage, isOnQuickSearchMode, timer);
  const utools = inject("utools");

  const selectedTargetIndex = ref(0);
  const searchTargetList = computed(() => {
    let list = [];
    pagedIcons.forEach((page) => {
      page.forEach((item) => {
        if (item.isSearchTarget) {
          list.push(item);
        }
      });
    });
    return list;
  });

  //  切换选中的搜索目标
  window.addEventListener("keydown", (e) => {
    if (!isOnQuickSearchMode.value) {
      return;
    }
    // 如果不是上下箭头，直接返回
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
      return;
    }
    // 如果是上下箭头，阻止默认事件
    e.preventDefault();
    // 重置计时器
    clearTimeout(timer.value);
    timer.value = setTimeout(() => {
      isOnQuickSearchMode.value = false;
    }, 6000);
    // 如果是下箭头，切换到下一个搜索目标
    if (e.key === "ArrowDown") {
      // 移到下一个搜索目标
      selectedTargetIndex.value++;
      if (selectedTargetIndex.value >= searchTargetList.value.length) {
        selectedTargetIndex.value = 0;
      }
      const nextTargetId = searchTargetList.value[selectedTargetIndex.value].id;
      const nextTargetPageIndex = pagedIcons.value.findIndex((page) => {
        return page.some((item) => item.id === nextTargetId);
      });

      pagedIcons.value.forEach((page) => {
        page.forEach((item) => {
          if (item.id === nextTargetId) {
            item.isSelected = true;
          } else {
            item.isSelected = false;
          }
        });
      });

      if (nextTargetPageIndex !== currentPage.value) {
        moveToPage({ pageIndex: nextTargetPageIndex });
      }
    }
    // 如果是上箭头，切换到上一个搜索目标
    if (e.key === "ArrowUp") {
      // 移到上一个搜索目标
      selectedTargetIndex.value--;
      if (selectedTargetIndex.value < 0) {
        selectedTargetIndex.value = searchTargetList.value.length - 1;
      }
      const nextTargetId = searchTargetList.value[selectedTargetIndex.value].id;
      const nextTargetPageIndex = pagedIcons.value.findIndex((page) => {
        return page.some((item) => item.id === nextTargetId);
      });

      pagedIcons.value.forEach((page) => {
        page.forEach((item) => {
          if (item.id === nextTargetId) {
            item.isSelected = true;
          } else {
            item.isSelected = false;
          }
        });
      });

      if (nextTargetPageIndex !== currentPage.value) {
        moveToPage({ pageIndex: nextTargetPageIndex });
      }
    }
  });

  //  空格打开选中的搜索目标
  window.addEventListener("keydown", (e) => {
    // 如果不是空格或者搜索目标数组为空，直接返回
    if (e.key !== " " || searchTargetList.value.length === 0) {
      return;
    }
    // 如果是空格，阻止默认事件
    e.preventDefault();
    // 如果是空格，打开选中的搜索目标
    const id = searchTargetList.value[selectedTargetIndex.value].id;
    pagedIcons.value.forEach((page) => {
      page.forEach((item) => {
        if (item.id === id) {
          utools.shellOpenPath(item.realPath);
          window.hideDesk();
        }
      });
    });
  });

  function selectFirstTarget() {
    console.log("selectFirstTarget",isOnQuickSearchMode);
    selectedTargetIndex.value = 0;
    if (isOnQuickSearchMode.value && searchTargetList.value.length > 0) {
      console.log("searchTargetList", searchTargetList.value);
      console.log("selectedTargetIndex", selectedTargetIndex.value);
      // 如果是在快速搜索状态下，且有搜索目标，选中第一个搜索目标
      const id = searchTargetList.value[selectedTargetIndex.value].id;
      pagedIcons.value.forEach((page) => {
        page.forEach((item) => {
          if (item.id === id) {
            item.isSelected = true;
          } else {
            item.isSelected = false;
          }
        });
      });
    }
  }

  return { selectFirstTarget };
}
