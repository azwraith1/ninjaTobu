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
var GoldBox = (function (_super) {
    __extends(GoldBox, _super);
    function GoldBox() {
        var _this = _super.call(this) || this;
        _this.time = 1;
        _this.shakeTime = 200;
        _this.skinName = "GoldBoxSkin";
        ObserverManager.instance.addEventListener(GameEvent.ATTCK_BOX, _this.shake, _this);
        return _this;
    }
    GoldBox.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.init();
    };
    GoldBox.prototype.init = function () {
        this.leftBox.visible = this.rightBox.visible = false;
        this.leftBox.horizontalCenter = this.rightBox.horizontalCenter = 0;
        this.leftBox.rotation = this.rightBox.rotation = 0;
        this.box.visible = this.lock.visible = true;
        this.box.verticalCenter = this.lock.verticalCenter = 0;
        this.time = 0;
        egret.Tween.get(this.box, { loop: true }).to({
            verticalCenter: 3
        }, 400).to({ verticalCenter: -3 }, 200);
        egret.Tween.get(this.lock, { loop: true }).to({
            verticalCenter: 3
        }, 400).to({ verticalCenter: -3 }, 200);
    };
    GoldBox.prototype.shake = function () {
        if (!this.box.visible)
            return;
        egret.Tween.get(this.box).to({
            rotation: -10
        }, 200).to({
            rotation: 10
        }, 200).to({
            rotation: -5
        }, 50).to({
            rotation: 5
        }, 50).to({
            rotation: 0
        }, 20);
        this.time++;
        if (this.time >= 4) {
            this.break();
        }
    };
    GoldBox.prototype.break = function () {
        var _this = this;
        this.leftBox.visible = this.rightBox.visible = true;
        this.box.visible = this.lock.visible = false;
        egret.Tween.get(this.leftBox).to({ rotation: -25, horizontalCenter: -15 }, 800, egret.Ease.backOut).call(function () {
            _this.leftBox.visible = false;
            ObserverManager.instance.dispatchEventWith(GameEvent.BROKEN_BOX);
            _this.reclaim();
        });
        egret.Tween.get(this.rightBox).to({ rotation: 25, horizontalCenter: 15 }, 800, egret.Ease.backOut).call(function () {
            _this.rightBox.visible = false;
        });
    };
    GoldBox.prototype.reclaim = function () {
        if (this && this.parent) {
            this.parent.removeChild(this);
        }
        GoldBox.goldBoxArray = [];
    };
    GoldBox.goldBoxArray = [];
    return GoldBox;
}(eui.Component));
__reflect(GoldBox.prototype, "GoldBox");
//# sourceMappingURL=GoldBox.js.map