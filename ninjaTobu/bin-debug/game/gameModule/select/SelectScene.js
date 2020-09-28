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
var SelectScene = (function (_super) {
    __extends(SelectScene, _super);
    function SelectScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "SelectSceneSkin";
        return _this;
    }
    SelectScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    SelectScene.prototype.initUI = function () {
        for (var i = 2; i <= GameConst.WEAPON_LIBRARY; i++) {
            var img = new Weapon("ninja_weapon" + i + "_png");
            this.weaponGroup.addChild(img);
        }
    };
    /*
    * 选择天赋
    */
    SelectScene.prototype.showTalent = function () {
        var talent = new SelectPanel("选择新能力");
        if (this && this.parent) {
            this.parent.addChild(talent);
        }
    };
    SelectScene.prototype.enter = function () { };
    SelectScene.prototype.exit = function () { };
    return SelectScene;
}(eui.Component));
__reflect(SelectScene.prototype, "SelectScene");
//# sourceMappingURL=SelectScene.js.map