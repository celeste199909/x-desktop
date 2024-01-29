// const { readdir, realpathSync } = require("fs");
const { ipcRenderer } = require("electron");

// 桌面
require("./modules/desktop");
// steam
require("./modules/steam");

window.winId = "";

// 保存窗口id
ipcRenderer.on("init", (event, data) => {
  window.winId = event.senderId;
});

// 隐藏窗口
window.hideDesk = function () {
  ipcRenderer.sendTo(winId, "hideDesktop");
};


