/**
 * @description: 获取本地桌面数据
 * @return {Array} [ ["iconRawName", ...] , ["iconRawName", ...] ]
 */
const getDesktopSortInfo = function () {
    const localSortInfo = utools.dbStorage.getItem("desktopSortInfo");
    if (!localSortInfo) {
        utools.dbStorage.setItem("desktopSortInfo", []);
        return [];
    } else {
        // console.log("desktopSortInfo", localSortInfo);
        return localSortInfo;
    }
}

export {
    getDesktopSortInfo,
}