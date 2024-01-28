// desktop.js 提供桌面相关的方法

const { readdir, realpathSync } = require("fs");
const { ipcRenderer, shell } = require("electron");

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

        desktopIcons.push({
          rawName: file,
          iconImage: utools.getFileIcon(realPath),
          realPath: realPath,
          fromPath: iconPath,
          fromPathId: pathId,
          fromPathName: pathName
        });

      });
      resolve(desktopIcons);
    });
  });
}