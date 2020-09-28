// TypeScript file
class GoldBox extends eui.Component {
    public box: eui.Image;
    public lock: eui.Image;
    public pzRect: eui.Rect;
    public leftBox: eui.Image;
    public rightBox: eui.Image;

    public static goldBoxArray: Array<GoldBox> = [];

    public constructor() {
        super();
        this.skinName = "GoldBoxSkin";
        ObserverManager.instance.addEventListener(GameEvent.ATTCK_BOX, this.shake, this);
    }

    public createChildren() {
        super.createChildren();
        this.init();
    }
    public init() {
        this.leftBox.visible = this.rightBox.visible = false;
        this.leftBox.horizontalCenter = this.rightBox.horizontalCenter = 0;
        this.leftBox.rotation = this.rightBox.rotation = 0;
        this.box.visible = this.lock.visible = true;
        this.box.verticalCenter = this.lock.verticalCenter = 0;
        this.time = 0;
        egret.Tween.get(this.box, { loop: true }).to({
            verticalCenter: 3
        }, 400).to({ verticalCenter: -3 }, 200);
        egret.Tween.get(this.lock, { loop: true }).to({
            verticalCenter: 3
        }, 400).to({ verticalCenter: -3 }, 200);
    }
    public time: number = 1;
    private shakeTime: number = 200;
    public shake() {
        if (!this.box.visible) return;
        egret.Tween.get(this.box).to({
            rotation: -10
        }, 200).to({
            rotation: 10
        }, 200).to({
            rotation: -5
        }, 50).to({
            rotation: 5
        }, 50).to({
            rotation: 0
        }, 20);
        this.time++;
        if (this.time >= 4) {
            this.break();
        }
    }

    public break() {
        this.leftBox.visible = this.rightBox.visible = true;
        this.box.visible = this.lock.visible = false;
        egret.Tween.get(this.leftBox).to({ rotation: -25, horizontalCenter: -15 }, 800, egret.Ease.backOut).call(() => {
            this.leftBox.visible = false;
            ObserverManager.instance.dispatchEventWith(GameEvent.BROKEN_BOX);
            this.reclaim();
        })
        egret.Tween.get(this.rightBox).to({ rotation: 25, horizontalCenter: 15 }, 800, egret.Ease.backOut).call(() => {
            this.rightBox.visible = false;
        });
    }

    public reclaim() {
        if (this && this.parent) {
            this.parent.removeChild(this);
        }
        GoldBox.goldBoxArray = [];
    }

}