
// TypeScript file  砖块类

class RoteBlockObject extends eui.Component {

    private _data: TableNinjaLevel;

    public block: eui.Image;
    public static cacheDict: Object = {};
    public initWidth;
    public initHeight;
    public leftRect: eui.Rect;
    public topRect: eui.Rect;
    public bottomRect: eui.Rect;
    public rightRect: eui.Rect;
    public isRote: boolean = true;


    public textrue: string;

    public constructor(source) {
        super();
        this.skinName = "BlockSkin";
        this.textrue = source;
    }

    public createChildren() {
        super.createChildren();
        this.block.source = this.textrue;

    }

    /**生产*/
    public static produce(data: TableNinjaLevel | string): RoteBlockObject {
        let textureName: string = typeof data === 'string' ? data : data.source;
        if (RoteBlockObject.cacheDict[textureName] == null)
            RoteBlockObject.cacheDict[textureName] = [];
        var dict: RoteBlockObject[] = RoteBlockObject.cacheDict[textureName];
        var blockObject: RoteBlockObject;
        if (dict.length > 0) {
            blockObject = dict.pop();
        } else {
            blockObject = new RoteBlockObject(RES.getRes(textureName));
            if (typeof data !== 'string') {
                blockObject.setData(data);
            }
        }
        return blockObject;
    }
    /**回收*/
    public static reclaim(blockObject: RoteBlockObject): void {
        var textureName: string = blockObject.textrue;
        if (RoteBlockObject.cacheDict[textureName] == null)
            RoteBlockObject.cacheDict[textureName] = [];
        var dict: RoteBlockObject[] = RoteBlockObject.cacheDict[textureName];
        if (dict.indexOf(blockObject) == -1)
            dict.push(blockObject);
    }

    public setData(data: TableNinjaLevel) {
        this._data = data;
        let pos: number[][] = data.distance;
        this.x = pos[0][0];
        this.y = pos[0][1];
        if (!data.rotation) this.isRote = false;
        this.width = (data.width);
        this.height = (data.height);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;

        this.rotation = (data.rotation_angle);
        this.initWidth = this.width;
        this.initHeight = this.height;

        if (pos.length > 1) { //移动运动
            let dis: number = Math.sqrt(Math.pow(pos[1][0] - pos[0][0], 2) + Math.pow(pos[1][1] - pos[0][1], 2));
            let time: number = dis / (data.velocity) * 60;
            let tween: egret.Tween = egret.Tween.get(this, { loop: true });
            tween.to({ x: pos[1][0], y: GameConst.totalLen - pos[1][1] }, time, egret.Ease.sineInOut).
                to({ x: pos[0][0], y: GameConst.totalLen - pos[0][1] }, time, egret.Ease.sineInOut);
        }

        if ((data.rotation)) {
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameRotation, this);
            this.onEnterFrameRotation();
        }
        //尖刺分布
        this.creatSpikes((data.hastrap), (data.scale));
        // if (!(data.hastrap)[0]) this.createtopRect();
        // if (!(data.hastrap)[1]) this.createbottomRect();
        // if (!(data.hastrap)[2]) this.createleftRect();
        // if (!(data.hastrap)[3]) this.createrightRect();
    }


    private onEnterFrameRotation() {
        this.anchorOffsetY = this.height >> 1;
        this.anchorOffsetX = this.width >> 1;
        this.rotation += this._data.rotation * Scene.factor;
    }


    private creatSpikes(objs, scale?): void {
        //尖刺分布  上下左右
        if (objs[0]) { //上面
            let arr: Spikes[] = SpikesManage.instance.creatSpikes(this.block.x + 10, -20, Dir.TOP, this.width, true, scale);
            DisplayerToCanvas.add(this, 0, ...arr);
        }
        if (objs[1]) { //下面
            let arr: Spikes[] = SpikesManage.instance.creatSpikes(this.block.x + 10, this.height - 10, Dir.BOTTOM, this.width, true, scale);
            DisplayerToCanvas.add(this, 0, ...arr);
        }
        if (objs[2]) { //左
            let arr: Spikes[] = SpikesManage.instance.creatSpikes(this.block.x - 20, 20, Dir.LEFT, this.height, true, scale);
            DisplayerToCanvas.add(this, 0, ...arr);
        }
        if (objs[3]) { //右
            let arr: Spikes[] = SpikesManage.instance.creatSpikes(this.width - 10, 10, Dir.RIGHT, this.height, true, scale);
            DisplayerToCanvas.add(this, 0, ...arr);
        }
    }

    createtopRect() {
        this.topRect = this[`rect2`];
        this.addChild(this.topRect);
    }

    private createbottomRect() {
        this.bottomRect = this[`rect4`];
        this.addChild(this.bottomRect);
    }

    private createleftRect() {
        this.leftRect = this[`rect3`];
        this.addChild(this.leftRect);
    }

    private createrightRect() {
        this.rightRect = this[`rect1`];
        this.addChild(this.rightRect);
    }

}