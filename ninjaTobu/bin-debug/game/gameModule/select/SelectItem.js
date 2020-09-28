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
var SelectItem = (function (_super) {
    __extends(SelectItem, _super);
    function SelectItem(data) {
        var _this = _super.call(this) || this;
        _this.skinName = "SelectItemSkin";
        _this.text = data.text;
        _this.texture = data.source;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.selectTalent, _this);
        return _this;
    }
    SelectItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.txt.text = this.text;
        this.icon.source = this.texture;
    };
    /*
    *天赋
    */
    SelectItem.prototype.selectTalent = function () {
        switch (this.text) {
            case "多重射击":
                GameConst.TALENT_TYPE = 1;
                break;
            case "淬毒":
                GameConst.TALENT_TYPE = 2;
                break;
            case "巨型飞镖":
                GameConst.TALENT_TYPE = 3;
                break;
        }
        GameConst.OWN_TALENT.push(GameConst.TALENT_TYPE);
        ObserverManager.instance.dispatchEventWith(GameEvent.CLOSE_SELECT);
    };
    return SelectItem;
}(eui.Component));
__reflect(SelectItem.prototype, "SelectItem");
//# sourceMappingURL=SelectItem.js.map