// TypeScript file
class PlayerDarts extends eui.Component {
    public bulletGroup: eui.Group;
    public dartlabel: eui.Label;
    public num: number;
    public static _instance: PlayerDarts;

    public constructor(num) {
        super();
        this.skinName = "PlayerBulletSkin";
        if (num) {
            this.num = num;
        }
    }

    public static getInstance(num): PlayerDarts {
        if (!PlayerDarts._instance) {
            PlayerDarts._instance = new PlayerDarts(num)
        }
        return PlayerDarts._instance;
    }

    public createChildren() {
        super.createChildren();
        this.initDarts();
    }

    private initDarts() {
        for (let i = 0; i < this.num; i++) {
            let img = new eui.Image(GameConst.WEAPON);
            if (i >= 10) img.visible = false;
            this.bulletGroup.addChild(img);
        }
        this.dartlabel.text = "X" + GameConst.CLIP_NUM;
    }

    public addDarts() {
        let num = this.bulletGroup.numChildren;
        if (num >= GameConst.CLIP_NUM) return;
        let img = new eui.Image(GameConst.WEAPON);
        if (num >= 10) img.visible = false;
        this.bulletGroup.addChild(img);
        this.dartlabel.text = "X" + this.bulletGroup.numChildren;
    }

    public subDarts() {
        let num = this.bulletGroup.numChildren;
        if (num <= 0) return;
        let img = this.bulletGroup.getChildAt(num - 1);
        GameUtil.removeSelf(img);
        this.dartlabel.text = "X" + this.bulletGroup.numChildren;
    }
}