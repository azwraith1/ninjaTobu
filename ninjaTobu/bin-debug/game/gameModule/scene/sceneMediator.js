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
var SceneMediator = (function (_super) {
    __extends(SceneMediator, _super);
    function SceneMediator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //游戏内事件监听
    SceneMediator.prototype.addGameEventListener = function () {
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
    SceneMediator.prototype.initView = function () {
        this.gameScene = new TempScene();
        this.gameScene.initUI();
    };
    SceneMediator.prototype.resetView = function () {
        this.gameScene.restScene();
    };
    SceneMediator.prototype.startSlide = function () {
        if (!GameConst.IS_SLIDE) {
            GameConst.IS_SLIDE = true;
        }
    };
    SceneMediator.prototype.stopSlide = function () {
        GameConst.IS_SLIDE = false;
        this.gameScene.restart();
    };
    SceneMediator.prototype.onEnter = function () {
        ViewManager.instance.addElement(this.gameScene);
        this.gameScene.enter();
    };
    SceneMediator.prototype.standLeft = function (e) {
        this.gameScene.standLeft(e);
        this.gameScene.stopBulletTime();
    };
    SceneMediator.prototype.standRight = function (e) {
        this.gameScene.standRight(e);
        this.gameScene.stopBulletTime();
    };
    SceneMediator.prototype.standTop = function () {
        this.gameScene.standTop();
        this.gameScene.stopBulletTime();
    };
    SceneMediator.prototype.standBottom = function () {
        this.gameScene.standBottom();
        this.gameScene.stopBulletTime();
    };
    SceneMediator.prototype.onExit = function () {
        this.gameScene.exit();
        ViewManager.instance.removeElement(this.gameScene);
    };
    SceneMediator.prototype.arrive = function () {
        this.gameScene.arrive();
    };
    SceneMediator.prototype.playerBounce = function (e) {
        // this.gameScene.playerBounce(e);
        if (this.gameScene.playerIcon.state == "INVICIBLE")
            return;
        GameConst.CURRENT_HP -= 0.2 * GameConst.INIT_HP;
        this.gameScene.playerBounce(e);
    };
    SceneMediator.prototype.showMenu = function () {
        // this.gameScene = null;
        // this.initView();
        this.gameScene.showMenu();
    };
    SceneMediator.prototype.getScene = function () {
        return this.gameScene;
    };
    return SceneMediator;
}(Mediator));
__reflect(SceneMediator.prototype, "SceneMediator");
//# sourceMappingURL=sceneMediator.js.map