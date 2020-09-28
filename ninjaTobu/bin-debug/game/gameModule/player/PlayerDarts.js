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
var PlayerDarts = (function (_super) {
    __extends(PlayerDarts, _super);
    function PlayerDarts(num) {
        var _this = _super.call(this) || this;
        _this.skinName = "PlayerBulletSkin";
        if (num) {
            _this.num = num;
        }
        return _this;
    }
    PlayerDarts.getInstance = function (num) {
        if (!PlayerDarts._instance) {
            PlayerDarts._instance = new PlayerDarts(num);
        }
        return PlayerDarts._instance;
    };
    PlayerDarts.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initDarts();
    };
    PlayerDarts.prototype.initDarts = function () {
        for (var i = 0; i < this.num; i++) {
            var img = new eui.Image(GameConst.WEAPON);
            if (i >= 10)
                img.visible = false;
            this.bulletGroup.addChild(img);
        }
        this.dartlabel.text = "X" + GameConst.CLIP_NUM;
    };
    PlayerDarts.prototype.addDarts = function () {
        var num = this.bulletGroup.numChildren;
        if (num >= GameConst.CLIP_NUM)
            return;
        var img = new eui.Image(GameConst.WEAPON);
        if (num >= 10)
            img.visible = false;
        this.bulletGroup.addChild(img);
        this.dartlabel.text = "X" + this.bulletGroup.numChildren;
    };
    PlayerDarts.prototype.subDarts = function () {
        var num = this.bulletGroup.numChildren;
        if (num <= 0)
            return;
        var img = this.bulletGroup.getChildAt(num - 1);
        GameUtil.removeSelf(img);
        this.dartlabel.text = "X" + this.bulletGroup.numChildren;
    };
    return PlayerDarts;
}(eui.Component));
__reflect(PlayerDarts.prototype, "PlayerDarts");
//# sourceMappingURL=PlayerDarts.js.map