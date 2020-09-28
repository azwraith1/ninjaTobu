var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Config = (function () {
    function Config() {
    }
    //卷轴长度
    Config.totalLen = 3000;
    return Config;
}());
__reflect(Config.prototype, "Config");
//# sourceMappingURL=config.js.map