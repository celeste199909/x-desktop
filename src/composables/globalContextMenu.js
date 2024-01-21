
export function useGlobalContextMenu() {
    const globalContextMenuOptions = [
        {
            name: "全局设置",
            enabled: ["desktop", "other"],
            handler: () => {
                console.log("全局设置");
            },
        },
        {
            name: "刷新",
            enabled: ["desktop", "other"],
            handler: () => {
                console.log("刷新");
            },
        },
    ]

    return {
        globalContextMenuOptions
    }
}