// desktop.js 提供桌面相关的方法

const { readdir, realpathSync } = require("fs");
const { ipcRenderer, shell } = require("electron");

// console.log("加载 desktop.js")

// 获取桌面图标信息
window.getDesktopIcons = function () {
  
  const promise = new Promise((resolve, reject) => {
    const desktopIcons = [];
    // const desktopPath = utools.getPath("
    // desktop");
    const desktopFunction = utools.dbStorage.getItem("desktopFunction");
    const iconPaths = desktopFunction.iconPaths;
    // console.log("desktopFunction", desktopFunction);
    console.log("iconPaths", iconPaths);
    // 读取所给路径下的文件
    for (let i = 0; i < iconPaths.length; i++) {
      const iconPath = iconPaths[i].path;
      const pathId = iconPaths[i].id;
      console.log("iconPath", iconPath);
      // const realPath = realpathSync(iconPath);
      // console.log("realPath", realPath);
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
            fromPathId: pathId
          });

        });
        resolve(desktopIcons);
      });
    }
  });

  return promise;
};

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