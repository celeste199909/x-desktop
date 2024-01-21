import { pinyin } from "pinyin-pro";
import { nanoid } from "nanoid";

// 原始图标数据样例
const aRawIcon = {
  type: "app",
  rawName: "Adobe Photoshop 2023.lnk",
  iconImage:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAASsSURBVFhH7Zh7bJNVFMBPy9qNrl23sfW1PrKubLRrv64tZToHMoMsziGCQCS4ZQHU+YgxaGZ8RaPGiZMAWwCHoGOC+ocxBhP9wywxMdFEYwQTEhPNNDJE8IESRJ2w4zl3ruOjd4OVPvzDL/klzXfvuffX795zv/aA5NKCVbGALeIHhxLJDqEasPnKxdwAGmEhuTTgDJSCM7YRXLH3wBk/Be4FmB3ix2jeg1ARaQOzp5hcWFR1acBSaQVndBCcC36VD5IFXPNPgDPcBWZzCTmpJPVQEd1MnX5PCso2rvh3YPO3kFMBIZab9py/nuy/kAZknzGwKwNQYPOQWx4L6sAevpcET0s65wZXbARMjgZyK2RBAzjC3dKOucRkXUZuc1iwCOyhHmmnXGIsX0VuNhY0k+AWaadcUli2htzslyWovHIaw6/+mYSy7wxWdx/C0hVPoraqURqbMuOCjssSZJnIGzgt87Z+hYZrOhA8V0nHmDHpFmSCL/2EhQs3SMeYMakK2jfuRXPzJoFtw26s6TmikvQ99TFqfdeq4jWVDZgfW40F9WsF+roVqnYpqQqy2MR9bdUiNC7uRH/vN4n22p3HUB9enuhjbulC/7avMbj7JPHjOP0n0HX/m4k+UtIhKPDUo/eJDxPtoT2/oOm6e0Rb+a09U24PllaNczHpEpxV3YS+pz9JtAvBprvR0Ngh9qS4//oYKi//hrW7vqf2n8Wp4N8+rBoniXQI5kdXouW27WLZJtpZIj+yEq1tvRgePCvuhQf/QFvHLup/i9gSxa0Po219v2qOJFIV5KTgJWX4Mz+ZiTbG8+A7IinK1nSjMnBG3Kt77RxWP3dYnJd5864XY2q9lzg3UxWcDn/ft6hXlokYQ0P75BIzvMy8tL3D9NS3oXauOtOTSLeg75lPURdqnYyj5Cm56TGsO/B3Ul9+opWPDtEpsFA1j4pUBWtf/EFscIYncdw5gMZFt4tllcUam+7Cuc9+jqG9p0js/KTkgVG0tveJLyKLS0uSTAe/UTgpWEBD+8205D46+95KJA7jfuCgOAVk8RkX9HS9izUvHEFH5z4sbnlIvEHK1/aIfZgQ3PQ27cXF0viMC04c3uH9f4lM56NIyFGy8P26/aNooaMoZ0t84dtFBv/60YXGM17KTARrtnyZSAxjU6e0z8XMrl+HlY8MYWDHUUqs4+INEuw/iYGdI+h9/APMCzRL4xLMRPBK0NW20C+ZVeKLGa5u//commJZLyRbginzv+CVohK0BTeDO35e2jEXOOOj9LdzNbmJf3UmKKu6Ayqix6Wdc4Ej/BnoTTeQm5UFC8BgjkGF8j6455+TBmQTV+wslFY+D6CLkRtXuUSBxglFlnXgiI1Ig7LHGG23IdAbbyYnLzGbBbnEVUQEwVC6Hioiw5LA7GBXDkGBqY1cIkQpIapbfOmIMiJENMMcbx/Yw4fBGT2awBEdSTsTY9uUj6DEvZXmXk7ECa7J5BOqiyW5/MqPljstIbiQeCPRmkF4jqVEIxEguFbNctJa9SyC153LXk6CZasIX4bgsXkON8EZayR4WacspPPFjVwf5ifK34RLsZmE5+C5Lin2H7wA/gFP9ONfr2TS/AAAAABJRU5ErkJggg==",
  realPath: "C:\\Users\\celeste\\Desktop\\Adobe Photoshop 2023.lnk",
};

export function handleRawIcons(rawIcons) {
  const handledIcons = [];
  rawIcons.forEach((rawIcon) => {
    // 对展示名称进行处理
    const showName = rawIcon.rawName.replace(/\.[^/.]+$/, ""); // 去除文件后缀名
    // 返回的图标数据样例
    let icon = {
      rawName: rawIcon.rawName,
      iconImage: rawIcon.iconImage,
      realPath: rawIcon.realPath,
      // 以下为增加的属性
      type: getIconType(rawIcon.rawName),
      id: nanoid(),
      showName: showName,
      suffix:  rawIcon.rawName.split(".").pop(),
      searchKeywords: getSearchKeywords(showName),
    };
    handledIcons.push(icon);
  });
  return handledIcons;
}

// 函数用于获取图标类型
function getIconType(rawName) {
  const splitList = rawName.split(".");
  const suffix = splitList.pop();
  if (suffix === "lnk") {
    return "app";
  } else if (splitList.length === 1) {
    return "folder";
  } else {
    return "file";
  }
}

// 函数用于处理显示的名字获取搜索关键词
export function getSearchKeywords(showName) {
  let keywords = [];
  if (strContainsChinese(showName)) {
    // 如果是中文 1转换为拼音 2去除点 3并转换为小写： wei xin
    const searchingStr = pinyin(showName, { toneType: "none" })
      .replace(/\./g, "")
      .toLowerCase();
    keywords.push(searchingStr.replace(/\s/g, "")); // 去除空格，并放入索引数组 weixin
    keywords.push(...searchingStr.split(" ")); // 用空格分割成数组，扁平化数组，并放入索引数组
    keywords.push(extractInitials(searchingStr)); // 提取首字母 wx
  } else {
    // 如果是英文
    const searchingStr = showName.replace(/\./g, "").toLowerCase(); // 转成小写, 去除点
    keywords.push(searchingStr.replace(/\s/g, "")); // 去除空格，放入索引数组
    keywords.push(...searchingStr.split(" ")); // 用空格分割成数组，扁平化数组，放入索引数组
    keywords.push(extractInitials(searchingStr)); // 提取首字母
  }
  // 取出keywords中的重复项 和 空项
  let set = new Set(keywords);
  keywords = [...set];
  keywords = keywords.filter((keyword) => keyword !== "");

  return keywords;
}

// 函数用于检测字符串是中文还是英文
function strContainsChinese(str) {
  // 检查字符串中是否有中文字符
  const containsChinese = /[\u4e00-\u9fff]/.test(str);
  return containsChinese;
}

// 函数用于提取字符串中的首字母
function extractInitials(str) {
  // 使用正则表达式将字符串拆分为单词数组
  const words = str.split(/[\s-_]+/);
  // 提取每个单词的首字母并拼接成字符串
  const initials = words.map((word) => word.charAt(0)).join("");
  return initials;
}
