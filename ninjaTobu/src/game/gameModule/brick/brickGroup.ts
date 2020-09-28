class BrickGroup {
    private static _instance: BrickGroup; //单例
    public static get instance(): BrickGroup {
        return this._instance = this._instance || new BrickGroup();
    }

    private _wallLen: number;

    private _lArr: Brick[];
    private _rArr: Brick[];

    private constructor() {
        this._wallLen = 1200;

        this._lArr = [];
        this._rArr = [];
    }

    public initWall() {
        // 210 1200
        let num: number = 3;
        let offset: number = 115;
        for (let i: number = 0; i < num; i++) {
            this.creatUnit(-offset, this._lArr, i);
            this.creatUnit(GameConst.SCREEN_WIDTH - 210 + offset, this._rArr, i);
        }
    }

    public get lArr(): Brick[] {
        return this._lArr;
    }

    public get rArr(): Brick[] {
        return this._rArr;
    }

    private creatUnit(x: number, arr: Brick[], index: number): void {
        let img: Brick = arr[index] ? arr[index] : new Brick("wall_png");
        img.x = x;
        if (arr[index - 1]) {
            img.y = arr[index - 1].y - this._wallLen + Math.random() * 30;
        } else {
            img.y = GameConst.totalLen - this._wallLen + Math.random() * 100; //配上随机值
        }
        arr[index] = img;
        // Scene.blockArray.push(img);
    }

    public updateWall(): void {
        this.updateUnitWall(this._lArr);
        this.updateUnitWall(this._rArr);
    }

    public updateUnitWall(arr: Brick[]) {
        let lPonint: egret.Point = arr[0].localToGlobal();
        if (lPonint.y > GameConst.SCREEN_HEIGHT) {
            arr.push(arr[0]);
            arr.shift();
            arr[2].y = arr[1].y - this._wallLen + Math.random() * 30;
        }
    }
}