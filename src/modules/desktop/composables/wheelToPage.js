import { onMounted } from "vue";


/**
 * @description: 滚轮滚动到上一页或下一页
 * @param {String} currentModule 当前模块
 * @param {Array} pages 页面数组
 * @param {Number} currentPage 当前页面
 * @param {Function} moveToPage 切换页面方法
 * @return {*}
 */
export function useWheelToPage(currentModule, pages, currentPage, moveToPage ) {

    onMounted(() => {
        document.addEventListener("wheel", wheelToPage);
    });

    function wheelToPage(e) {
        if (currentModule.value !== "desktop") {
            return;
        }
        const isOnSidebar = e.path.some((item) =>
            item.classList?.contains("sidebar")
        );
        if (isOnSidebar) {
            return;
        }
        if (e.deltaY > 0) {
            // 移到下一页
            if (currentPage.value < pages.value.length - 1) {
                const newPage = currentPage.value + 1;
                moveToPage({ pageIndex: newPage });
            }
        }

        if (e.deltaY < 0) {
            // 移到上一页
            if (currentPage.value > 0) {
                const newPage = currentPage.value - 1;
                moveToPage({ pageIndex: newPage });
            }
        }
    }


}