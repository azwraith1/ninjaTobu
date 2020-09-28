// TypeScript file
class SelectItem extends eui.Component {
    public icon: eui.Image;
    public txt: eui.Label;
    public text: string;
    public texture: string;

    public constructor(data) {
        super();
        this.skinName = "SelectItemSkin";
        this.text = data.text;
        this.texture = data.source;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectTalent, this);
    }

    public createChildren() {
        super.createChildren();
        this.txt.text = this.text;
        this.icon.source = this.texture;
    }

    /*
    *天赋
    */
    public selectTalent() {
        switch (this.text) {
            case "多重射击":
                GameConst.TALENT_TYPE = 1;
                break;
            case "淬毒":
                GameConst.TALENT_TYPE = 2;
                break;
            case "巨型飞镖":
                GameConst.TALENT_TYPE = 3;
                break;
        }
        GameConst.OWN_TALENT.push(GameConst.TALENT_TYPE);
        ObserverManager.instance.dispatchEventWith(GameEvent.CLOSE_SELECT);
    }
}