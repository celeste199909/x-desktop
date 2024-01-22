/**
 * @description: 桌面外观数据
 * @typedef {Object} DesktopAppearance
 * @property {String} theme 主题
 * @property {Array} bgColor 背景颜色
 * @property {Array} bgImage 背景图片
 * @property {Array} localBgImage 本地背景图片
 * @property {Number} bgOpacity 背景透明度
 */
const defaultDesktopAppearance = {
    theme: "auto",
    bgColor: [
        {
            color: "#000000",
            current: false,
        },
        {
            color: ["rgb(33, 147, 176)", "rgb(109, 213, 237)"],
            direction: "to right",
            current: false,
        },
        {
            color: ["rgb(168, 192, 255)", "rgb(63, 43, 150)"],
            direction: "to right",
            current: false,
        },
        {
            color: ["rgb(52, 148, 230)", "rgb(236, 110, 173)"],
            direction: "to right",
            current: false,
        },
        {
            color: ["rgb(20, 30, 48)", "rgb(36, 59, 85)"],
            direction: "to right",
            current: false,
        },
        {
            color: ["rgb(211, 149, 155)", "rgb(191, 230, 186)"],
            direction: "to right",
            current: false,
        },
        {
            color: ["rgb(211, 149, 155)", "rgb(191, 230, 186)"],
            direction: "to right",
            current: false,
        },
        {
            color: ["rgb(71, 118, 230)", "rgb(142, 84, 233)"],
            direction: "to right",
            current: false,
        },
        {
            color: ["rgb(0, 82, 212)", "rgb(151, 150, 240)", "rgb(251, 199, 212)"],
            direction: "to right",
            current: false,
        },
        {
            color: ["rgb(0, 82, 212)", "rgb(75, 108, 183)", "rgb(24, 40, 72)"],
            direction: "to right",
            current: false,
        },
    ],
    bgImage: [
        {
            current: true,
            name: "mountains.jpg",
        },
        {
            current: false,
            name: "rain.jpg",
        },
    ],
    localBgImage: [
        // {
        //     current: false,
        //     path: "C:\\Users\\celeste\\Pictures\\2h-media-oUw0fIRzhr4-unsplash.jpg",
        // },
    ],
    bgOpacity: 50,
}

/**
 * @description: 获取本地外观数据
 * @return {DesktopAppearance}
 */
const getDesktopAppearance = function () {
    const desktopAppearance = utools.dbStorage.getItem("desktopAppearance");
    if (!desktopAppearance) {
        utools.dbStorage.setItem("desktopAppearance", defaultDesktopAppearance);
        return defaultDesktopAppearance;
    } else {
        console.log("desktopAppearance", desktopAppearance);
        return desktopAppearance;
    }
}

// /**
//  * @description: 重置本地外观数据
//  * @return {DesktopAppearance}
//  */
// const resetDesktopAppearance = function () {
//     utools.dbStorage.setItem("desktopAppearance", defaultDesktopAppearance);
//     return defaultDesktopAppearance;
// }

// 桌面布局
/**
 * @description: 桌面布局数据
 * @typedef {Object} DesktopLayout
 * @property {Number} width 桌面宽度
 * @property {Number} height 桌面高度
 * @property {Number} minWidth 最小宽度
 * @property {Number} minHeight 最小高度
 * @property {Number} paddingX 横向边距
 * @property {Number} paddingY 纵向边距
 * @property {Number} cellLength 单元格边长
 * @property {Number} gapX 横向间隔
 * @property {Number} gapY 纵向间隔
 * @property {Number} row 行数
 * @property {Number} column 列数
 * @property {Number} pageCapacity 页面容量
 */
const getDesktopLayout = function () {
    let layout = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        minWidth: 0,
        minHeight: 0,
        paddingX: 0.08,
        paddingY: 0.06,
        cellLength: 130,
        gapX: 20,
        gapY: 12,
        row: 0,
        column: 0,
        pageCapacity: 0,
    };

    layout.column = Math.floor(
        (layout.width * (1 - layout.paddingX * 2)) /
        (layout.cellLength + layout.gapX)
    );
    layout.row = Math.floor(
        (layout.height * (1 - layout.paddingY * 2)) /
        (layout.cellLength + layout.gapY)
    );

    layout.minWidth = layout.column * (layout.cellLength + layout.gapX);
    layout.minHeight = layout.row * (layout.cellLength + layout.gapY);

    layout.pageCapacity = layout.column * layout.row;

    return layout;
}

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
        console.log("desktopSortInfo", localSortInfo);
        return localSortInfo;
    }
}

export {
    defaultDesktopAppearance,
    getDesktopSortInfo,
    getDesktopAppearance,
    resetDesktopAppearance,
    getDesktopLayout,
}