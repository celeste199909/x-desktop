
const { readdir, realpathSync } = require("fs");
const { ipcRenderer, shell } = require("electron");

const fs = require('fs');
const path = require('path');

// console.log("加载 steam.js")


// 获取桌面图标信息
window.getSteamApps = function (callback) {

  // 本地设置数据
  // const localSeting = utools.dbStorage.getItem("setting");
  // console.log("localSeting", localSeting);

  // const desktopIcons = [];
  const desktopPath = utools.getPath("desktop");
  // steam apps
  const steamApps = [];
  readdir(desktopPath, (err, files) => {
    if (err) {
      callback(steamApps); // 在出错时返回空的 steamApps 数组
      return;
    }

    files.forEach((file) => {
      // 或者快捷方式的真正路径

      // desktopIcons.push({
      //   rawName: file,
      //   iconImage: utools.getFileIcon(realPath),
      //   realPath: realPath,
      // });

      // 处理 steam 快捷方式
      if (file.endsWith(".url")) {
        try {
          // 获取快捷方式信息
          const urlFilePath = desktopPath + "/" + file;
          const realPath = realpathSync(desktopPath + "/" + file);

          fs.readFile(urlFilePath, 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading .url file:', err);
              return;
            }
            // 解析 .url 文件内容
            //   {
            //     "prop3": "19,0",
            //     "idlist": "",
            //     "iconindex": "0",
            //     "url": "steam://rungameid/460950",
            //     "iconfile": "D:\\Software\\steam\\steam\\games\\e82c18ce39580ca5d276678780071e1665b40ea7.ico"
            // }
            const urlInfo = parseUrlFile(data);
            // 输出获取到的信息if
            // library_600x900
            // D:\Software\steam\appcache\librarycache\460950_library_600x900.jpg

            if (urlInfo.url.startsWith("steam://")) {
              const steamAppId = urlInfo.url.split("/")[3];

              const directoryPath = 'D:\\Software\\steam\\appcache\\librarycache\\';
              const searchString = `${steamAppId}_library_600x900`;

              // 遍历目录
              fs.readdir(directoryPath, (err, files) => {
                if (err) {
                  console.error('Error reading directory:', err);
                  return;
                }

                // 遍历每个文件
                files.forEach(file => {
                  const filePath = path.join(directoryPath, file);

                  // 检查是否是文件
                  fs.stat(filePath, (statErr, stats) => {
                    if (statErr) {
                      console.error('Error checking file status:', statErr);
                      return;
                    }

                    if (stats.isFile()) {
                      // 检查文件名是否包含指定字符串
                      if (file.includes(searchString)) {
                        // console.log('Found matching file:', filePath);
                        steamApps.push({
                          ...urlInfo,
                          id: Math.random().toString(36).substr(2),
                          steamAppId: steamAppId,
                          coverPath: filePath,
                          realPath: realPath,
                        })
                      }
                    }
                  });
                });
              });
              // console.log(file, 'URL Info:', urlInfo);

            }
          });
        } catch (error) {
          // console.log("error,Path:", file);
        }
      }

    });
    callback(steamApps); // 返回 desktopIcons 数组
  });

};


// 解析 .url 文件内容的函数
function parseUrlFile(fileContent) {
  const urlInfo = {};
  const lines = fileContent.split('\n');

  for (const line of lines) {
    const parts = line.split('=');
    if (parts.length === 2) {
      const key = parts[0].trim().toLowerCase();
      const value = parts[1].trim();
      urlInfo[key] = value;
    }
  }

  return urlInfo;
}