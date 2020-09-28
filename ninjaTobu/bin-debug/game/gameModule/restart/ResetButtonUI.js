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
var ResetButtonUI = (function (_super) {
    __extends(ResetButtonUI, _super);
    function ResetButtonUI(source, text) {
        var _this = _super.call(this) || this;
        _this.skinName = "ResetButtonSkin";
        _this.ima.source = source;
        _this.text.text = text;
        return _this;
    }
    return ResetButtonUI;
}(eui.Component));
__reflect(ResetButtonUI.prototype, "ResetButtonUI");
//# sourceMappingURL=ResetButtonUI.js.map