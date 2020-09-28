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
var HitTestMediator = (function (_super) {
    __extends(HitTestMediator, _super);
    function HitTestMediator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //游戏内事件监听
    HitTestMediator.prototype.addGameEventListener = function () {
    };
    return HitTestMediator;
}(Mediator));
__reflect(HitTestMediator.prototype, "HitTestMediator");
//# sourceMappingURL=HitTestMediator.js.map