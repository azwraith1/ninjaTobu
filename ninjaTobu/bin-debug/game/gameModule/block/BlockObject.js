// TypeScript file  砖块类
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BlockObject = (function (_super) {
    __extends(BlockObject, _super);
    function BlockObject(source) {
        var _this = _super.call(this) || this;
        _this.skinName = "BlockSkin";
        _this.textrue = source;
        return _this;
    }
    BlockObject.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.block.source = this.textrue;
    };
    /**生产*/
    BlockObject.produce = function (data) {
        var textureName = typeof data === 'string' ? data : data.source;
        if (BlockObject.cacheDict[textureName] == null)
            BlockObject.cacheDict[textureName] = [];
        var dict = BlockObject.cacheDict[textureName];
        var blockObject;
        if (dict.length > 0) {
            blockObject = dict.pop();
            if (typeof data !== 'string') {
                blockObject.setData(data);
            }
        }
        else {
            blockObject = new BlockObject(RES.getRes(textureName));
            if (typeof data !== 'string') {
                blockObject.setData(data);
            }
        }
        return blockObject;
    };
    /**回收*/
    BlockObject.reclaim = function (blockObject) {
        var textureName = blockObject.textrue;
        if (BlockObject.cacheDict[textureName] == null) {
            BlockObject.cacheDict[textureName] = [];
        }
        var dict = BlockObject.cacheDict[textureName];
        if (dict.indexOf(blockObject) == -1)
            dict.push(blockObject);
        BlockObject.spikesReclaim(blockObject);
    };
    /*
    * 带尖刺的方块的尖刺回收
    */
    BlockObject.spikesReclaim = function (objcontainer) {
        for (var i = 0; i < objcontainer.numChildren; i++) {
            var obj = objcontainer.getChildAt(i);
            if (obj instanceof Spikes) {
                for (var j = 0; j < Scene.trapsArray.length; j++) {
                    if (Scene.trapsArray[j].$hashCode == obj.$hashCode) {
                        Scene.trapsArray.splice(j, 1);
                        objcontainer.removeChild(obj);
                        i--;
                        // Spikes.reclaim(obj);
                    }
                }
            }
        }
    };
    BlockObject.prototype.setData = function (data) {
        this._data = data;
        var pos = (data.distance);
        this.x = pos[0][0];
        this.y = pos[0][1];
        this.width = (data.width);
        this.height = (data.height);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.rotation = (data.rotation_angle);
        var tempX = pos[0][0];
        var tempY = pos[0][1];
        this.x = tempX;
        this.y = tempY;
        var dis;
        var time;
        if (pos["length"] > 1) {
            dis = Math.sqrt(Math.pow(pos[1][0] - pos[0][0], 2) + Math.pow(pos[1][1] - pos[0][1], 2));
            time = dis / (data.velocity) * 60;
        }
        if (pos["length"] == 2) {
            var tween = egret.Tween.get(this, { loop: true });
            tween.to({ x: pos[1][0], y: pos[1][1] }, time).
                to({ x: tempX, y: tempY }, time);
        }
        else if (pos["length"] == 3) {
            dis = Math.sqrt(Math.pow(pos[2][0] - pos[1][0], 2) + Math.pow(pos[2][1] - pos[1][1], 2));
            var time2 = dis / (data.velocity) * 60;
            var tween = egret.Tween.get(this, { loop: true });
            tween.to({ x: pos[1][0], y: pos[1][1] }, time).
                to({ x: pos[2][0], y: pos[2][1] }, time2).
                to({ x: tempX, y: tempY }, time);
        }
        else if (pos["length"] == 4) {
            dis = Math.sqrt(Math.pow(pos[2][0] - pos[1][0], 2) + Math.pow(pos[2][1] - pos[1][1], 2));
            var time2 = dis / (data.velocity) * 60;
            dis = Math.sqrt(Math.pow(pos[3][0] - pos[2][0], 2) + Math.pow(pos[3][1] - pos[2][1], 2));
            var time3 = dis / (data.velocity) * 60;
            var tween = egret.Tween.get(this, { loop: true });
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
        if (data.hastrap[0] == 0)
            this.createtopRect();
        if (data.hastrap[1] == 0)
            this.createbottomRect();
        if (data.hastrap[2] == 0)
            this.createleftRect();
        if (data.hastrap[3] == 0)
            this.createrightRect();
    };
    BlockObject.prototype.onEnterFrameRotation = function () {
        this.anchorOffsetY = this.height >> 1;
        this.anchorOffsetX = this.width >> 1;
        this.rotation += (this._data.rotation) * Scene.factor;
    };
    BlockObject.prototype.creatSpikes = function (objs, scale) {
        //尖刺分布  上下左右
        if (objs[0]) {
            var arr = SpikesManage.instance.creatSpikes(this.block.x + 10, -20, Dir.TOP, this.width, false, scale);
            DisplayerToCanvas.add.apply(DisplayerToCanvas, [this, 0].concat(arr));
        }
        if (objs[1]) {
            var arr = SpikesManage.instance.creatSpikes(this.block.x + 10, this.height - 10, Dir.BOTTOM, this.width, false, scale);
            DisplayerToCanvas.add.apply(DisplayerToCanvas, [this, 0].concat(arr));
        }
        if (objs[2]) {
            var arr = SpikesManage.instance.creatSpikes(this.block.x - 20, 20, Dir.LEFT, this.height, false, scale);
            DisplayerToCanvas.add.apply(DisplayerToCanvas, [this, 0].concat(arr));
        }
        if (objs[3]) {
            var arr = SpikesManage.instance.creatSpikes(this.width - 10, 10, Dir.RIGHT, this.height, false, scale);
            DisplayerToCanvas.add.apply(DisplayerToCanvas, [this, 0].concat(arr));
        }
    };
    BlockObject.prototype.createleftRect = function () {
        this.leftRect = new eui.Rect();
        this.leftRect.fillAlpha = 0;
        this.leftRect.width = 5;
        this.leftRect.left = 5;
        this.leftRect.verticalCenter = 0;
        this.leftRect.height = this.height - 20;
        this.addChild(this.leftRect);
    };
    BlockObject.prototype.createrightRect = function () {
        this.rightRect = new eui.Rect();
        this.rightRect.fillAlpha = 0;
        this.rightRect.width = 5;
        this.rightRect.right = 5;
        this.rightRect.verticalCenter = 0;
        this.rightRect.height = this.height - 20;
        this.addChild(this.rightRect);
    };
    BlockObject.prototype.createtopRect = function () {
        this.topRect = new eui.Rect();
        this.topRect.fillAlpha = 0;
        this.topRect.width = this.width - 30;
        this.topRect.top = 5;
        this.topRect.horizontalCenter = 0;
        this.topRect.height = 5;
        this.addChild(this.topRect);
    };
    BlockObject.prototype.createbottomRect = function () {
        this.bottomRect = new eui.Rect();
        this.bottomRect.fillAlpha = 0;
        this.bottomRect.width = this.width - 30;
        this.bottomRect.bottom = 5;
        this.bottomRect.horizontalCenter = 0;
        this.bottomRect.height = 5;
        this.addChild(this.bottomRect);
    };
    BlockObject.cacheDict = {};
    return BlockObject;
}(eui.Component));
__reflect(BlockObject.prototype, "BlockObject");
//# sourceMappingURL=BlockObject.js.map