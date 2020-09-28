var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EndPointManage = (function () {
    function EndPointManage() {
    }
    Object.defineProperty(EndPointManage, "instance", {
        get: function () {
            return this._instance = this._instance || new EndPointManage();
        },
        enumerable: true,
        configurable: true
    });
    EndPointManage.prototype.creat = function () {
    };
    return EndPointManage;
}());
__reflect(EndPointManage.prototype, "EndPointManage");
//# sourceMappingURL=EndPointManage.js.map