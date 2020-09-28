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
var RoteBlockObject = (function (_super) {
    __extends(RoteBlockObject, _super);
    function RoteBlockObject(source) {
        var _this = _super.call(this) || this;
        _this.isRote = true;
        _this.skinName = "BlockSkin";
        _this.textrue = source;
        return _this;
    }
    RoteBlockObject.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.block.source = this.textrue;
    };
    /**生产*/
    RoteBlockObject.produce = function (data) {
        var textureName = typeof data === 'string' ? data : data.source;
        if (RoteBlockObject.cacheDict[textureName] == null)
            RoteBlockObject.cacheDict[textureName] = [];
        var dict = RoteBlockObject.cacheDict[textureName];
        var blockObject;
        if (dict.length > 0) {
            blockObject = dict.pop();
        }
        else {
            blockObject = new RoteBlockObject(RES.getRes(textureName));
            if (typeof data !== 'string') {
                blockObject.setData(data);
            }
        }
        return blockObject;
    };
    /**回收*/
    RoteBlockObject.reclaim = function (blockObject) {
        var textureName = blockObject.textrue;
        if (RoteBlockObject.cacheDict[textureName] == null)
            RoteBlockObject.cacheDict[textureName] = [];
        var dict = RoteBlockObject.cacheDict[textureName];
        if (dict.indexOf(blockObject) == -1)
            dict.push(blockObject);
    };
    RoteBlockObject.prototype.setData = function (data) {
        this._data = data;
        var pos = data.distance;
        this.x = pos[0][0];
        this.y = pos[0][1];
        if (!data.rotation)
            this.isRote = false;
        this.width = (data.width);
        this.height = (data.height);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.rotation = (data.rotation_angle);
        this.initWidth = this.width;
        this.initHeight = this.height;
        if (pos.length > 1) {
            var dis = Math.sqrt(Math.pow(pos[1][0] - pos[0][0], 2) + Math.pow(pos[1][1] - pos[0][1], 2));
            var time = dis / (data.velocity) * 60;
            var tween = egret.Tween.get(this, { loop: true });
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
    };
    RoteBlockObject.prototype.onEnterFrameRotation = function () {
        this.anchorOffsetY = this.height >> 1;
        this.anchorOffsetX = this.width >> 1;
        this.rotation += this._data.rotation * Scene.factor;
    };
    RoteBlockObject.prototype.creatSpikes = function (objs, scale) {
        //尖刺分布  上下左右
        if (objs[0]) {
            var arr = SpikesManage.instance.creatSpikes(this.block.x + 10, -20, Dir.TOP, this.width, true, scale);
            DisplayerToCanvas.add.apply(DisplayerToCanvas, [this, 0].concat(arr));
        }
        if (objs[1]) {
            var arr = SpikesManage.instance.creatSpikes(this.block.x + 10, this.height - 10, Dir.BOTTOM, this.width, true, scale);
            DisplayerToCanvas.add.apply(DisplayerToCanvas, [this, 0].concat(arr));
        }
        if (objs[2]) {
            var arr = SpikesManage.instance.creatSpikes(this.block.x - 20, 20, Dir.LEFT, this.height, true, scale);
            DisplayerToCanvas.add.apply(DisplayerToCanvas, [this, 0].concat(arr));
        }
        if (objs[3]) {
            var arr = SpikesManage.instance.creatSpikes(this.width - 10, 10, Dir.RIGHT, this.height, true, scale);
            DisplayerToCanvas.add.apply(DisplayerToCanvas, [this, 0].concat(arr));
        }
    };
    RoteBlockObject.prototype.createtopRect = function () {
        this.topRect = this["rect2"];
        this.addChild(this.topRect);
    };
    RoteBlockObject.prototype.createbottomRect = function () {
        this.bottomRect = this["rect4"];
        this.addChild(this.bottomRect);
    };
    RoteBlockObject.prototype.createleftRect = function () {
        this.leftRect = this["rect3"];
        this.addChild(this.leftRect);
    };
    RoteBlockObject.prototype.createrightRect = function () {
        this.rightRect = this["rect1"];
        this.addChild(this.rightRect);
    };
    RoteBlockObject.cacheDict = {};
    return RoteBlockObject;
}(eui.Component));
__reflect(RoteBlockObject.prototype, "RoteBlockObject");
//# sourceMappingURL=RoteBlockObject.js.map