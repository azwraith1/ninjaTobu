/**
 * 游戏主逻辑模块
 */
class SceneMediator extends Mediator {
    public gameScene: TempScene;


    //游戏内事件监听
    addGameEventListener(): void {
        this.addEventListener(GameEvent.HIT_LEFT_RECT, this.standLeft, this);
        this.addEventListener(GameEvent.HIT_RIGHT_RECT, this.standRight, this);
        this.addEventListener(GameEvent.HIT_BOTTOM_RECT, this.standBottom, this);
        this.addEventListener(GameEvent.HIT_TOP_RECT, this.standTop, this);
        this.addEventListener(GameEvent.START, this.startSlide, this);
        this.addEventListener(GameEvent.ROLE_DEAD, this.stopSlide, this);
        this.addEventListener(GameEvent.ARRIVE_END, this.arrive, this);
        this.addEventListener(GameEvent.ROLE_ATTCKED, this.playerBounce, this);
        this.addEventListener(GameEvent.SHOW_MUNE, this.showMenu, this);
    }

    initView() {
        this.gameScene = new TempScene();
        this.gameScene.initUI();

    }

    resetView() {
        this.gameScene.restScene();
    }

    private startSlide(): void {
        if (!GameConst.IS_SLIDE) {
            GameConst.IS_SLIDE = true;
        }
    }

    stopSlide() {
        GameConst.IS_SLIDE = false;
        this.gameScene.restart();
    }

    onEnter(): void {
        ViewManager.instance.addElement(this.gameScene);
        this.gameScene.enter();

    }
    standLeft(e: egret.Event) {
        this.gameScene.standLeft(e);
        this.gameScene.stopBulletTime();
    }

    standRight(e: egret.Event) {
        this.gameScene.standRight(e);
        this.gameScene.stopBulletTime();
    }

    standTop() {
        this.gameScene.standTop();
        this.gameScene.stopBulletTime();
    }

    standBottom() {
        this.gameScene.standBottom();
        this.gameScene.stopBulletTime();
    }

    onExit(): void {
        this.gameScene.exit();
        ViewManager.instance.removeElement(this.gameScene);

    }
    arrive() {
        this.gameScene.arrive();
    }
    playerBounce(e) {
        // this.gameScene.playerBounce(e);
        if (this.gameScene.playerIcon.state == "INVICIBLE") return;
        GameConst.CURRENT_HP -= 0.2 * GameConst.INIT_HP;
        this.gameScene.playerBounce(e);
        
    }
    showMenu() {
        // this.gameScene = null;
        // this.initView();
        this.gameScene.showMenu();
    }

    public getScene() {
        return this.gameScene;
    }
}