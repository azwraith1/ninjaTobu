var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//尖刺管理器
var Dir;
(function (Dir) {
    Dir[Dir["TOP"] = 0] = "TOP";
    Dir[Dir["BOTTOM"] = 1] = "BOTTOM";
    Dir[Dir["LEFT"] = 2] = "LEFT";
    Dir[Dir["RIGHT"] = 3] = "RIGHT";
})(Dir || (Dir = {}));
var SpikesManage = (function () {
    function SpikesManage() {
    }
    Object.defineProperty(SpikesManage, "instance", {
        get: function () {
            return this._instance = this._instance || new SpikesManage();
        },
        enumerable: true,
        configurable: true
    });
    SpikesManage.prototype.creatSpikes = function (x, y, dir, len, rote, scale, height) {
        var arr = [];
        //基本长度尺寸 100 * 30  但是有空隙取90
        var width = 90;
        var num = Math.floor(len / 100);
        for (var index = 0; index < num; index++) {
            var img = new Spikes("spikes_png");
            arr.push(img);
            img.scale = scale;
            if (!rote) {
                Scene.trapsArray.push(img);
            }
            ;
            if (dir == Dir.TOP) {
                img.x = index == 0 ? x : x + width * index;
                img.y = y;
            }
            else if (dir == Dir.BOTTOM) {
                //翻转
                img.traps.skewX = 180;
                img.x = index == 0 ? x : x + width * index;
                img.y = y;
            }
            else if (dir == Dir.LEFT) {
                //翻转
                img.traps.skewX = 180;
                //旋转90
                img.traps.rotation = 90;
                img.x = x;
                img.y = index == 0 ? y : y + width * index;
            }
            else if (dir == Dir.RIGHT) {
                //旋转90
                img.traps.rotation = 90;
                img.x = x;
                img.y = index == 0 ? y : y + width * index;
            }
        }
        return arr;
    };
    SpikesManage.prototype.creatSpikes2 = function (x, y, dir, len, rote, scale, height) {
        var arr = [];
        //基本长度尺寸 100 * 30  但是有空隙取90
        var width = 90;
        var num = Math.floor(len / 100);
        for (var index = 0; index < num; index++) {
            var img = Spikes.produce("spikes_png");
            arr.push(img);
            img.scale = scale;
            if (!rote) {
                Scene.trapsArray.push(img);
            }
            ;
            if (dir == Dir.TOP) {
                img.x = index == 0 ? x : x + width * index;
                img.y = y + 5;
            }
            else if (dir == Dir.BOTTOM) {
                //翻转
                img.traps.skewX = 180;
                img.x = index == 0 ? x - (width * scale) : x - (width * scale) + width * scale * index;
                img.y = y - 30 * scale;
            }
            else if (dir == Dir.LEFT) {
                //翻转
                img.traps.skewX = 180;
                //旋转90
                img.traps.rotation = 90;
                img.x = x;
                img.y = index == 0 ? y - (width * scale) : y - (width * scale) + width * scale * index;
            }
            else if (dir == Dir.RIGHT) {
                //旋转90
                img.traps.rotation = 90;
                img.x = x - 30 * scale;
                img.y = index == 0 ? y : y + width * scale * index;
            }
        }
        return arr;
    };
    return SpikesManage;
}());
__reflect(SpikesManage.prototype, "SpikesManage");
//# sourceMappingURL=SpikesManage.js.map