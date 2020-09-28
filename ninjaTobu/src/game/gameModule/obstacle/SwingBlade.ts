//摆动齿轮
class SwingBlade extends eui.Component {
    public pole: eui.Image; //杆
    public axle: eui.Image; //轴

    private _data: TableNinjaLevel;
    public _blade: Blade; //齿轮
    public static cacheDict: Object = {};

    public constructor(data: TableNinjaLevel) {
        super();
        this.skinName = "SwingBladeSkin";
        this._data = data;
        this.anchorOffsetX = 25.5;
        this.anchorOffsetY = 25.5;

        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    public static creat(data: TableNinjaLevel): SwingBlade {
        let swingBlade: SwingBlade = new SwingBlade(data);
        swingBlade.setData(data);
        return swingBlade;
    }


    // /**生产*/
    // public static produce(data: TableNinjaLevel): SwingBlade {
    //     let swingblade: string = typeof data === 'string' ? data : data.source;
    //     if (SwingBlade.cacheDict[textureName] == null)
    //         SwingBlade.cacheDict[textureName] = [];
    //     var dict: SwingBlade[] = SwingBlade.cacheDict[textureName];
    //     var blockObject: SwingBlade;
    //     if (dict.length > 0) {
    //         blockObject = dict.pop();
    //     } else {
    //         blockObject = new SwingBlade(data);
    //         if (typeof data !== 'string') {
    //             blockObject.setData(data);
    //         }
    //     }
    //     return blockObject;
    // }

    public static reclaim(objcontainer: SwingBlade) {
        // var textureName: string = objcontainer.textrue;
        // if (BlockObject.cacheDict[textureName] == null)
        // { BlockObject.cacheDict[textureName] = []; }
        // var dict: BlockObject[] = BlockObject.cacheDict[textureName];
        // if (dict.indexOf(blockObject) == -1)
        //     dict.push(blockObject);
        for (let i = 0; i < objcontainer.numChildren; i++) {
            let obj = objcontainer.getChildAt(i);
            if (obj instanceof Blade) {
                for (let j = 0; j < Scene.trapsArray.length; j++) {
                    if (Scene.trapsArray[j].$hashCode == obj.$hashCode) {
                        Scene.trapsArray.splice(j, 1);
                        objcontainer.removeChild(obj);
                        continue;
                    }
                }
            }
        }
    }

    private setData(data: TableNinjaLevel): void {
        let pos = (data.distance);
        this._blade = Blade.creat(this._data);
        this.addChild(this._blade);
        this.x = pos[0][0];
        this.y = pos[0][1];
        if (pos[`length`] <= 1) { //固定

        } else { //移动
            // let tween: egret.Tween = egret.Tween.get(this, { loop: true });

            // tween.to({ x: pos[1][0], y: Config.totalLen - pos[1][1], rotation: this.rotation + 90 }, 500, egret.Ease.sineInOut).
            //     to({ x: pos[0][0], y: Config.totalLen - pos[0][1], rotation: this.rotation }, 500, egret.Ease.sineInOut);
        }
        this.pole.width = (data.radius1); //杆长
        this._blade.anchorOffsetX = data.radius;
        this._blade.anchorOffsetY = data.radius;
        this._blade.x = this.pole.width + this.pole.x;
        this._blade.y = this.pole.y;
        this.rotation = (data.rotation_angle);

        let time = Math.abs(data.cycle * 5000 / 360);
        if ((data.rotation_angle) != (data.cycle) && data.cycle % 360 == 0) {
            let tween: egret.Tween = egret.Tween.get(this, {
                loop: true
            });
            tween.to({ rotation: (data.cycle) }, time)
            // .to({ rotation: (data.rotation_angle) }, time);
        } else if ((data.rotation_angle) != (data.cycle) && data.cycle % 360 != 0) {
            let tween: egret.Tween = egret.Tween.get(this, {
                loop: true
            });
            tween.to({ rotation: (data.cycle) }, time)
                .to({ rotation: (data.rotation_angle) }, time);
        }
    }

    public update() {
        this._blade.rotation = -this.rotation;
    }


}