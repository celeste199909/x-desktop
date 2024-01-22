import {
    getDesktopSortInfo,
    getDesktopLayout,
} from "./desktopAppearance.js";
// handleIcons
// [ [ {}, {}, ...], []... ]
const paginateArray = function (handleIcons) {
    // sortInfo
    // [ [ rawName, rawName, ...], []... ]
    const sortInfo = getDesktopSortInfo();
    console.log("sortInfo", sortInfo);
    const pageSize = getDesktopLayout().pageCapacity;

    // 如果没有排序信息，根据页面容量，对数组进行分页
    if (sortInfo.length === 0) {
        // 根据页面容量，对数组进行分页
        const paginatedArray = [];
        let page = [];
        handleIcons.forEach((item, index) => {
            if (index % pageSize === 0) {
                page = [];
                paginatedArray.push(page);
            }
            page.push(item);
        });
        console.log("没有排序信息paginatedArray", paginatedArray);
        return paginatedArray;
    } else {
        // 根据页面排序信息，对数组进行分页
        const paginatedArray = [];
        let page = [];

        sortInfo.forEach((pageSortInfo, pageIndex) => {
            page = [];
            pageSortInfo.forEach((rawName, iconIndex) => {
                const icon = handleIcons.find((item) => item.rawName === rawName);
                // // 图标可能已经被删除
                if (!icon) {
                    console.log("标可能已经被删除icon === undefined", rawName);
                    return;
                } else {
                    // page.push(icon);
                    // 把图标放入对应的页面，并从handleIcons删除该图标
                    page.push(icon);
                    handleIcons.splice(handleIcons.findIndex((item) => item.rawName === rawName), 1);
                }
            });
            paginatedArray.push(page);
        });

        // 如果还有剩余的图标，从第一页开始，如果有空间，就放入，没有就放入下一页，如果没有下一页，就新建一页
        if (handleIcons.length > 0) {
            console.log("还有剩余的图标", handleIcons);
            // let restIcons = [...handleIcons];
            let currentPageIndex = 0;
            handleIcons.forEach((icon) => {
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
        console.log("有排序信息paginatedArray", paginatedArray);
        return paginatedArray;
    }

}

export {
    paginateArray
}
