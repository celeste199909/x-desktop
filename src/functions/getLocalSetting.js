const defaultSetting = {
  theme: "auto",
  bgColor: [
    {
      color: "#000000",
      current: false,
    },
    {
      color: ["rgb(33, 147, 176)", "rgb(109, 213, 237)"],
      direction: "to right",
      current: false,
    },
    {
      color: ["rgb(168, 192, 255)", "rgb(63, 43, 150)"],
      direction: "to right",
      current: false,
    },
    {
      color: ["rgb(52, 148, 230)", "rgb(236, 110, 173)"],
      direction: "to right",
      current: false,
    },
    {
      color: ["rgb(20, 30, 48)", "rgb(36, 59, 85)"],
      direction: "to right",
      current: false,
    },
    {
      color: ["rgb(211, 149, 155)", "rgb(191, 230, 186)"],
      direction: "to right",
      current: false,
    },
    {
      color: ["rgb(211, 149, 155)", "rgb(191, 230, 186)"],
      direction: "to right",
      current: false,
    },
    {
      color: ["rgb(71, 118, 230)", "rgb(142, 84, 233)"],
      direction: "to right",
      current: false,
    },
    {
      color: ["rgb(0, 82, 212)", "rgb(151, 150, 240)", "rgb(251, 199, 212)"],
      direction: "to right",
      current: false,
    },
    {
      color: ["rgb(0, 82, 212)", "rgb(75, 108, 183)", "rgb(24, 40, 72)"],
      direction: "to right",
      current: false,
    },
  ],
  bgImage: [
    {
      current: true,
      name: "mountains.jpg",
    },
    {
      current: false,
      name: "rain.jpg",
    },
  ],
  localBgImage: [
    // {
    //     current: false,
    //     path: "C:\\Users\\celeste\\Pictures\\2h-media-oUw0fIRzhr4-unsplash.jpg",
    // },
  ],
  bgOpacity: 50,
  hideShortcutKey: ["Control", ""],
  sortInfo:[]
};

export function getLocalSetting() {
  const localSetting = utools.dbStorage.getItem("setting");
  if (!localSetting) {
    utools.dbStorage.setItem("setting", defaultSetting);
    return defaultSetting;
  }else {
    console.log("localSetting", localSetting);
    return localSetting;
  }
}
