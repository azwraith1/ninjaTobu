enum ObstacleType {
    block = "block",   //砖块
    spikes = "trap",  //刺
    pole = "pole", //杆 
    blade = "blade", //齿轮
    swingBlade = "swingBlade", //摆动齿轮
    door = "door", //门
    endPoint = "endPoint", //终点
    enemy = "enemy",
    sniper = "sniper",
    swordman = "swordman",
    coin = "coin",
    coinBox = "coinBox"
}

//配置管理
class ConfigManager {
    private static _instance: ConfigManager;
    public static get instance(): ConfigManager {
        return this._instance = this._instance || new ConfigManager();
    }

    private _datas: Object;

    private constructor() {

    }

    public load(config: string = "ninja_default_json") {
        // RES.getResByUrl('/resource/assest/config/ninja_level.json', this.onComplete, this, RES.ResourceItem.TYPE_JSON);
        this._datas = RES.getRes(config);
        // this._datas = {};

    }

    private onComplete(datas: Object): void {
    }

    public get datas(): Object {
        return this._datas;
    }
}


