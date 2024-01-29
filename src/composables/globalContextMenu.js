import { inject } from "vue";

export function useGlobalContextMenu() {
    const globalContextMenuOptions = [
        {
            name: "全局设置",
            enabled: ["desktop", "other"],
            handler: () => {
                toggleShowSettings();
            },
        }
    ]
    const isShowSetting = inject("isShowSetting");

    function toggleShowSettings() {
        isShowSetting.value = !isShowSetting.value;
    }


    return {
        globalContextMenuOptions,
        toggleShowSettings
    }
}