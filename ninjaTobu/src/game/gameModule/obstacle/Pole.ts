//杆类

class Pole extends eui.Component {

    public img: eui.Image;
    private _data: TableNinjaLevel;

    public constructor(data: TableNinjaLevel) {
        super();
        this.skinName = "PoleSkin";
        this._data = data;

        this.anchorOffsetY = this.height >> 1;
        let pos = (data.distance);

        let dis: number = Math.sqrt(Math.pow(pos[1][0] - pos[0][0], 2) + Math.pow(pos[1][1] - pos[0][1], 2));
        this.width = dis;
        let angle = Math.atan2((pos[1][1] - pos[0][1]), (pos[1][0] - pos[0][0])) * 180 / Math.PI;
        this.rotation = Math.abs(angle);

        // let time: number = dis / data.velocity * 60;
        // let tween: egret.Tween = egret.Tween.get(this, { loop: true });
        // tween.to({ x: this.width }, time, egret.Ease.sineInOut).
        //     to({ x: 0 }, time, egret.Ease.sineInOut);
    }
}