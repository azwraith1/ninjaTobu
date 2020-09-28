var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonConst = (function () {
    function CommonConst() {
    }
    CommonConst.STAGE_WIDTH = 750;
    CommonConst.STAGE_HEIGHT = 1334;
    CommonConst.GAME_ID = "ninjaTobu";
    //加载相关的groupName
    CommonConst.RES_GROUP_PRELOAD = "preload";
    CommonConst.RES_GROUP_PLAYER = "player";
    CommonConst.RES_GROUP_SCENE = "scene";
    CommonConst.RES_GROUP_SELECT = "select";
    //静默加载顺序
    CommonConst.RES_GROUP_ORDER = [CommonConst.RES_GROUP_PRELOAD];
    CommonConst.RES_GROUP_MEDIATOR = {
        "LobbyMediator": CommonConst.RES_GROUP_PRELOAD,
        "PlayerMediator": CommonConst.RES_GROUP_PLAYER,
        "SceneMediator": CommonConst.RES_GROUP_SCENE,
        "SelectMediator": CommonConst.RES_GROUP_SELECT
    };
    return CommonConst;
}());
__reflect(CommonConst.prototype, "CommonConst");
//# sourceMappingURL=CommonConst.js.map