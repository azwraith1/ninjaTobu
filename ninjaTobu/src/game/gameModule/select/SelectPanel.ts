// TypeScript file
class SelectPanel extends eui.Component {
    public titleText: eui.Label;
    public weaponScroller: eui.Scroller;
    public weaponGroup: eui.Group;

    public text: string = "";

    public constructor(data?) {
        super();
        this.skinName = "SelectSceneSkin";
        if (data) {
            this.text = data;
        }
        ObserverManager.instance.addEventListener(GameEvent.CLOSE_SELECT, this.close, this);
    }

    public createChildren() {
        super.createChildren();
        this.titleText.text = this.text ? this.text : "武器选择";
        this.initScroller();
    }

    public initScroller() {
        for (let i = 1; i <= GameConst.TALENT_NUMBER; i++) {
            let item = new SelectItem({ text: TALENT_NAME[i - 1], source: TALENT_ARRAY[i - 1] });
            this.weaponGroup.addChild(item);
        }
    }

    close() {
        GameUtil.removeSelf(this);
    }


}