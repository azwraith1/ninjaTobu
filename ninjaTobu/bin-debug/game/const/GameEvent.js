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
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameEvent.START = "START"; //游戏开始
    GameEvent.HIT_LEFT_RECT = "HIT_LEFT_RECT"; //接触面为左边
    GameEvent.HIT_RIGHT_RECT = "HIT_RIGHT_RECT"; //接触面为右边
    GameEvent.HIT_TOP_RECT = "HIT_TOP_RECT"; //接触面为上边
    GameEvent.HIT_BOTTOM_RECT = "HIT_BOTTOM_RECT"; //接触面为下边
    GameEvent.ROLE_DEAD = "ROLE_DEAD"; //人物死亡
    GameEvent.ARRIVE_END = "ARRIVE_END"; //到终点
    GameEvent.WALL_STAND = "WALL_STAND"; //墙体类型依附
    GameEvent.ARRIVE_SWORD_ENEMY = "ARRIVE_SWORD_ENEMY"; // 士兵攻击范围
    GameEvent.ENEMY_DEAD = "ENEMY_DEAD"; //敌人死亡
    GameEvent.ROLE_ATTCKED = "ROLE_ATTCKED"; //角色被刀兵攻击后后撤
    GameEvent.SHOW_MUNE = "SHOW_MUNE"; //游戏菜单
    GameEvent.ATTCK_BOX = "ATTCK_BOX";
    GameEvent.BROKEN_BOX = "BROKEN_BOX";
    GameEvent.CLOSE_SELECT = "CLOSE_SELECT";
    return GameEvent;
}(egret.Event));
__reflect(GameEvent.prototype, "GameEvent");
//# sourceMappingURL=GameEvent.js.map