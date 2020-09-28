var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
     * 圆形类
     */
var SHCircle = (function () {
    /**
     * 构造函数
     */
    function SHCircle(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vector = new SHVector(x, y);
        var circle = new egret.Shape();
        circle.graphics.beginFill(0xff0000, 0.2);
        circle.graphics.drawCircle(0, 0, r);
        circle.graphics.endFill();
        circle.x = x;
        circle.y = y;
        this.circle = circle;
    }
    return SHCircle;
}());
__reflect(SHCircle.prototype, "SHCircle");
//# sourceMappingURL=Circle.js.map