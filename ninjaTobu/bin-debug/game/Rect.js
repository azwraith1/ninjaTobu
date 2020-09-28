var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
     * 矩形类
     */
var SHRect = (function (_super) {
    __extends(SHRect, _super);
    /**
     * 构造函数
     */
    function SHRect(vx1, vy1, vx2, vy2, vx3, vy3, vx4, vy4) {
        var _this = _super.call(this) || this;
        _this.vx1 = vx1;
        _this.vy1 = vy1;
        _this.vx2 = vx2;
        _this.vy2 = vy2;
        _this.vx3 = vx3;
        _this.vy3 = vy3;
        _this.vx4 = vx4;
        _this.vy4 = vy4;
        _this.vector1 = new SHVector(vx1, vy1);
        _this.vector2 = new SHVector(vx2, vy2);
        _this.vector3 = new SHVector(vx3, vy3);
        _this.vector4 = new SHVector(vx4, vy4);
        // this.graphics.beginFill(0xff0000, 0.2);
        // this.graphics.drawRect(0, 0, vx2 - vx1, vy3 - vy2);
        // this.graphics.endFill();
        _this.x = vx1;
        _this.y = vy1;
        return _this;
    }
    return SHRect;
}(egret.Shape));
__reflect(SHRect.prototype, "SHRect");
//# sourceMappingURL=Rect.js.map