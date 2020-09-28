class GameConst {
    //重力移动速度系数
    public static BG_SPEED = 2;
    //屏幕宽
    public static SCREEN_WIDTH = 750;
    //屏幕高
    public static SCREEN_HEIGHT = 1334;

    //基础速率
    public static BASE_SPEED = 0;
    //下滑速率 不包含人  只是场景
    public static SLIDE_SPEED = GameConst.BASE_SPEED;
    //是否下滑
    public static IS_SLIDE = false;

    //人物跳跃的加速度
    public static ACC_SPEED = 0.2;
    //几段跳
    public static JUMP_TIME = 3;

    //卷轴长度
    public static totalLen = 4002;
    //人物初始血量
    public static INIT_HP = 100;
    //人物当前血量
    public static CURRENT_HP = GameConst.INIT_HP;
    //人物无敌时间
    public static INVICIBLE = "NONE";
    //玩家忍者飞镖弹夹子弹数
    public static CLIP_NUM = 0;
    //枪兵能挨几枪
    public static SNIPER_HP = 100;
    //刀兵血量
    public static SWORD_HP = 100;

    public static WEAPON: string = "";

    public static WEAPON_LIBRARY: number = 6;
    //越大攻速越慢
    public static ATTACK_SPEED: number = 100;
    //装弹间隔,越大越慢
    public static RELOAD_INTERVAL: number = 20;
    //武器伤害
    public static WEAPON_POWER: number = 1;
    //武器道具飞行速度
    public static WEAPON_SPEED: number = 15;
    //敌人类型
    public static ENENY_TYPE: string = "";
    //天赋类型
    //1:多重射击,2：淬毒,3:巨型飞镖 
    public static TALENT_TYPE: number = 0;
    //天赋种类
    public static TALENT_NUMBER: number = 3;
    //拥有的天赋
    public static OWN_TALENT: Array<number> = [];
    //当前第几发子弹
    public static CURRENT_BULLET: number = 0;
    //淬毒层数
    public static POISON_NUMBER: number = 0;
    //武器道具能否穿墙
    public static CROSS_WALL: boolean = false;
}

class Layer {
    public static topside = 999;
}
//天赋图标
const TALENT_ARRAY = ["ninja_weapon1_png", "ninja_weapon2_png", "ninja_weapon3_png"];
const TALENT_NAME = ["多重射击", "淬毒", "巨型飞镖"];
