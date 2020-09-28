class GameEvent extends egret.Event {
    public static START = "START"; //游戏开始
    public static HIT_LEFT_RECT: string = "HIT_LEFT_RECT"; //接触面为左边
    public static HIT_RIGHT_RECT: string = "HIT_RIGHT_RECT";//接触面为右边
    public static HIT_TOP_RECT: string = "HIT_TOP_RECT";//接触面为上边
    public static HIT_BOTTOM_RECT: string = "HIT_BOTTOM_RECT";//接触面为下边
    public static ROLE_DEAD: string = "ROLE_DEAD"; //人物死亡
    public static ARRIVE_END: string = "ARRIVE_END" //到终点
    public static WALL_STAND: string = "WALL_STAND"; //墙体类型依附
    public static ARRIVE_SWORD_ENEMY: string = "ARRIVE_SWORD_ENEMY";// 士兵攻击范围
    public static ENEMY_DEAD: string = "ENEMY_DEAD";//敌人死亡
    public static ROLE_ATTCKED: string = "ROLE_ATTCKED"; //角色被刀兵攻击后后撤
    public static SHOW_MUNE: string = "SHOW_MUNE";//游戏菜单
    public static ATTCK_BOX: string = "ATTCK_BOX";
    public static BROKEN_BOX: string = "BROKEN_BOX";
    public static CLOSE_SELECT: string = "CLOSE_SELECT";
}