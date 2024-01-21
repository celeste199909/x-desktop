import { inject } from "vue";

export function useUpdateSortInfo() {

    const pages = inject("pages");
    // const setting = inject("setting");

    // 更新页面排序信息
    function updateSortInfo() {
        let pagesSortInfo = [];
        pages.value.forEach((page, pageIndex) => {
            let pageSortInfo = [];
            page.forEach((icon, index) => {
                pageSortInfo.push(icon.rawName);
            });
            pagesSortInfo.push(pageSortInfo);
        });
        console.log("pagesSortInfo", pagesSortInfo);
        setting.value.sortInfo = pagesSortInfo;
    }

    return {
        updateSortInfo
    }
}