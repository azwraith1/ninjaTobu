//�յ�
class EndPoint extends eui.Image {

    //64 * 64
    public scale = 1;
    public constructor(source) {
        super(source);
        this.init();
    }

    public init(): void {
        this.anchorOffsetX = 32;
        this.anchorOffsetY = 32;

        let tw = egret.Tween.get(this, { loop: true });
        tw.to({ scaleX: 1.2, scaleY: 1.2 }, 500, egret.Ease.cubicInOut).
            to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.cubicInOut);
    }
}