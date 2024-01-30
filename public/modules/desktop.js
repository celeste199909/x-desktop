// desktop.js 提供桌面相关的方法

const { readdir, realpathSync, readFileSync, statSync } = require("fs");
const { ipcRenderer, shell } = require("electron");
// const windowsShortcuts = require('windows-shortcuts');
// 通过单个路径获取图标信息
// path: {
//   id:"desktop",
//   name: "桌面",
//   path: getUserDesktopPath(),
//   active: true,
// }
window.getIconsByPath = function (path) {
  const pathId = path.id;
  const iconPath = path.path;
  const pathName = path.name;
  return new Promise((resolve, reject) => {
    const desktopIcons = [];
    readdir(iconPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      files.forEach((file) => {
        // 或者快捷方式的真正路径
        const realPath = realpathSync(iconPath + "/" + file);
        // 读取文件
        const res = statSync(realPath)
        // desktop.ini
        if (file === "desktop.ini") return;
   
        desktopIcons.push({
          rawName: file,
          iconImage: utools.getFileIcon(realPath),
          realPath: realPath,
          fromPath: iconPath,
          fromPathId: pathId,
          fromPathName: pathName,
          isDirectory: res.isDirectory(),
          isFile: res.isFile(),
          fileContent: "",
        });

      });
      resolve(desktopIcons);
    });
  });
}