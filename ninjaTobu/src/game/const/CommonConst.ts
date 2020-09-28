class CommonConst {
    public static STAGE_WIDTH = 750;
    public static STAGE_HEIGHT = 1334;
    public static GAME_ID: string = "ninjaTobu";

    //加载相关的groupName
    public static RES_GROUP_PRELOAD: string = "preload";
    public static RES_GROUP_PLAYER: string = "player";
    public static RES_GROUP_SCENE: string = "scene";
    public static RES_GROUP_SELECT: string = "select";

    //静默加载顺序
    public static RES_GROUP_ORDER: string[] = [CommonConst.RES_GROUP_PRELOAD];

    public static RES_GROUP_MEDIATOR: {} = {
        "LobbyMediator": CommonConst.RES_GROUP_PRELOAD,
        "PlayerMediator": CommonConst.RES_GROUP_PLAYER,
        "SceneMediator": CommonConst.RES_GROUP_SCENE,
        "SelectMediator":CommonConst.RES_GROUP_SELECT
    };
}
