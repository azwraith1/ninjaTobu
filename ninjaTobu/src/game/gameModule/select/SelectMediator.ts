
class SelectMediator extends Mediator {
    public selectScene: SelectScene;


    //游戏内事件监听
    addGameEventListener(): void {
        ObserverManager.instance.addEventListener(GameEvent.CLOSE_SELECT, this.onExit, this);
    }

    initView() {
        this.selectScene = new SelectScene();
        this.selectScene.initUI();

    }


    onEnter(): void {
        ViewManager.instance.addElement(this.selectScene);
        this.selectScene.enter();

    }


    onExit(): void {
        this.selectScene.exit();
        this.selectScene.showTalent();
        ViewManager.instance.removeElement(this.selectScene);
    }
}