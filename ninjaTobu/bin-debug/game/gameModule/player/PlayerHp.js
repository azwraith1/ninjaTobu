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
var PlayerHp = (function (_super) {
    __extends(PlayerHp, _super);
    function PlayerHp() {
        var _this = _super.call(this) || this;
        _this.skinName = "PlayerHpSkin";
        return _this;
    }
    PlayerHp.prototype.updateBar = function (hp, totalhp) {
        var rate = hp / totalhp;
        this.hpBar.width = 50 * rate;
        if (rate <= 0.5) {
            this.hpBar.fillColor = 0xFF0000;
        }
        else {
            this.hpBar.fillColor = 0x88FF07;
        }
    };
    return PlayerHp;
}(eui.Component));
__reflect(PlayerHp.prototype, "PlayerHp");
//# sourceMappingURL=PlayerHp.js.map