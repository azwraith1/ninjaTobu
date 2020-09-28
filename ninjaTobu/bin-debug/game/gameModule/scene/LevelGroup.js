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
// TypeScript file
var LevelGroup = (function (_super) {
    __extends(LevelGroup, _super);
    function LevelGroup() {
        return _super.call(this) || this;
    }
    LevelGroup.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initGroup();
    };
    LevelGroup.prototype.initGroup = function () {
        this.height = GameConst.totalLen;
        ConfigManager.instance.load("ninja_cofig02_json");
        var datas = ConfigManager.instance.datas;
        var keys = Object.keys(datas);
        for (var index = 0; index < keys.length; index++) {
            var data = datas[keys[index]]; //当前单个json数据
            var type = data.type;
            var obj = void 0;
            var initX = (data.distance[0][0]);
            var initY = (data.distance[0][1]);
            if (type == ObstacleType.block) {
                if (data.rotation || data.rotation_angle) {
                    obj = RoteBlockObject.produce(data);
                    this.addChild(obj);
                    Scene.roteBlockArray.push(obj);
                }
                else {
                    obj = BlockObject.produce(data);
                    this.addChild(obj);
                    Scene.blockArray.push(obj);
                }
            }
            else if (type === ObstacleType.pole) {
                obj = new Pole(data);
                this.addChild(obj);
            }
            else if (type === ObstacleType.blade) {
                obj = Blade.creat(data);
                this.addChild(obj);
                obj.anchorOffsetX = obj.width / 2;
                obj.anchorOffsetY = obj.height / 2;
            }
            else if (type === ObstacleType.swingBlade) {
                obj = SwingBlade.creat(data);
                this.addChild(obj);
            }
            else if (type === ObstacleType.spikes) {
                var dir = void 0;
                switch (data.rotation_angle) {
                    case 0:
                        dir = 0;
                        break;
                    case 90:
                        dir = 3;
                        break;
                    case 180:
                        dir = 1;
                        break;
                    case 270:
                        dir = 2;
                        break;
                }
                var spikes = SpikesManage.instance.creatSpikes2(initX, initY, dir, (data.width), false, (data.scale));
                DisplayerToCanvas.add.apply(DisplayerToCanvas, [this, null].concat(spikes));
                // Scene.trapsArray.push(...spikes);
            }
            else if (type === ObstacleType.endPoint) {
                LevelGroup.endPoint = new EndPoint("goalmarker_png");
                LevelGroup.endPoint.x = initX;
                LevelGroup.endPoint.y = initY;
                this.addChild(LevelGroup.endPoint);
            }
            else if (type === ObstacleType.door) {
                obj = new eui.Image("gate_png");
                obj.x = initX;
                obj.y = initY;
                obj.rotation = (data.rotation);
                this.addChild(obj);
            }
            else if (type == ObstacleType.enemy) {
                var enemy = Soldiers.produce(data.source);
                enemy.x = initX;
                enemy.y = initY;
                this.addChild(enemy);
                Soldiers.enemyArray.push(enemy);
            }
            else if (type == ObstacleType.coin) {
                var coin = Coin.produce(data.source);
                coin.x = initX - 40;
                coin.y = initY - 40;
                this.addChild(coin);
                Scene.coinArray.push(coin);
            }
        }
    };
    LevelGroup.prototype.clear = function () {
        for (var i = 0; i < this.numChildren; i++) {
            var trap = this.getChildAt(i);
            if (trap instanceof Spikes || trap instanceof Soldiers || trap instanceof BlockObject || trap instanceof RoteBlockObject || trap instanceof Blade || trap instanceof SwingBlade) {
                trap.visible = false;
            }
        }
        if (LevelGroup.endPoint)
            LevelGroup.endPoint.visible = false;
    };
    LevelGroup.prototype.disponse = function () {
        for (var i = 0; i < Scene.coinArray.length; i++) {
            var coin = Scene.coinArray[i];
            coin.parent.removeChild(coin);
            Coin.reclain(coin);
            Scene.coinArray.splice(i, 1);
        }
    };
    LevelGroup.prototype.show = function () {
        for (var i = 0; i < this.numChildren; i++) {
            var trap = this.getChildAt(i);
            if (trap instanceof Spikes || trap instanceof Soldiers || trap instanceof BlockObject || trap instanceof RoteBlockObject || trap instanceof Blade || trap instanceof SwingBlade) {
                trap.visible = true;
            }
        }
        if (LevelGroup.endPoint)
            LevelGroup.endPoint.visible = true;
    };
    return LevelGroup;
}(eui.Group));
__reflect(LevelGroup.prototype, "LevelGroup");
//# sourceMappingURL=LevelGroup.js.map