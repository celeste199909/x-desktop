// C:\Users\YourUsername\AppData\Local\Google\Chrome\User Data\Default\Bookmarks
// C:\Users\celeste\AppData\Local\Google\Chrome\User Data\Default
// utools.getPath("appData") C:\Users\celeste\AppData\Roaming
const { readdir, realpathSync, readFileSync } = require("fs");
const { ipcRenderer, shell } = require("electron");

console.log("加载 vscode.js")
// 'C:\Users\celeste\AppData\Roaming\Local\Google\Chrome\User Data\Default
// 获取 chrome 书签信息
window.getChromeBookmarks = function (callback) {
    const bookmarks = [];
    //   const chromeBookmarksPath = utools.getPath("appData") + "/Google/Chrome/User Data/Default";
    const userHome = utools.getPath("home");
    const chromeBookmarksPath = `${userHome}/AppData/Local/Google/Chrome/User Data/Default/Bookmarks`;
    console.log("chromeBookmarksPath", chromeBookmarksPath);

    // 读取文件
    const bookmarksFile = readFileSync(chromeBookmarksPath, "utf8");
    const bookmarksJson = JSON.parse(bookmarksFile);
    console.log("bookmarksJson", bookmarksJson);
};