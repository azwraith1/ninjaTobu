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
// TypeScript file
var DamageItem = (function (_super) {
    __extends(DamageItem, _super);
    function DamageItem(num) {
        var _this = _super.call(this) || this;
        _this.skinName = "DamageSkin";
        if (num) {
            _this.num = num;
            _this.damageLabel.text = "-" + _this.num + "";
        }
        return _this;
    }
    Object.defineProperty(DamageItem, "instance", {
        get: function () {
            if (!DamageItem._instance) {
                DamageItem._instance = new DamageItem();
            }
            return DamageItem._instance;
        },
        enumerable: true,
        configurable: true
    });
    return DamageItem;
}(eui.Component));
__reflect(DamageItem.prototype, "DamageItem");
//# sourceMappingURL=DamageItem.js.map