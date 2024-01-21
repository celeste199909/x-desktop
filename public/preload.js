const { ipcRenderer } = require("electron");

window.exports = {
  "desktop": {
    mode: "none",
    args: {
      enter: (action) => {
        showDesktop(desktopWindow);
      },
    },
  },
};

let desktopWindow = null;
if (!desktopWindow) {
  desktopWindow = createDesktopWindow();
}

// 监听插件进入事件
utools.onPluginEnter(({ code, type, payload, option }) => {
  showDesktop(desktopWindow);
});

// 创建桌面窗口
function createDesktopWindow() {
  desktopWindow = utools.createBrowserWindow(
    "index.html",
    {
      show: false,
      title: "desktop",
      webPreferences: {
        preload: "index-preload.js",
      },
      // frame: false,
      // transparent: true,
      // backgroundColor: "#00000000",
      alwaysOnTop: true,
      resizable: false,
      movable: false,
      fullscreen: true,
      focusable: true,
      skipTaskbar: true,
    },
    function () {
      ipcRenderer.sendTo(desktopWindow.webContents.id, "init");
      showDesktop(desktopWindow);
      // 开发者工具
      desktopWindow.webContents.openDevTools();
      // 监听子窗口隐藏事件
      ipcRenderer.on("hideDesktop", (e, data) => {
        desktopWindow.hide();
      });
    }
  );
  return desktopWindow;
}

// 显示桌面
function showDesktop(desktopWindow) {
  // utools.hideMainWindow();
  // utools.outPlugin();
  desktopWindow.show();
  setTimeout(() => {
      utools.hideMainWindow();
  }, 100);
}

