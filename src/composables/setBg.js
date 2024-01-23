import _, { set } from 'lodash'
import { watchDeep } from '@vueuse/core'
import { ref } from 'vue'

export function useSetBg(desktopAppearance, setDesktopAppearance) {
    console.log('desktopAppearance11', desktopAppearance.value);
    
    const bgColor = ref(desktopAppearance.value.bgColor)
    const bgImage = ref(desktopAppearance.value.bgImage)
    const localBgImage = ref(desktopAppearance.value.localBgImage)

    watchDeep(bgColor, (newValue) => {
        setDesktopAppearance({
            ...desktopAppearance.value,
            bgColor: newValue
        })
    })

    watchDeep(bgImage, (newValue) => {
        setDesktopAppearance({
            ...desktopAppearance.value,
            bgImage: newValue
        })
    })

    watchDeep(localBgImage, (newValue) => {
        setDesktopAppearance({
            ...desktopAppearance.value,
            localBgImage: newValue
        })
    })

    const setBgColor = function (bgColorItem) {
        console.log('设置bgColorItem', bgColorItem);
        console.log('bgColor', bgColor);
        console.log('desktopAppearance11---', desktopAppearance);
        resetBg();
        bgColor.value = desktopAppearance.value.bgColor.map((item) => {
            // console.log('item', item);
            if (item.id === bgColorItem.id) {
                item.current = true;
                return item;
            } else {
                item.current = false;
                return item;
            }
        });
        // 设置背景色
        if (Array.isArray(bgColorItem.color)) {
            document.body.style.background = `linear-gradient(${bgColorItem.direction}, ${bgColorItem.color[0]}, ${bgColorItem.color[1]})`;
        } else {
            document.body.style.background = bgColorItem.color;
        }
    }

    const setBgImage = function (bgImageItem) {
        console.log('设置bgImageItem', bgImageItem);
        resetBg();
        bgImage.value = desktopAppearance.value.bgImage.map((item) => {
            if (item.id === bgImageItem.id) {
                item.current = true;
                document.body.style.backgroundImage = `url(${getAssetsFile(bgImageItem.name)})`;
                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundRepeat = "no-repeat";
            } else {
                item.current = false;
            }
            return item;
        })
    }


    const setLocalBgImage = function (localBgImageItem) {
        console.log('设置localBgImageItem', localBgImageItem);
        console.log('localBgImage', desktopAppearance.value.localBgImage);
        // resetBg();
        // localBgImage.value = desktopAppearance.value.localBgImage.map((item) => {
        //     if (item.id === localBgImageItem.id) {
        //         item.current = true;
        //         document.body.style.backgroundImage = `url(${getLocalImage(localBgImageItem.path)})`;
        //         document.body.style.backgroundPosition = "center";
        //         document.body.style.backgroundSize = "cover";
        //         document.body.style.backgroundRepeat = "no-repeat";
        //     } else {
        //         item.current = false;
        //     }
        //     return item;
        // })
    }

    const resetBg = function () {
        const newDesktopAppearance = {
            ...desktopAppearance.value,
            bgColor: desktopAppearance.value.bgColor.map((x) => {
                x.current = false;
                return x;
            }),
            bgImage: desktopAppearance.value.bgImage.map((x) => {
                x.current = false;
                return x;
            }),
            localBgImage: desktopAppearance.value.localBgImage.map((x) => {
                x.current = false;
                return x;
            }),
        };
        setDesktopAppearance(newDesktopAppearance);
    }

    function applyBg() {
        bgColor.value = desktopAppearance.value.bgColor.map((item) => {
            if (item.current) {
                // 设置背景色
                if (Array.isArray(item.color)) {
                    document.body.style.background = `linear-gradient(${item.direction}, ${item.color[0]}, ${item.color[1]})`;
                } else {
                    document.body.style.background = item.color;
                }
            }
        })

        bgImage.value = desktopAppearance.value.bgImage.map((item) => {
            if (item.current) {
                document.body.style.backgroundImage = `url(${getAssetsFile(item.name)})`;
                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundRepeat = "no-repeat";
            }
        })

        localBgImage.value = desktopAppearance.value.localBgImage.map((item) => {
            if (item.current) {
                document.body.style.backgroundImage = `url(${getLocalImage(item.path)})`;
                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundRepeat = "no-repeat";
            }
        })
    }

    return {
        setBgColor,
        setBgImage,
        setLocalBgImage,
        resetBg,
        applyBg,
    }
}

// 辅助函数
const getLocalImage = (path) => {
    return new URL(path, import.meta.url).href;
};

const getAssetsFile = (name) => {
    return new URL(`/src/assets/wallpapers/${name}`, import.meta.url).href;
};