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
//砖块
var Brick = (function (_super) {
    __extends(Brick, _super);
    function Brick(source) {
        var _this = _super.call(this) || this;
        _this._img = new eui.Image(source);
        _this.addChild(_this._img);
        return _this;
    }
    return Brick;
}(eui.Component));
__reflect(Brick.prototype, "Brick");
//# sourceMappingURL=brick.js.map