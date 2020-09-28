var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//摆动齿轮
var SwingBlade = (function (_super) {
    __extends(SwingBlade, _super);
    function SwingBlade(data) {
        var _this = _super.call(this) || this;
        _this.skinName = "SwingBladeSkin";
        _this._data = data;
        _this.anchorOffsetX = 25.5;
        _this.anchorOffsetY = 25.5;
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    SwingBlade.creat = function (data) {
        var swingBlade = new SwingBlade(data);
        swingBlade.setData(data);
        return swingBlade;
    };
    // /**生产*/
    // public static produce(data: TableNinjaLevel): SwingBlade {
    //     let swingblade: string = typeof data === 'string' ? data : data.source;
    //     if (SwingBlade.cacheDict[textureName] == null)
    //         SwingBlade.cacheDict[textureName] = [];
    //     var dict: SwingBlade[] = SwingBlade.cacheDict[textureName];
    //     var blockObject: SwingBlade;
    //     if (dict.length > 0) {
    //         blockObject = dict.pop();
    //     } else {
    //         blockObject = new SwingBlade(data);
    //         if (typeof data !== 'string') {
    //             blockObject.setData(data);
    //         }
    //     }
    //     return blockObject;
    // }
    SwingBlade.reclaim = function (objcontainer) {
        // var textureName: string = objcontainer.textrue;
        // if (BlockObject.cacheDict[textureName] == null)
        // { BlockObject.cacheDict[textureName] = []; }
        // var dict: BlockObject[] = BlockObject.cacheDict[textureName];
        // if (dict.indexOf(blockObject) == -1)
        //     dict.push(blockObject);
        for (var i = 0; i < objcontainer.numChildren; i++) {
            var obj = objcontainer.getChildAt(i);
            if (obj instanceof Blade) {
                for (var j = 0; j < Scene.trapsArray.length; j++) {
                    if (Scene.trapsArray[j].$hashCode == obj.$hashCode) {
                        Scene.trapsArray.splice(j, 1);
                        objcontainer.removeChild(obj);
                        continue;
                    }
                }
            }
        }
    };
    SwingBlade.prototype.setData = function (data) {
        var pos = (data.distance);
        this._blade = Blade.creat(this._data);
        this.addChild(this._blade);
        this.x = pos[0][0];
        this.y = pos[0][1];
        if (pos["length"] <= 1) {
        }
        else {
            // let tween: egret.Tween = egret.Tween.get(this, { loop: true });
            // tween.to({ x: pos[1][0], y: Config.totalLen - pos[1][1], rotation: this.rotation + 90 }, 500, egret.Ease.sineInOut).
            //     to({ x: pos[0][0], y: Config.totalLen - pos[0][1], rotation: this.rotation }, 500, egret.Ease.sineInOut);
        }
        this.pole.width = (data.radius1); //杆长
        this._blade.anchorOffsetX = data.radius;
        this._blade.anchorOffsetY = data.radius;
        this._blade.x = this.pole.width + this.pole.x;
        this._blade.y = this.pole.y;
        this.rotation = (data.rotation_angle);
        var time = Math.abs(data.cycle * 5000 / 360);
        if ((data.rotation_angle) != (data.cycle) && data.cycle % 360 == 0) {
            var tween = egret.Tween.get(this, {
                loop: true
            });
            tween.to({ rotation: (data.cycle) }, time);
            // .to({ rotation: (data.rotation_angle) }, time);
        }
        else if ((data.rotation_angle) != (data.cycle) && data.cycle % 360 != 0) {
            var tween = egret.Tween.get(this, {
                loop: true
            });
            tween.to({ rotation: (data.cycle) }, time)
                .to({ rotation: (data.rotation_angle) }, time);
        }
    };
    SwingBlade.prototype.update = function () {
        this._blade.rotation = -this.rotation;
    };
    SwingBlade.cacheDict = {};
    return SwingBlade;
}(eui.Component));
__reflect(SwingBlade.prototype, "SwingBlade");
//# sourceMappingURL=SwingBlade.js.map