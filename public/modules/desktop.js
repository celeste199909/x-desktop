// desktop.js 提供桌面相关的方法

const { readdir, realpathSync } = require("fs");
const { ipcRenderer, shell } = require("electron");

console.log("加载 desktop.js")

// 获取桌面图标信息
window.getDesktopIcons = function (callback) {
  // 本地设置数据
  // const localSeting = utools.dbStorage.getItem("setting");
  // console.log("localSeting", localSeting);
  const desktopIcons = [];
  const desktopPath = utools.getPath("desktop");

  readdir(desktopPath, (err, files) => {
    if (err) {
      callback(desktopIcons); // 在出错时返回空的 desktopIcons 数组
      return;
    }

    files.forEach((file) => {
      // 或者快捷方式的真正路径
      const realPath = realpathSync(desktopPath + "/" + file);

      desktopIcons.push({
        rawName: file,
        iconImage: utools.getFileIcon(realPath),
        realPath: realPath,
      });

    });
    callback(desktopIcons); // 返回 desktopIcons 数组
  });

};
