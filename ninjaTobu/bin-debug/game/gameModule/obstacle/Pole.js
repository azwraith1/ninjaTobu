//杆类
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
var Pole = (function (_super) {
    __extends(Pole, _super);
    function Pole(data) {
        var _this = _super.call(this) || this;
        _this.skinName = "PoleSkin";
        _this._data = data;
        _this.anchorOffsetY = _this.height >> 1;
        var pos = (data.distance);
        var dis = Math.sqrt(Math.pow(pos[1][0] - pos[0][0], 2) + Math.pow(pos[1][1] - pos[0][1], 2));
        _this.width = dis;
        var angle = Math.atan2((pos[1][1] - pos[0][1]), (pos[1][0] - pos[0][0])) * 180 / Math.PI;
        _this.rotation = Math.abs(angle);
        return _this;
        // let time: number = dis / data.velocity * 60;
        // let tween: egret.Tween = egret.Tween.get(this, { loop: true });
        // tween.to({ x: this.width }, time, egret.Ease.sineInOut).
        //     to({ x: 0 }, time, egret.Ease.sineInOut);
    }
    return Pole;
}(eui.Component));
__reflect(Pole.prototype, "Pole");
//# sourceMappingURL=Pole.js.map