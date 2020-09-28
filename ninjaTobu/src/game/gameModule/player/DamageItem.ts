// TypeScript file
class DamageItem extends eui.Component {
    public damageLabel: eui.Label;
    public num: number;
    public static _instance: DamageItem;
    public constructor(num?: number) {
        super();
        this.skinName = "DamageSkin";
        if (num) {
            this.num = num;
            this.damageLabel.text = "-" + this.num + "";
        }
    }

    public static get instance(): DamageItem {
        if (!DamageItem._instance) {
            DamageItem._instance = new DamageItem()
        }
        return DamageItem._instance;
    }


}