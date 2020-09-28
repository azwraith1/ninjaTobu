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
/**
 * 面板基类
 */
var game;
(function (game) {
    var BaseUI = (function (_super) {
        __extends(BaseUI, _super);
        function BaseUI() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = true;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
            return _this;
        }
        BaseUI.prototype.onAdded = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        };
        BaseUI.prototype.onRemoved = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.destroy();
        };
        BaseUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        BaseUI.prototype.parseGame = function () {
            this.execAllPauseFn(), this.execAllAutoTimeout();
        };
        BaseUI.prototype.remuseGame = function () {
        };
        BaseUI.prototype.onEnterFrame = function (delayTime) {
        };
        BaseUI.prototype.onTouchTap = function (e) {
            e.stopPropagation();
        };
        BaseUI.prototype.changeLanguageUI = function () {
        };
        /**
         * 销毁
         */
        BaseUI.prototype.destroy = function () {
        };
        /**
         * 添加暂停后调用的函数（后台运行立即执行）
         */
        BaseUI.prototype.addPauseFn = function (fn, thisObj) {
        };
        /**
         * 移除暂停函数
         */
        BaseUI.prototype.removePauseFn = function (fn, thisObj) {
        };
        /**
         * 执行所有暂停函数
         */
        BaseUI.prototype.execAllPauseFn = function () {
        };
        /**
         * 游戏APP暂停调用
         */
        BaseUI.prototype.onPause = function () {
        };
        /**
         * 添加延迟函数(后台则立即执行)
         * @param  {} fn
         * @param  {} thisObj
         * @param  {} time
         */
        BaseUI.prototype.setAutoTimeout = function (fn, thisObj, time) {
        };
        /**
         * 清除延迟函数
         * @param  {} timeId
         */
        BaseUI.prototype.clearAutoTimeout = function (timeId) {
        };
        /**
         * 执行延迟函数
         * @param  {} timeId
         */
        BaseUI.prototype.execAutoTimeout = function (timeId) {
        };
        /**
         * 执行所有延迟函数
         */
        BaseUI.prototype.execAllAutoTimeout = function () {
        };
        /**
         * 清除所有延迟函数
         */
        BaseUI.prototype.clearAllAutoTimeout = function () {
        };
        return BaseUI;
    }(eui.Component));
    game.BaseUI = BaseUI;
    __reflect(BaseUI.prototype, "game.BaseUI");
})(game || (game = {}));
//# sourceMappingURL=BaseUI.js.map