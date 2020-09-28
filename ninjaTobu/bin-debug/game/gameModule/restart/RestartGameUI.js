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
var RestartGameUI = (function (_super) {
    __extends(RestartGameUI, _super);
    function RestartGameUI(currentState) {
        var _this = _super.call(this) || this;
        _this.skinName = RestartGameSkin;
        _this.currentState = currentState;
        _this.validateNow();
        _this.initUI();
        return _this;
    }
    RestartGameUI.prototype.initUI = function () {
        this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
        this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMenu, this);
        this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextGame, this);
        this.home.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMenu, this);
    };
    RestartGameUI.prototype.enter = function () {
        // SoundManager.instance.playMusic(SoundConst.fightMusic_mp3);
    };
    RestartGameUI.prototype.exit = function () {
    };
    RestartGameUI.prototype.restartGame = function () {
        var _this = this;
        egret.Tween.get(this.maskRect).to({ alpha: 1 }, 1000).call(function () {
            var sceneMediator = ObserverManager.getMediator(SceneMediator);
            sceneMediator.resetView();
            _this.maskRect.alpha = 0;
            if (_this.parent) {
                _this.parent.removeChild(_this);
            }
        });
    };
    RestartGameUI.prototype.nextGame = function () { };
    RestartGameUI.prototype.showMenu = function () {
        ObserverManager.instance.dispatchEventWith(GameEvent.SHOW_MUNE);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    RestartGameUI.prototype.quitGame = function () {
        // ViewManager.instance.OPEN_WINDOW(LobbyMediator);
    };
    return RestartGameUI;
}(eui.Component));
__reflect(RestartGameUI.prototype, "RestartGameUI");
//# sourceMappingURL=RestartGameUI.js.map