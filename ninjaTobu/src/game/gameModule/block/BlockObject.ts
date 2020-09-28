
// TypeScript file  砖块类

class BlockObject extends eui.Component {

    private _data: TableNinjaLevel;

    public block: eui.Image;
    public leftRect: eui.Rect;
    public topRect: eui.Rect;
    public bottomRect: eui.Rect;
    public rightRect: eui.Rect;
    public static cacheDict: Object = {};


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
    public static produce(data: TableNinjaLevel | string): BlockObject {
        let textureName: string = typeof data === 'string' ? data : data.source;
        if (BlockObject.cacheDict[textureName] == null)
            BlockObject.cacheDict[textureName] = [];
        var dict: BlockObject[] = BlockObject.cacheDict[textureName];
        var blockObject: BlockObject;
        if (dict.length > 0) {
            blockObject = dict.pop();
            if (typeof data !== 'string') {
                blockObject.setData(data);
            }
        } else {
            blockObject = new BlockObject(RES.getRes(textureName));
            if (typeof data !== 'string') {
                blockObject.setData(data);
            }
        }
        return blockObject;
    }
    /**回收*/
    public static reclaim(blockObject: BlockObject): void {
        var textureName: string = blockObject.textrue;
        if (BlockObject.cacheDict[textureName] == null)
        { BlockObject.cacheDict[textureName] = []; }
        var dict: BlockObject[] = BlockObject.cacheDict[textureName];
        if (dict.indexOf(blockObject) == -1)
            dict.push(blockObject);
        BlockObject.spikesReclaim(blockObject);
    }

    /*
    * 带尖刺的方块的尖刺回收
    */
    public static spikesReclaim(objcontainer: BlockObject) {
        for (let i = 0; i < objcontainer.numChildren; i++) {
            let obj = objcontainer.getChildAt(i);
            if (obj instanceof Spikes) {
                for (let j = 0; j < Scene.trapsArray.length; j++) {
                    if (Scene.trapsArray[j].$hashCode == obj.$hashCode) {
                        Scene.trapsArray.splice(j, 1);
                        objcontainer.removeChild(obj);
                        i--;
                        // Spikes.reclaim(obj);
                    }
                }
            }
        }
    }

    public setData(data: TableNinjaLevel) {
        this._data = data;
        let pos = (data.distance);
        this.x = pos[0][0];
        this.y = pos[0][1];

        this.width = (data.width);
        this.height = (data.height);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;

        this.rotation = (data.rotation_angle);
        let tempX: number = pos[0][0];
        let tempY: number = pos[0][1];
        this.x = tempX;
        this.y = tempY;
        let dis;
        let time;
        if (pos[`length`] > 1) {
            dis = Math.sqrt(Math.pow(pos[1][0] - pos[0][0], 2) + Math.pow(pos[1][1] - pos[0][1], 2));
            time = dis / (data.velocity) * 60;
        }
        if (pos[`length`] == 2) {
            let tween: egret.Tween = egret.Tween.get(this, { loop: true });
            tween.to({ x: pos[1][0], y: pos[1][1] }, time).
                to({ x: tempX, y: tempY }, time);
        } else if (pos[`length`] == 3) {
            dis = Math.sqrt(Math.pow(pos[2][0] - pos[1][0], 2) + Math.pow(pos[2][1] - pos[1][1], 2));
            let time2 = dis / (data.velocity) * 60;
            let tween: egret.Tween = egret.Tween.get(this, { loop: true });
            tween.to({ x: pos[1][0], y: pos[1][1] }, time).
                to({ x: pos[2][0], y: pos[2][1] }, time2).
                to({ x: tempX, y: tempY }, time);
        } else if (pos[`length`] == 4) {
            dis = Math.sqrt(Math.pow(pos[2][0] - pos[1][0], 2) + Math.pow(pos[2][1] - pos[1][1], 2));
            let time2 = dis / (data.velocity) * 60;
            dis = Math.sqrt(Math.pow(pos[3][0] - pos[2][0], 2) + Math.pow(pos[3][1] - pos[2][1], 2));
            let time3 = dis / (data.velocity) * 60;
            let tween: egret.Tween = egret.Tween.get(this, { loop: true });
            tween.to({ x: pos[1][0], y: pos[1][1] }, time).
                to({ x: pos[2][0], y: pos[2][1] }, time2).
                to({ x: pos[3][0], y: pos[3][1] }, time3).
                to({ x: tempX, y: tempY }, time);
        }

        if ((data.rotation)) {
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameRotation, this);
            this.onEnterFrameRotation();
        }
        //尖刺分布
        this.creatSpikes((data.hastrap), (data.scale));
        if (data.hastrap[0] == 0) this.createtopRect();
        if (data.hastrap[1] == 0) this.createbottomRect();
        if (data.hastrap[2] == 0) this.createleftRect();
        if (data.hastrap[3] == 0) this.createrightRect();
    }


    private onEnterFrameRotation() {
        this.anchorOffsetY = this.height >> 1;
        this.anchorOffsetX = this.width >> 1;
        this.rotation += (this._data.rotation) * Scene.factor;
    }


    private creatSpikes(objs, scale?): void {
        //尖刺分布  上下左右
        if (objs[0]) { //上面
            let arr: Spikes[] = SpikesManage.instance.creatSpikes(this.block.x + 10, -20, Dir.TOP, this.width, false, scale);
            DisplayerToCanvas.add(this, 0, ...arr);
        }
        if (objs[1]) { //下面
            let arr: Spikes[] = SpikesManage.instance.creatSpikes(this.block.x + 10, this.height - 10, Dir.BOTTOM, this.width, false, scale);
            DisplayerToCanvas.add(this, 0, ...arr);
        }
        if (objs[2]) { //左
            let arr: Spikes[] = SpikesManage.instance.creatSpikes(this.block.x - 20, 20, Dir.LEFT, this.height, false, scale);
            DisplayerToCanvas.add(this, 0, ...arr);
        }
        if (objs[3]) { //右
            let arr: Spikes[] = SpikesManage.instance.creatSpikes(this.width - 10, 10, Dir.RIGHT, this.height, false, scale);
            DisplayerToCanvas.add(this, 0, ...arr);
        }
    }

    private createleftRect() {
        this.leftRect = new eui.Rect();
        this.leftRect.fillAlpha = 0;
        this.leftRect.width = 5;
        this.leftRect.left = 5;
        this.leftRect.verticalCenter = 0;
        this.leftRect.height = this.height - 20;
        this.addChild(this.leftRect);
    }

    private createrightRect() {
        this.rightRect = new eui.Rect();
        this.rightRect.fillAlpha = 0;
        this.rightRect.width = 5;
        this.rightRect.right = 5;
        this.rightRect.verticalCenter = 0;
        this.rightRect.height = this.height - 20;
        this.addChild(this.rightRect);
    }

    private createtopRect() {
        this.topRect = new eui.Rect();
        this.topRect.fillAlpha = 0;
        this.topRect.width = this.width - 30;
        this.topRect.top = 5;
        this.topRect.horizontalCenter = 0;
        this.topRect.height = 5;
        this.addChild(this.topRect);
    }

    private createbottomRect() {
        this.bottomRect = new eui.Rect();
        this.bottomRect.fillAlpha = 0;
        this.bottomRect.width = this.width - 30;
        this.bottomRect.bottom = 5;
        this.bottomRect.horizontalCenter = 0;
        this.bottomRect.height = 5;
        this.addChild(this.bottomRect);
    }

}