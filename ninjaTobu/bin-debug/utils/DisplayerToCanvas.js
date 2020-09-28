var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DisplayerToCanvas = (function () {
    function DisplayerToCanvas() {
    }
    DisplayerToCanvas.add = function (canvas, tier) {
        var childs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            childs[_i - 2] = arguments[_i];
        }
        for (var _a = 0, childs_1 = childs; _a < childs_1.length; _a++) {
            var ele = childs_1[_a];
            if (tier == null) {
                canvas.addChild(ele);
            }
            else {
                canvas.addChildAt(ele, tier);
            }
        }
    };
    return DisplayerToCanvas;
}());
__reflect(DisplayerToCanvas.prototype, "DisplayerToCanvas");
//# sourceMappingURL=DisplayerToCanvas.js.map