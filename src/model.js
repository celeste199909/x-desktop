const defaultDesktopFunction = {
    hideShotcutKey: ["Control", ""],
    iconPaths: [
        {
            id:"desktop",
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

let icon = {
    rawName: rawIcon.rawName,
    iconImage: rawIcon.iconImage,
    realPath: rawIcon.realPath,
    // 以下为增加的属性
    type: getIconType(rawIcon.rawName),
    id: nanoid(),
    showName: showName,
    suffix:  rawIcon.rawName.split(".").pop(),
    searchKeywords: getSearchKeywords(showName),
    fromPath: rawIcon.fromPath,
    fromPathId: rawIcon.fromPathId,
    fromPathName: rawIcon.pathName
  };