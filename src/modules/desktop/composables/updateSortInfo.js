import { inject } from "vue";
import { getDesktopSortInfo } from "@/functions/desktop/desktopSortInfo";
import { getDesktopFunction } from "@/functions/desktop/desktopFunction";
import _ from "lodash";

// 本地排序信息模板
// const desktopSortInfo = 
// [ 
// [
//   {
//     "id":"xxx",
//     "iconRawName":"xxx",
//     "fromPathId":"xxx",
//     "isFolded":false,
//   }
// ], 
// [], 
// []
// ]
export function useUpdateSortInfo(pagedIcons, setDesktopSortInfo) {
    // 更新页面排序信息
    function updateSortInfo() {
        console.log('%c [ 触发更新排序信息 ]-25', 'font-size:13px; background:pink; color:#bf2c9f;', pagedIcons)
        const desktopSortInfo = [];
        // 2.保存所有图标的排序信息
        const pagedIconsSortInfo = [];

        pagedIcons.value.forEach((page) => {
            const pageSortInfo = [];
            page.forEach((icon) => {
                pageSortInfo.push(icon.rawName);
            });
            pagedIconsSortInfo.push(pageSortInfo);
        });
        desktopSortInfo.pagedIconsSortInfo = pagedIconsSortInfo;

        //  3.保存到ref变量， 并保存到本地
        setDesktopSortInfo(desktopSortInfo);
        console.log('%c [ 更新排序信息完成 ]-61', 'font-size:13px; background:pink; color:#bf2c9f;', desktopSortInfo)
    }

    return {
        updateSortInfo
    }
}