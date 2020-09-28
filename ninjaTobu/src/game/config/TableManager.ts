// 策划配置文件结构定义
// Generate by auto tools
// 2020-06-29


// ninja_level.csv
class TableNinjaLevel {
    public id: number = 0; // 编号
    public type: string = ""; // 类型：方块block，齿轮blade
    public distance: any; // [[x,y距离]，[运动点x,y距离],...]
    public source: string = ""; // 资源名
    public rotation_angle: any = 0; // 初始角度
    public width: any = 0; // 宽
    public height: any = 0; // 高
    public radius: any = 0; // 半径
    public rotation: any = 0; // 自转角速度
    public velocity: any = 0; // 线速度
    public degree: any = 0; // 圆弧角速度
    public radius1: any = 0; // 圆弧半径
    public cycle: any = 0; // 圆弧角度
    public cycle_point: any = 0; // 圆心位置，也可能有运动轨迹
    public hastrap; // 尖刺分布[上,下,左,右]
    public scale: any = 0; // 缩放比例

    private static table: { [key: string]: TableNinjaLevel } = null;

    public static Table(): { [key: string]: TableNinjaLevel } {
        if (TableNinjaLevel.table == null) {
            // TableNinjaLevel.table = <{[key:string]: TableNinjaLevel}>Game.ConfigManager.getTable("ninja_level.json");
            if (TableNinjaLevel.table == null) TableNinjaLevel.table = {};
        }
        return TableNinjaLevel.table;
    }

    public static Item(key: number | string): TableNinjaLevel {
        if (key == undefined || key == null) return null;
        let item = TableNinjaLevel.Table()[key.toString()];
        if (item == undefined) return null;
        return item;
    }
}
window['TableNinjaLevel'] = TableNinjaLevel;
