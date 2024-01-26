import _ from "lodash";
// 负责分页 和 排序
import {
    getDesktopLayout,
} from "./desktopAppearance.js";

import { getDesktopFunction } from "./desktopFunction.js";
import { getDesktopSortInfo } from "./desktopSortInfo.js";

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

// _desktopIcons
// [ [ {}, {}, ...], []... ]
// 需要 desktopIcons 和 iconPaths 以及 sortInfo
const paginateArray = function (desktopIcons) {

    const iconPaths = getDesktopFunction().iconPaths;
    const sortInfo = getDesktopSortInfo();
    const allPathsSortInfo = sortInfo.allPathsSortInfo;
    const pagedIconsSortInfo = sortInfo.pagedIconsSortInfo;
    const pageSize = getDesktopLayout().pageSize;


    // console.log("开始分页排序,要排序的图标1：", desktopIcons);
    // console.log("路径信息：", iconPaths);


    // 过滤，只保留激活的路径下的图标
    const _desktopIcons = desktopIcons.filter((icon) => {
        return iconPaths.find((path) => path.id === icon.fromPathId).active;
    });
    console.log("开始分页排序,排序信息：", sortInfo);
    console.log("开始分页排序,要排序的图标：", _desktopIcons);

    // 如果没有排序信息，根据页面容量，对数组进行分页
    if (sortInfo.length === 0) {
        // 根据页面容量，对数组进行分页
        const paginatedArray = [];
        let page = [];
        _desktopIcons.forEach((item, index) => {
            if (index % pageSize === 0) {
                page = [];
                paginatedArray.push(page);
            }
            page.push(item);
        });
        // console.log("没有排序信息", paginatedArray);
        return paginatedArray;
    } else {
        // 根据 allPathsSortInfo 页面排序信息，对数组进行分页
        const paginatedArray = [];
        let page = [];

        pagedIconsSortInfo.forEach((pageSortInfo, pageIndex) => {
            page = [];
            pageSortInfo.forEach((rawName, iconIndex) => {
                const icon = _desktopIcons.find((item) => item.rawName === rawName);
                // // 图标可能已经被删除
                if (!icon) {
                    // console.log("图标已经被删除, rawName);
                    return;
                } else {
                    // page.push(icon);
                    page.push(icon);
                    _desktopIcons.splice(_desktopIcons.findIndex((item) => item.rawName === rawName), 1);
                }
            });
            paginatedArray.push(page);
        });


        // 如果还有剩余的图标
        if (_desktopIcons.length > 0) {
            // console.log("还有剩余的图标", _desktopIcons);
            // let restIcons = [..._desktopIcons];
            let currentPageIndex = 0;
            _desktopIcons.forEach((icon) => {
                // 如果当前页面还有空间，就放入当前页面
                if (paginatedArray[currentPageIndex].length < pageSize) {
                    paginatedArray[currentPageIndex].push(icon);
                } else {
                    // 如果当前页面没有空间，就放入下一页
                    currentPageIndex++;
                    // 如果没有下一页，就新建一页
                    if (currentPageIndex >= paginatedArray.length) {
                        paginatedArray.push([icon]);
                    } else {
                        paginatedArray[currentPageIndex].push(icon);
                    }
                }

            });
        }
        console.log("分页排序完成：", paginatedArray);
        return paginatedArray;
    }

}

export {
    paginateArray
}
