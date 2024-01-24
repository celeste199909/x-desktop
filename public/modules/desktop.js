// desktop.js 提供桌面相关的方法

const { readdir, realpathSync } = require("fs");
const { ipcRenderer, shell } = require("electron");

console.log("加载 desktop.js")

// 获取桌面图标信息
window.getDesktopIcons = function (callback) {
  // 本地设置的路径
  const desktopFunction = utools.dbStorage.getItem("desktopFunction");
  const iconPaths = desktopFunction.iconPaths;
  // console.log("desktopFunction", desktopFunction);
  console.log("iconPaths22", iconPaths);
  const desktopIcons = [];
  // const desktopPath = utools.getPath("desktop");

  // 读取所给路径下的文件
  for (let i = 0; i < iconPaths.length; i++) {
    const iconPath = iconPaths[i].path;
    const pathId = iconPaths[i].id;
    console.log("iconPath", iconPath);
    // const realPath = realpathSync(iconPath);
    // console.log("realPath", realPath);
    readdir(iconPath, (err, files) => {
      if (err) {
        callback(desktopIcons); // 在出错时返回空的 desktopIcons 数组
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
      callback(desktopIcons); // 返回 desktopIcons 数组
    });
  }

  // readdir(desktopPath, (err, files) => {
  //   if (err) {
  //     callback(desktopIcons); // 在出错时返回空的 desktopIcons 数组
  //     return;
  //   }

  //   files.forEach((file) => {
  //     // 或者快捷方式的真正路径
  //     const realPath = realpathSync(desktopPath + "/" + file);

  //     desktopIcons.push({
  //       rawName: file,
  //       iconImage: utools.getFileIcon(realPath),
  //       realPath: realPath,
  //     });

  //   });
  //   callback(desktopIcons); // 返回 desktopIcons 数组
  // });

};

