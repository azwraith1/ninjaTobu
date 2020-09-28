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
/**
 * 游戏主逻辑模块
 */
var TempSceneMediator = (function (_super) {
    __extends(TempSceneMediator, _super);
    function TempSceneMediator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //游戏内事件监听
    TempSceneMediator.prototype.addGameEventListener = function () {
        this.addEventListener(GameEvent.HIT_LEFT_RECT, this.standLeft, this);
        this.addEventListener(GameEvent.HIT_RIGHT_RECT, this.standRight, this);
        this.addEventListener(GameEvent.HIT_BOTTOM_RECT, this.standBottom, this);
        this.addEventListener(GameEvent.HIT_TOP_RECT, this.standTop, this);
        this.addEventListener(GameEvent.START, this.startSlide, this);
        this.addEventListener(GameEvent.ROLE_DEAD, this.stopSlide, this);
        this.addEventListener(GameEvent.ARRIVE_END, this.arrive, this);
        this.addEventListener(GameEvent.ROLE_ATTCKED, this.playerBounce, this);
        this.addEventListener(GameEvent.SHOW_MUNE, this.showMenu, this);
    };
    TempSceneMediator.prototype.initView = function () {
        this.gameScene = new TempScene();
        this.gameScene.initUI();
    };
    TempSceneMediator.prototype.resetView = function () {
        this.gameScene.restScene();
    };
    TempSceneMediator.prototype.startSlide = function () {
        if (!GameConst.IS_SLIDE) {
            GameConst.IS_SLIDE = true;
        }
    };
    TempSceneMediator.prototype.stopSlide = function () {
        GameConst.IS_SLIDE = false;
        this.gameScene.restart();
    };
    TempSceneMediator.prototype.onEnter = function () {
        ViewManager.instance.addElement(this.gameScene);
        this.gameScene.enter();
    };
    TempSceneMediator.prototype.standLeft = function (e) {
        this.gameScene.standLeft(e);
        this.gameScene.stopBulletTime();
    };
    TempSceneMediator.prototype.standRight = function (e) {
        this.gameScene.standRight(e);
        this.gameScene.stopBulletTime();
    };
    TempSceneMediator.prototype.standTop = function () {
        this.gameScene.standTop();
        this.gameScene.stopBulletTime();
    };
    TempSceneMediator.prototype.standBottom = function () {
        this.gameScene.standBottom();
        this.gameScene.stopBulletTime();
    };
    TempSceneMediator.prototype.onExit = function () {
        this.gameScene.exit();
        ViewManager.instance.removeElement(this.gameScene);
    };
    TempSceneMediator.prototype.arrive = function () {
        this.gameScene.arrive();
    };
    TempSceneMediator.prototype.playerBounce = function (e) {
        if (this.gameScene.playerIcon.state == "INVICIBLE")
            return;
        GameConst.CURRENT_HP -= 0.2 * GameConst.INIT_HP;
        this.gameScene.playerBounce(e);
        GameConst.INVICIBLE = "INVICIBLE";
        this.gameScene.invicibleTime();
    };
    TempSceneMediator.prototype.showMenu = function () {
        // this.gameScene = null;
        // this.initView();
        this.gameScene.showMenu();
    };
    TempSceneMediator.prototype.getScene = function () {
        return this.gameScene;
    };
    return TempSceneMediator;
}(Mediator));
__reflect(TempSceneMediator.prototype, "TempSceneMediator");
//# sourceMappingURL=TempSceneMediator.js.map