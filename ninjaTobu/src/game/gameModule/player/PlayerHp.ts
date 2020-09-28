// TypeScript file
class PlayerHp extends eui.Component {
    public hpBar: eui.Rect;

    public constructor() {
        super();
        this.skinName = "PlayerHpSkin";
    }

    public updateBar(hp,totalhp) {
        let rate = hp / totalhp;
        this.hpBar.width = 50 * rate;
        if (rate <= 0.5) {
            this.hpBar.fillColor = 0xFF0000;
        }else{
            this.hpBar.fillColor = 0x88FF07;
        }
    }
}