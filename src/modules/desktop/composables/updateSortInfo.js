import { inject } from "vue";
import { getDesktopSortInfo } from "@/functions/desktop/desktopSortInfo";
import { getDesktopFunction } from "@/functions/desktop/desktopFunction";
import _ from "lodash";

// 本地排序信息模板
// const localSortInfo = {
//     allPathsSortInfo:
//     {
//         "desktop": ["iconRawName", "iconRawName", "iconRawName"],
//         "pathId": ["iconRawName", "iconRawName", "iconRawName"],
//     },
//     pagedIconsSortInfo: [
//         ["iconRawName", "iconRawName", "iconRawName"],
//         ["iconRawName", "iconRawName", "iconRawName"],
//         ["iconRawName", "iconRawName", "iconRawName"],
//     ]
// }

export function useUpdateSortInfo(pagedIcons, setDesktopSortInfo) {
    // 更新页面排序信息
    function updateSortInfo() {
        console.log("触发更新排序信息");
        console.log("桌面上的图标pagedIcons", pagedIcons.value);
        const desktopSortInfo = {
            allPathsSortInfo: {},
            pagedIconsSortInfo: []
        };
        const _iconPaths = getDesktopFunction().iconPaths;
        // 把iconPaths的每项id提取出来，作为一个数组
        const iconPathsId = _iconPaths.map((item) => item.id);
        // 1.单独保存每个路径下图标的相对排序信息
        const allPathsSortInfo = {};
        iconPathsId.forEach((pathId) => {
            const pathSortInfo = [];
            pagedIcons.value.forEach((page) => {
                page.forEach((icon) => {
                    if (icon.fromPathId === pathId) {
                        pathSortInfo.push(icon.rawName);
                    }
                });
            });
            allPathsSortInfo[pathId] = pathSortInfo;
        });
        desktopSortInfo.allPathsSortInfo = allPathsSortInfo;

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

        //  3.保存到本地
        setDesktopSortInfo(desktopSortInfo);
        console.log("更新排序信息完成", desktopSortInfo);
    }

    return {
        updateSortInfo
    }
}