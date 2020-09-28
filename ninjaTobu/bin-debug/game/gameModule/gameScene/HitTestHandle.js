var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var HitTestHandle = (function () {
    function HitTestHandle() {
    }
    HitTestHandle.addTicket = function (obj) {
        egret.Ticker.getInstance().register(this.update, obj);
    };
    HitTestHandle.update = function () {
        HitTestHandle.hitTest();
    };
    /*
    * 物体碰撞检测，物体需包含类型属性
    */
    HitTestHandle.hitTest = function () {
    };
    HitTestHandle.hitBlock = function (obj) {
        //人物停止移动，播放停下动画
        var block = obj;
        if (block == "leftBlock") {
        }
        else if (block == "rightBlock") {
        }
    };
    HitTestHandle.hitTrap = function () {
        //人物死亡，播放死亡效果
    };
    HitTestHandle.hitEnemy = function (obj) {
        //攻击敌人
        var enemy = obj;
        enemy.destory();
    };
    HitTestHandle.arriveEnd = function () {
        //抵达终点
    };
    HitTestHandle.checkRolePosition = function (roleDeriction) {
        var block;
        var role;
        var disx = role.x - block.x;
        var disy = role.y - block.y;
        var distance = Math.sqrt(disx * disx + disy * disy);
        var minlength1 = Math.sqrt((Math.pow(block.height / 4, 2)) + (Math.pow(block.width / 2, 2)));
        var minlength2 = Math.sqrt((Math.pow(block.width / 4, 2)) + (Math.pow(block.height / 2, 2)));
        var maxLength = Math.sqrt(block.width * block.width + block.height * block.height) / 2;
        if (distance >= minlength1 && distance <= maxLength || distance >= minlength2 && distance <= maxLength) {
            //role可以穿过方块拐角event
            //计算运动方向与人物站立物角度判断可否穿过
        }
        else {
            //派发role无法穿过拐角，只翻跟头动作event
        }
    };
    return HitTestHandle;
}());
__reflect(HitTestHandle.prototype, "HitTestHandle");
//# sourceMappingURL=HitTestHandle.js.map