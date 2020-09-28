// TypeScript file
class SelectScene extends eui.Component {
    public weaponScroller: eui.Scroller;
    public weaponGroup: eui.Group;

    public constructor() {
        super();
        this.skinName = "SelectSceneSkin";
    }

    public createChildren() {
        super.createChildren();
    }

    public initUI() {
        for (let i = 2; i <= GameConst.WEAPON_LIBRARY; i++) {
            let img = new Weapon("ninja_weapon" + i + "_png");
            this.weaponGroup.addChild(img);
        }
    }

    /*
    * 选择天赋
    */
    public showTalent(){
        let talent = new SelectPanel("选择新能力");
        if(this&&this.parent){
            this.parent.addChild(talent);
        }
    }
    enter() {}
    exit() {}
}