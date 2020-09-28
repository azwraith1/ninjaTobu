var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConst = (function () {
    function GameConst() {
    }
    //重力移动速度系数
    GameConst.BG_SPEED = 2;
    //屏幕宽
    GameConst.SCREEN_WIDTH = 750;
    //屏幕高
    GameConst.SCREEN_HEIGHT = 1334;
    //基础速率
    GameConst.BASE_SPEED = 0;
    //下滑速率 不包含人  只是场景
    GameConst.SLIDE_SPEED = GameConst.BASE_SPEED;
    //是否下滑
    GameConst.IS_SLIDE = false;
    //人物跳跃的加速度
    GameConst.ACC_SPEED = 0.2;
    //几段跳
    GameConst.JUMP_TIME = 3;
    //卷轴长度
    GameConst.totalLen = 4002;
    //人物初始血量
    GameConst.INIT_HP = 100;
    //人物当前血量
    GameConst.CURRENT_HP = GameConst.INIT_HP;
    //人物无敌时间
    GameConst.INVICIBLE = "NONE";
    //玩家忍者飞镖弹夹子弹数
    GameConst.CLIP_NUM = 0;
    //枪兵能挨几枪
    GameConst.SNIPER_HP = 100;
    //刀兵血量
    GameConst.SWORD_HP = 100;
    GameConst.WEAPON = "";
    GameConst.WEAPON_LIBRARY = 6;
    //越大攻速越慢
    GameConst.ATTACK_SPEED = 100;
    //装弹间隔,越大越慢
    GameConst.RELOAD_INTERVAL = 20;
    //武器伤害
    GameConst.WEAPON_POWER = 1;
    //武器道具飞行速度
    GameConst.WEAPON_SPEED = 15;
    //敌人类型
    GameConst.ENENY_TYPE = "";
    //天赋类型
    //1:多重射击,2：淬毒,3:巨型飞镖 
    GameConst.TALENT_TYPE = 0;
    //天赋种类
    GameConst.TALENT_NUMBER = 3;
    //拥有的天赋
    GameConst.OWN_TALENT = [];
    //当前第几发子弹
    GameConst.CURRENT_BULLET = 0;
    //淬毒层数
    GameConst.POISON_NUMBER = 0;
    //武器道具能否穿墙
    GameConst.CROSS_WALL = false;
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
var Layer = (function () {
    function Layer() {
    }
    Layer.topside = 999;
    return Layer;
}());
__reflect(Layer.prototype, "Layer");
//天赋图标
var TALENT_ARRAY = ["ninja_weapon1_png", "ninja_weapon2_png", "ninja_weapon3_png"];
var TALENT_NAME = ["多重射击", "淬毒", "巨型飞镖"];
//# sourceMappingURL=GameConst.js.map