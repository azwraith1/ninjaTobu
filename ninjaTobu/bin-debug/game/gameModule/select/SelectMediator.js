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
var SelectMediator = (function (_super) {
    __extends(SelectMediator, _super);
    function SelectMediator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //游戏内事件监听
    SelectMediator.prototype.addGameEventListener = function () {
        ObserverManager.instance.addEventListener(GameEvent.CLOSE_SELECT, this.onExit, this);
    };
    SelectMediator.prototype.initView = function () {
        this.selectScene = new SelectScene();
        this.selectScene.initUI();
    };
    SelectMediator.prototype.onEnter = function () {
        ViewManager.instance.addElement(this.selectScene);
        this.selectScene.enter();
    };
    SelectMediator.prototype.onExit = function () {
        this.selectScene.exit();
        this.selectScene.showTalent();
        ViewManager.instance.removeElement(this.selectScene);
    };
    return SelectMediator;
}(Mediator));
__reflect(SelectMediator.prototype, "SelectMediator");
//# sourceMappingURL=SelectMediator.js.map