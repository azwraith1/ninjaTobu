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
var RestartGameMediator = (function (_super) {
    __extends(RestartGameMediator, _super);
    function RestartGameMediator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //游戏内事件监听
    RestartGameMediator.prototype.addGameEventListener = function () {
    };
    RestartGameMediator.prototype.initView = function () {
        this.restartGameUI = new RestartGameUI("");
        this.restartGameUI.initUI();
    };
    RestartGameMediator.prototype.onEnter = function () {
        ViewManager.instance.addElement(this.restartGameUI);
        this.restartGameUI.enter();
    };
    RestartGameMediator.prototype.onExit = function () {
        this.restartGameUI.exit();
        ViewManager.instance.removeElement(this.restartGameUI);
    };
    return RestartGameMediator;
}(Mediator));
__reflect(RestartGameMediator.prototype, "RestartGameMediator");
//# sourceMappingURL=RestartGameMediator.js.map