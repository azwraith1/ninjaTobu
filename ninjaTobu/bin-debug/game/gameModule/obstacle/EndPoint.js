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
//�յ�
var EndPoint = (function (_super) {
    __extends(EndPoint, _super);
    function EndPoint(source) {
        var _this = _super.call(this, source) || this;
        //64 * 64
        _this.scale = 1;
        _this.init();
        return _this;
    }
    EndPoint.prototype.init = function () {
        this.anchorOffsetX = 32;
        this.anchorOffsetY = 32;
        var tw = egret.Tween.get(this, { loop: true });
        tw.to({ scaleX: 1.2, scaleY: 1.2 }, 500, egret.Ease.cubicInOut).
            to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.cubicInOut);
    };
    return EndPoint;
}(eui.Image));
__reflect(EndPoint.prototype, "EndPoint");
//# sourceMappingURL=EndPoint.js.map