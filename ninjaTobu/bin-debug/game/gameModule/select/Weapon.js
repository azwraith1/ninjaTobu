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
var Weapon = (function (_super) {
    __extends(Weapon, _super);
    function Weapon(img) {
        var _this = _super.call(this) || this;
        _this.skinName = "WeaponSkin";
        _this.texture = img;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.chooseWeapon, _this);
        return _this;
    }
    Weapon.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.weapon.source = this.texture;
    };
    /*
    * 选择武器
    */
    Weapon.prototype.chooseWeapon = function () {
        GameConst.WEAPON = this.texture;
        ObserverManager.instance.dispatchEventWith(GameEvent.CLOSE_SELECT);
        switch (this.texture) {
            case "ninja_weapon2_png":
                GameConst.CLIP_NUM = 6;
                GameConst.ATTACK_SPEED = 400;
                GameConst.RELOAD_INTERVAL = 400;
                GameConst.WEAPON_POWER = 35;
                GameConst.WEAPON_SPEED = 12;
                break;
            case "ninja_weapon4_png":
                GameConst.CLIP_NUM = 12;
                GameConst.ATTACK_SPEED = 200;
                GameConst.RELOAD_INTERVAL = 100;
                GameConst.WEAPON_POWER = 15;
                GameConst.WEAPON_SPEED = 15;
                break;
            case "ninja_weapon5_png":
                GameConst.CLIP_NUM = 2;
                GameConst.ATTACK_SPEED = 1000;
                GameConst.RELOAD_INTERVAL = 1000;
                GameConst.WEAPON_POWER = 80;
                GameConst.WEAPON_SPEED = 8;
                break;
            case "ninja_weapon6_png":
                GameConst.CLIP_NUM = 8;
                GameConst.ATTACK_SPEED = 500;
                GameConst.RELOAD_INTERVAL = 300;
                GameConst.WEAPON_POWER = 25;
                GameConst.WEAPON_SPEED = 10;
                GameConst.CROSS_WALL = true;
                break;
            case "ninja_weapon1_png":
                GameConst.CLIP_NUM = 10;
                GameConst.ATTACK_SPEED = 200;
                GameConst.RELOAD_INTERVAL = 100;
                GameConst.WEAPON_POWER = 2;
                GameConst.WEAPON_SPEED = 12;
                break;
            case "ninja_weapon3_png":
                GameConst.CLIP_NUM = 10;
                GameConst.ATTACK_SPEED = 200;
                GameConst.RELOAD_INTERVAL = 100;
                GameConst.WEAPON_POWER = 2;
                GameConst.WEAPON_SPEED = 12;
                break;
        }
    };
    return Weapon;
}(eui.Component));
__reflect(Weapon.prototype, "Weapon");
//# sourceMappingURL=Weapon.js.map