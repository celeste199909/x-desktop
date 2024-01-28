const defaultDesktopFunction = {
    hideShotcutKey: ["Control", ""],
    iconPaths: [
        {
            id: "desktop",
            name: "桌面",
            path: getUserDesktopPath(),
            active: true,
            sortInfo: [],
        }
    ]
}

const defaultDesktopAppearance = {
    theme: "auto",
    bgColor: [
        {
            id: "iyjoSmXca",
            color: "#000000",
            current: false,
        },
        {
            id: "j1a6GKp5euJ",
            color: ["rgb(33, 147, 176)", "rgb(109, 213, 237)"],
            direction: "to right",
            current: false,
        },
    ],
    bgImage: [
        {
            id: "tzXza8DeoDs",
            current: true,
            name: "mountains.jpg",
        },
    ],
    localBgImage: [
        // {
        //     id: nanoid(),
        //     current: false,
        //     path: "C:\\Users\\celeste\\Pictures\\2h-media-oUw0fIRzhr4-unsplash.jpg",
        // },
    ],
    bgOpacity: 50,
}

const icon = {
    rawName: rawIcon.rawName,
    iconImage: rawIcon.iconImage,
    realPath: rawIcon.realPath,
    // 以下为增加的属性
    type: getIconType(rawIcon.rawName),
    id: nanoid(),
    showName: showName,
    suffix: rawIcon.rawName.split(".").pop(),
    searchKeywords: getSearchKeywords(showName),
    fromPath: rawIcon.fromPath,
    fromPathId: rawIcon.fromPathId,
    fromPathName: rawIcon.fromPathName
};

const desktopSortInfo =
    [
        [
            {
                "id": "xxx",
                "iconRawName": "xxx",
                "fromPathId": "xxx",
                "isFolded": false,
            }
        ],
        [],
        []
    ]

// const steamAppsPathFiles = [
//   "appmanifest_1037020.acf",
//   "appmanifest_1109570.acf",
//   "appmanifest_1274140.acf",
//   "appmanifest_1507970.acf",
//   "appmanifest_1966900.acf",
//   "appmanifest_228980.acf",
//   "appmanifest_230290.acf",
//   "appmanifest_250900.acf",
//   "appmanifest_431730.acf",
//   "appmanifest_431960.acf",
//   "appmanifest_445980.acf",
//   "appmanifest_460950.acf",
//   "appmanifest_588650.acf",
//   "appmanifest_632360.acf",
//   "appmanifest_646570.acf",
//   "appmanifest_788100.acf",
//   "appmanifest_977880.acf",
//   "common",
//   "downloading",
//   "libraryfolders.vdf",
//   "shadercache",
//   "sourcemods",
//   "temp",
//   "workshop"
// ]
// .acf 文件内容
