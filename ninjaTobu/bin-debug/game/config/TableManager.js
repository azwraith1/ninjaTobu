// 策划配置文件结构定义
// Generate by auto tools
// 2020-06-29
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// ninja_level.csv
var TableNinjaLevel = (function () {
    function TableNinjaLevel() {
        this.id = 0; // 编号
        this.type = ""; // 类型：方块block，齿轮blade
        this.source = ""; // 资源名
        this.rotation_angle = 0; // 初始角度
        this.width = 0; // 宽
        this.height = 0; // 高
        this.radius = 0; // 半径
        this.rotation = 0; // 自转角速度
        this.velocity = 0; // 线速度
        this.degree = 0; // 圆弧角速度
        this.radius1 = 0; // 圆弧半径
        this.cycle = 0; // 圆弧角度
        this.cycle_point = 0; // 圆心位置，也可能有运动轨迹
        this.scale = 0; // 缩放比例
    }
    TableNinjaLevel.Table = function () {
        if (TableNinjaLevel.table == null) {
            // TableNinjaLevel.table = <{[key:string]: TableNinjaLevel}>Game.ConfigManager.getTable("ninja_level.json");
            if (TableNinjaLevel.table == null)
                TableNinjaLevel.table = {};
        }
        return TableNinjaLevel.table;
    };
    TableNinjaLevel.Item = function (key) {
        if (key == undefined || key == null)
            return null;
        var item = TableNinjaLevel.Table()[key.toString()];
        if (item == undefined)
            return null;
        return item;
    };
    TableNinjaLevel.table = null;
    return TableNinjaLevel;
}());
__reflect(TableNinjaLevel.prototype, "TableNinjaLevel");
window['TableNinjaLevel'] = TableNinjaLevel;
//# sourceMappingURL=TableManager.js.map