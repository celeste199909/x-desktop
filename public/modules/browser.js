const { readFileSync } = require("fs");

// 获取 chrome 书签
window.getChromeBookmarks = function () {
    return new Promise((resolve, reject) => {
        const userHomePath = utools.getPath("home");
        const chromePath = userHomePath + "\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Bookmarks";
        try {
            let bookmarks = JSON.parse(readFileSync(chromePath).toString());
            const bookmarksList = bookmarks.roots.bookmark_bar.children;
            resolve(bookmarksList);
        } catch (err) {
            reject(err);
        }

    })
}

// 获取 Edge 书签
window.getEdgeBookmarks = function () {
    return new Promise((resolve, reject) => {
        const userHomePath = utools.getPath("home");
        const edgePath = userHomePath + "\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Bookmarks";
        try {
            let bookmarks = JSON.parse(readFileSync(edgePath).toString());
            const bookmarksList = bookmarks.roots.bookmark_bar.children;
            resolve(bookmarksList);
        } catch (err) {
            reject(err);
        }

    })
}
