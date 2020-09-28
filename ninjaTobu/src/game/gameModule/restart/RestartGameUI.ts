// TypeScript file
class RestartGameUI extends eui.Component {
    public homeBtn: eui.Button;
    public restartBtn: eui.Button;
    public maskRect: eui.Rect;
    public nextBtn: eui.Group;
    public home: eui.Group;
    public restart: eui.Group;


    public constructor(currentState) {
        super();
        this.skinName = RestartGameSkin;
        this.currentState = currentState;
        this.validateNow();
        this.initUI();
    }

    public initUI() {
        this.restartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
        this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMenu, this);
        this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
        this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextGame, this);
        this.home.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMenu, this);
    }

    enter(): void {
        // SoundManager.instance.playMusic(SoundConst.fightMusic_mp3);
    }

    exit(): void {
    }

    restartGame() {
        egret.Tween.get(this.maskRect).to({ alpha: 1 }, 1000).call(() => {
            var sceneMediator: SceneMediator = <SceneMediator>ObserverManager.getMediator(SceneMediator)
            sceneMediator.resetView();
            this.maskRect.alpha = 0;
            if (this.parent) {
                this.parent.removeChild(this);
            }
        })
    }

    nextGame() { }

    showMenu() {
        ObserverManager.instance.dispatchEventWith(GameEvent.SHOW_MUNE);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    quitGame() {
        // ViewManager.instance.OPEN_WINDOW(LobbyMediator);
    }



}