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
// TypeScript file  尖刺类
var Spikes = (function (_super) {
    __extends(Spikes, _super);
    function Spikes(source) {
        var _this = _super.call(this) || this;
        _this.skinName = "SpikesSkin";
        _this.texture = source;
        _this.traps.source = _this.texture;
        return _this;
    }
    /**生产*/
    Spikes.produce = function (source) {
        var textureName = source;
        if (Spikes.cacheDict[textureName] == null)
            Spikes.cacheDict[textureName] = [];
        var dict = Spikes.cacheDict[textureName];
        var blockObject;
        if (dict.length > 0) {
            blockObject = dict.pop();
        }
        else {
            blockObject = new Spikes(textureName);
        }
        return blockObject;
    };
    /**回收*/
    Spikes.reclaim = function (blockObject) {
        var textureName = blockObject.texture;
        if (Spikes.cacheDict[textureName] == null) {
            Spikes.cacheDict[textureName] = [];
        }
        var dict = Spikes.cacheDict[textureName];
        if (dict.indexOf(blockObject) == -1) {
            blockObject.skewX = 0;
            blockObject.rotation = 0;
            dict.push(blockObject);
        }
    };
    Spikes.cacheDict = {};
    return Spikes;
}(eui.Component));
__reflect(Spikes.prototype, "Spikes");
//# sourceMappingURL=spikes.js.map