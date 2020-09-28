// TypeScript file
class RestartGameMediator extends Mediator {
    public restartGameUI: RestartGameUI;

    //游戏内事件监听
    addGameEventListener(): void {
    }

    initView() {
        this.restartGameUI = new RestartGameUI("");
        this.restartGameUI.initUI();

    }

    onEnter(): void {
        ViewManager.instance.addElement(this.restartGameUI);
        this.restartGameUI.enter();

    }

    onExit(): void {
        this.restartGameUI.exit();
        ViewManager.instance.removeElement(this.restartGameUI);
    }

}