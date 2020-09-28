class EndPointManage {
    private static _instance: EndPointManage; //单例
    public static get instance(): EndPointManage {
        return this._instance = this._instance || new EndPointManage();
    }
    private constructor() { }

    public creat(): void {

    }
}