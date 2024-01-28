
/**
 * 
 * @returns {string} steamRootPath
 * @description 获取用户设置的 steam 根目录
 */
function getSteamRootPath() {
    const steamRootPath = utools.dbStorage.getItem("steamRootPath");
    if (!steamRootPath) {
        utools.dbStorage.setItem("steamRootPath", "");
        return "";
    } else {
        // console.log("desktopSortInfo", localSortInfo);
        return steamRootPath;
    }
}

export {
    getSteamRootPath,
}