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
 * 贝赛尔曲线对象
 */
var BezierDisplayObject = (function (_super) {
    __extends(BezierDisplayObject, _super);
    function BezierDisplayObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startPointX = 0;
        _this.startPointY = 0;
        _this.endPointX = 0;
        _this.endPointY = 0;
        _this.bezierPointX = 0;
        _this.bezierPointY = 0;
        return _this;
    }
    Object.defineProperty(BezierDisplayObject.prototype, "factor", {
        get: function () {
            return 0;
        },
        set: function (value) {
            this.x = (1 - value) * (1 - value) * this.startPointX + 2 * value * (1 - value) * this.bezierPointX + value * value * this.endPointX;
            this.y = (1 - value) * (1 - value) * this.startPointY + 2 * value * (1 - value) * this.bezierPointY + value * value * this.endPointY;
        },
        enumerable: true,
        configurable: true
    });
    BezierDisplayObject.prototype.setBezierPoint = function (startPoint, bezierPoint, endPoint) {
        this.startPointX = startPoint.x;
        this.startPointY = startPoint.y;
        this.bezierPointX = bezierPoint.x;
        this.bezierPointY = bezierPoint.y;
        this.endPointX = endPoint.x;
        this.endPointY = endPoint.y;
    };
    return BezierDisplayObject;
}(eui.Group));
__reflect(BezierDisplayObject.prototype, "BezierDisplayObject");
//# sourceMappingURL=BezierDisplayObject.js.map