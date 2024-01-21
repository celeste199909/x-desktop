// 桌面布局
export function getDesktopLayout() {
  let layout = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    minWidth: 0,
    minHeight: 0,
    paddingX: 0.08,
    paddingY: 0.06,
    cellLength: 130,
    gapX: 20,
    gapY: 12,
    row: 0,
    column: 0,
    pageCapacity: 0,
  };

  layout.column = Math.floor(
    (layout.width * (1 - layout.paddingX * 2)) /
      (layout.cellLength + layout.gapX)
  );
  layout.row = Math.floor(
    (layout.height * (1 - layout.paddingY * 2)) /
      (layout.cellLength + layout.gapY)
  );
  
  layout.minWidth = layout.column * (layout.cellLength + layout.gapX);
  layout.minHeight = layout.row * (layout.cellLength + layout.gapY);

  layout.pageCapacity = layout.column * layout.row;

  return layout;
}
