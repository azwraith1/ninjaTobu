var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObstacleType;
(function (ObstacleType) {
    ObstacleType["block"] = "block";
    ObstacleType["spikes"] = "trap";
    ObstacleType["pole"] = "pole";
    ObstacleType["blade"] = "blade";
    ObstacleType["swingBlade"] = "swingBlade";
    ObstacleType["door"] = "door";
    ObstacleType["endPoint"] = "endPoint";
    ObstacleType["enemy"] = "enemy";
    ObstacleType["sniper"] = "sniper";
    ObstacleType["swordman"] = "swordman";
    ObstacleType["coin"] = "coin";
    ObstacleType["coinBox"] = "coinBox";
})(ObstacleType || (ObstacleType = {}));
//配置管理
var ConfigManager = (function () {
    function ConfigManager() {
    }
    Object.defineProperty(ConfigManager, "instance", {
        get: function () {
            return this._instance = this._instance || new ConfigManager();
        },
        enumerable: true,
        configurable: true
    });
    ConfigManager.prototype.load = function (config) {
        if (config === void 0) { config = "ninja_default_json"; }
        // RES.getResByUrl('/resource/assest/config/ninja_level.json', this.onComplete, this, RES.ResourceItem.TYPE_JSON);
        this._datas = RES.getRes(config);
        // this._datas = {};
    };
    ConfigManager.prototype.onComplete = function (datas) {
    };
    Object.defineProperty(ConfigManager.prototype, "datas", {
        get: function () {
            return this._datas;
        },
        enumerable: true,
        configurable: true
    });
    return ConfigManager;
}());
__reflect(ConfigManager.prototype, "ConfigManager");
//# sourceMappingURL=ConfigManager.js.map