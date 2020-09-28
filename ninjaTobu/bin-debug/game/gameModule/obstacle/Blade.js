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
var Blade = (function (_super) {
    __extends(Blade, _super);
    function Blade(source) {
        var _this = _super.call(this) || this;
        _this.scale = 1;
        _this.skinName = "BladeSkin";
        _this.textrue = source;
        return _this;
    }
    Blade.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.icon.source = this.textrue;
    };
    Blade.creat = function (data) {
        var source = data.source;
        var blade = new Blade(source);
        blade.setData(data);
        Scene.trapsArray.push(blade);
        return blade;
    };
    Blade.prototype.setData = function (data) {
        this._data = data;
        var pos = (data.distance);
        this.icon.scaleX = this.icon.scaleY = data.scale;
        this.scale = data.scale;
        var offsetX = (this._data.width / 2);
        var offsetY = (this._data.height / 2);
        this.icon.anchorOffsetX = offsetX;
        this.icon.anchorOffsetY = offsetY;
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
            dis = Math.sqrt(Math.pow(pos[0][0] - pos[2][0], 2) + Math.pow(pos[0][1] - pos[2][1], 2));
            var time3 = dis / (data.velocity) * 60;
            var tween = egret.Tween.get(this, { loop: true });
            tween.to({ x: pos[1][0], y: pos[1][1] }, time).
                to({ x: pos[2][0], y: pos[2][1] }, time2).
                to({ x: tempX, y: tempY }, time3);
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
                to({ x: tempX, y: tempY }, time2);
        }
        if ((data.rotation)) {
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameRotaion, this);
        }
    };
    /**生产*/
    Blade.produce = function (source) {
        var textureName = source;
        if (Blade.cacheDict[textureName] == null)
            Blade.cacheDict[textureName] = [];
        var dict = Blade.cacheDict[textureName];
        var blockObject;
        if (dict.length > 0) {
            blockObject = dict.pop();
        }
        else {
            blockObject = new Blade(textureName);
        }
        return blockObject;
    };
    /**回收*/
    Blade.reclaim = function (blockObject) {
        var textureName = blockObject.textrue;
        if (Blade.cacheDict[textureName] == null) {
            Blade.cacheDict[textureName] = [];
        }
        var dict = Blade.cacheDict[textureName];
        if (dict.indexOf(blockObject) == -1) {
            dict.push(blockObject);
        }
    };
    Blade.prototype.onEnterFrameRotaion = function () {
        this.icon.rotation += (this._data.rotation) * Scene.factor;
    };
    Blade.cacheDict = {};
    return Blade;
}(eui.Component));
__reflect(Blade.prototype, "Blade");
//# sourceMappingURL=Blade.js.map