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
var EndlessLevel = (function (_super) {
    __extends(EndlessLevel, _super);
    function EndlessLevel() {
        var _this = _super.call(this) || this;
        _this.list = [];
        _this.listLength = 3;
        _this.stop = false;
        return _this;
    }
    EndlessLevel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.height = 1334 * 3;
        this.init();
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        ObserverManager.instance.addEventListener(GameEvent.ROLE_DEAD, this.stopSlide, this);
    };
    EndlessLevel.prototype.init = function () {
        this.stop = false;
        for (var i = 0; i < this.listLength; i++) {
            var item = new EndlessItemGroup("ninja_endless0" + (i + 1) + "_json");
            item.y = 0 - 1334 * i;
            this.addChild(item);
            this.list.push(item);
        }
    };
    EndlessLevel.prototype.update = function () {
        if (this.stop)
            return;
        for (var i = 0; i < this.list.length; i++) {
            var item = this.list[i];
            var itemy = item.localToGlobal().y;
            if (itemy > 1334) {
                var last = this.findFirst();
                item.y = last.y - 1334;
                EndlessItemGroup.reclaim(item);
                item.addConfig("ninja_endless0" + (i + 1) + "_json");
                return;
            }
            var sceneMediator = ObserverManager.getMediator(SceneMediator);
            var player = sceneMediator.getScene().playerIcon;
            if (GameConst.IS_SLIDE) {
                if (player.localToGlobal().y <= GameConst.SCREEN_HEIGHT / 4) {
                    if (player.velocity[1] >= 0) {
                        GameConst.SLIDE_SPEED = GameConst.BASE_SPEED;
                    }
                    else {
                        GameConst.SLIDE_SPEED = -player.velocity[1];
                    }
                }
                else {
                    GameConst.SLIDE_SPEED = GameConst.BASE_SPEED;
                }
                this.y += GameConst.SLIDE_SPEED * Scene.factor;
                player.y += GameConst.SLIDE_SPEED * Scene.factor;
            }
        }
    };
    EndlessLevel.prototype.findFirst = function () {
        var returnIcon = this.list[0];
        for (var i = 0; i < this.list.length; i++) {
            var icon = this.list[i];
            if (icon.y < returnIcon.y) {
                returnIcon = icon;
            }
        }
        return returnIcon;
    };
    EndlessLevel.prototype.stopSlide = function () {
        this.stop = true;
    };
    return EndlessLevel;
}(eui.Group));
__reflect(EndlessLevel.prototype, "EndlessLevel");
//# sourceMappingURL=EndlessLevel.js.map