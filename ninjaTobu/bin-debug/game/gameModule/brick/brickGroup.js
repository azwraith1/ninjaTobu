var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BrickGroup = (function () {
    function BrickGroup() {
        this._wallLen = 1200;
        this._lArr = [];
        this._rArr = [];
    }
    Object.defineProperty(BrickGroup, "instance", {
        get: function () {
            return this._instance = this._instance || new BrickGroup();
        },
        enumerable: true,
        configurable: true
    });
    BrickGroup.prototype.initWall = function () {
        // 210 1200
        var num = 3;
        var offset = 115;
        for (var i = 0; i < num; i++) {
            this.creatUnit(-offset, this._lArr, i);
            this.creatUnit(GameConst.SCREEN_WIDTH - 210 + offset, this._rArr, i);
        }
    };
    Object.defineProperty(BrickGroup.prototype, "lArr", {
        get: function () {
            return this._lArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BrickGroup.prototype, "rArr", {
        get: function () {
            return this._rArr;
        },
        enumerable: true,
        configurable: true
    });
    BrickGroup.prototype.creatUnit = function (x, arr, index) {
        var img = arr[index] ? arr[index] : new Brick("wall_png");
        img.x = x;
        if (arr[index - 1]) {
            img.y = arr[index - 1].y - this._wallLen + Math.random() * 30;
        }
        else {
            img.y = GameConst.totalLen - this._wallLen + Math.random() * 100; //配上随机值
        }
        arr[index] = img;
        // Scene.blockArray.push(img);
    };
    BrickGroup.prototype.updateWall = function () {
        this.updateUnitWall(this._lArr);
        this.updateUnitWall(this._rArr);
    };
    BrickGroup.prototype.updateUnitWall = function (arr) {
        var lPonint = arr[0].localToGlobal();
        if (lPonint.y > GameConst.SCREEN_HEIGHT) {
            arr.push(arr[0]);
            arr.shift();
            arr[2].y = arr[1].y - this._wallLen + Math.random() * 30;
        }
    };
    return BrickGroup;
}());
__reflect(BrickGroup.prototype, "BrickGroup");
//# sourceMappingURL=brickGroup.js.map