function getUserDesktopPath() {
    return utools.getPath("desktop");
}

const defaultDesktopFunction = {
    hideShotcutKey: ["Control", ""],
    iconPaths: [
        {
            id:"desktop",
            name: "桌面",
            path: getUserDesktopPath(),
            active: true,
            isFolded: false,
            sortInfo: [],
        }
    ]
}

const getDesktopFunction = function () {
    const desktopFunction = utools.dbStorage.getItem("desktopFunction");
    if (!desktopFunction) {
        utools.dbStorage.setItem("desktopFunction", defaultDesktopFunction);
        return defaultDesktopFunction;
    } else {
        return desktopFunction;
    }
}

export {
    getDesktopFunction
}