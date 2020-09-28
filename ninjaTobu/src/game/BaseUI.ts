/**
 * 面板基类
 */
module game {
    export class BaseUI extends eui.Component {
        public constructor() {
            super();
            this.touchEnabled = true;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        }

        protected onAdded() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
           
        }

        protected onRemoved() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.destroy();
        }

        protected createChildren() {
            super.createChildren();
        }

        protected parseGame() {
            this.execAllPauseFn(), this.execAllAutoTimeout();
        }


        protected remuseGame() {

        }

        public onEnterFrame(delayTime: number): void {
        }

        protected onTouchTap(e: egret.TouchEvent) {
            e.stopPropagation();
        }

        protected changeLanguageUI(){

        }

        /**
         * 销毁
         */
        protected destroy() {
        }

        /**
         * 添加暂停后调用的函数（后台运行立即执行）
         */
        protected addPauseFn(fn: Function, thisObj) {
        }

        /**
         * 移除暂停函数
         */
        protected removePauseFn(fn: Function, thisObj) {
        }

        /**
         * 执行所有暂停函数
         */
        protected execAllPauseFn() {
        }

        /**
         * 游戏APP暂停调用
         */
        protected onPause() {
        }

        /**
         * 添加延迟函数(后台则立即执行)
         * @param  {} fn
         * @param  {} thisObj
         * @param  {} time
         */
        protected setAutoTimeout(fn, thisObj, time) {
        }

        /**
         * 清除延迟函数
         * @param  {} timeId
         */
        protected clearAutoTimeout(timeId) {
        }

        /**
         * 执行延迟函数
         * @param  {} timeId
         */
        protected execAutoTimeout(timeId) {
        }

        /**
         * 执行所有延迟函数
         */
        protected execAllAutoTimeout() {
        }

        /**
         * 清除所有延迟函数
         */
        protected clearAllAutoTimeout() {
        }
    }

}


