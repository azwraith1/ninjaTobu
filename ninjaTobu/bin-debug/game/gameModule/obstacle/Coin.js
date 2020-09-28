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
// TypeScript file
var Coin = (function (_super) {
    __extends(Coin, _super);
    function Coin(texture) {
        var _this = _super.call(this) || this;
        _this.skinName = "CoinSkin";
        _this.texture = texture;
        _this.coin.source = _this.texture;
        return _this;
    }
    Coin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    Coin.produce = function (texture) {
        var textureName = texture;
        if (Coin.cacheDict[textureName] == null)
            Coin.cacheDict[textureName] = [];
        var dict = Coin.cacheDict[textureName];
        var blockObject;
        if (dict.length > 0) {
            blockObject = dict.pop();
        }
        else {
            blockObject = new Coin(RES.getRes(textureName));
        }
        return blockObject;
    };
    Coin.reclain = function (coin) {
        var textureName = coin.texture;
        if (Coin.cacheDict[textureName] == null)
            Coin.cacheDict[textureName] = [];
        var dict = Coin.cacheDict[textureName];
        if (dict.indexOf(coin) == -1)
            dict.push(coin);
    };
    Coin.cacheDict = {};
    return Coin;
}(eui.Component));
__reflect(Coin.prototype, "Coin");
//# sourceMappingURL=Coin.js.map