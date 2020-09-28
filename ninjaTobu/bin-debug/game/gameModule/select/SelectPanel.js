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
var SelectPanel = (function (_super) {
    __extends(SelectPanel, _super);
    function SelectPanel(data) {
        var _this = _super.call(this) || this;
        _this.text = "";
        _this.skinName = "SelectSceneSkin";
        if (data) {
            _this.text = data;
        }
        ObserverManager.instance.addEventListener(GameEvent.CLOSE_SELECT, _this.close, _this);
        return _this;
    }
    SelectPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.titleText.text = this.text ? this.text : "武器选择";
        this.initScroller();
    };
    SelectPanel.prototype.initScroller = function () {
        for (var i = 1; i <= GameConst.TALENT_NUMBER; i++) {
            var item = new SelectItem({ text: TALENT_NAME[i - 1], source: TALENT_ARRAY[i - 1] });
            this.weaponGroup.addChild(item);
        }
    };
    SelectPanel.prototype.close = function () {
        GameUtil.removeSelf(this);
    };
    return SelectPanel;
}(eui.Component));
__reflect(SelectPanel.prototype, "SelectPanel");
//# sourceMappingURL=SelectPanel.js.map