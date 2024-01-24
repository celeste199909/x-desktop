
export function useMoveToPage(pagedIcons, setCurrentPage) {
    // 切换页面
    // {pageIndex, transition = true}
    /**
   * 切换页面
   * @param {Object} options
   * @param {Number} options.pageIndex 页面索引
   * @param {Boolean} [options.transition=true] 是否开启过渡动画
   */

    function moveToPage(options) {
        const pagesEl = document.getElementById("pages");
        const { pageIndex, transition = true } = options;
        setCurrentPage(pageIndex);
        pagesEl.style.transition = transition ? "all 0.6s ease" : "none";
        pagesEl.style.transform = `translateX(${pageIndex * -(100 / pagedIcons.value.length)
            }%)`;
    }

    return {
        moveToPage
    }
}