function getUserDesktopPath() {
    return utools.getPath("desktop");
}

const defaultDesktopFunction = {
    hideShotcutKey: ["Control", ""],
    iconPaths: [
        {
            name: "桌面",
            path: getUserDesktopPath(),
            active: true,
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