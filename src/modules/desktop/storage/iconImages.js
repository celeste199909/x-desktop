import _ from 'lodash';
import iconImagesInfo from '@/data/iconImagesInfo';

export function getHDIconImage(name) {
    const isContainsChinese = strContainsChinese(name);

    // 结果变量
    let imageName = "";
    if (!isContainsChinese) {
        name = _.lowerCase(name).replace(/\s+/g, "");
    }
    // 先全匹配
    imageName = iconImagesInfo.find(item => {
        if (name === item) {
            return item;
        }
    });
    // 再模糊匹配
    if (!imageName) {
        imageName = iconImagesInfo.find(item => {
            if (name.includes(item)) {
                return item;
            }
        });
    }

    if (imageName) {
        return imageName;
    } else {
        return null;
    }
}

// 用于检测字符串是中文还是英文
function strContainsChinese(str) {
    // 检查字符串中是否有中文字符
    const containsChinese = /[\u4e00-\u9fff]/.test(str);
    return containsChinese;
}