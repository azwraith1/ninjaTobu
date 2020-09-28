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
var EndlessItemGroup = (function (_super) {
    __extends(EndlessItemGroup, _super);
    function EndlessItemGroup(config) {
        var _this = _super.call(this) || this;
        _this.height = 1334;
        _this.width = 750;
        _this.config = config;
        return _this;
    }
    EndlessItemGroup.prototype.addConfig = function (config) {
        ConfigManager.instance.load(config ? config : this.config);
        var datas = ConfigManager.instance.datas;
        var keys = Object.keys(datas);
        for (var index = 0; index < keys.length; index++) {
            var data = datas[keys[index]]; //当前单个json数据
            var type = data.type;
            var obj = void 0;
            var initX = data.distance[0][0];
            var initY = data.distance[0][1];
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
            else if (type === ObstacleType.door) {
                obj = new eui.Image("gate_png");
                obj.x = initX;
                obj.y = initY;
                obj.rotation = data.rotation;
                this.addChild(obj);
            }
            else if (type == ObstacleType.enemy) {
                var enemy = Soldiers.produce(data.source);
                enemy.initHp();
                enemy.x = initX - 40;
                enemy.y = initY - 48;
                this.addChild(enemy);
                Soldiers.enemyArray.push(enemy);
            }
        }
    };
    EndlessItemGroup.reclaim = function (objContainer) {
        for (var i = 0; i < objContainer.numChildren; i++) {
            var obj = objContainer.getChildAt(i);
            if (obj instanceof Spikes) {
                for (var j = 0; j < Scene.trapsArray.length; j++) {
                    if (Scene.trapsArray[j].$hashCode == obj.$hashCode) {
                        Scene.trapsArray.splice(j, 1);
                        Spikes.reclaim(obj);
                        continue;
                    }
                }
            }
            else if (obj instanceof Blade) {
                for (var j = 0; j < Scene.trapsArray.length; j++) {
                    if (Scene.trapsArray[j].$hashCode == obj.$hashCode) {
                        Scene.trapsArray.splice(j, 1);
                        Blade.reclaim(obj);
                        continue;
                    }
                }
            }
            else if (obj instanceof SwingBlade) {
                SwingBlade.reclaim(obj);
                objContainer.removeChild(obj);
                i--;
                continue;
            }
            else if (obj instanceof RoteBlockObject) {
                for (var j = 0; j < Scene.roteBlockArray.length; j++) {
                    if (Scene.roteBlockArray[j].$hashCode == obj.$hashCode) {
                        Scene.roteBlockArray.splice(j, 1);
                        RoteBlockObject.reclaim(obj);
                        continue;
                    }
                }
            }
            else if (obj instanceof Soldiers) {
                for (var j = 0; j < Soldiers.enemyArray.length; j++) {
                    if (Soldiers.enemyArray[j].$hashCode == obj.$hashCode) {
                        obj.pause();
                        Soldiers.enemyArray.splice(j, 1);
                        Soldiers.reclaim(obj);
                        continue;
                    }
                }
            }
            else if (obj instanceof Coin) {
                for (var j = 0; j < Scene.coinArray.length; j++) {
                    if (Scene.coinArray[j].$hashCode == obj.$hashCode) {
                        Scene.coinArray.splice(j, 1);
                        Coin.reclain(obj);
                        continue;
                    }
                }
            }
            else if (obj instanceof BlockObject) {
                for (var j = 0; j < Scene.blockArray.length; j++) {
                    if (Scene.blockArray[j].$hashCode == obj.$hashCode) {
                        Scene.blockArray.splice(j, 1);
                        BlockObject.reclaim(obj);
                        continue;
                    }
                }
            }
        }
        objContainer.removeChildren();
    };
    return EndlessItemGroup;
}(eui.Group));
__reflect(EndlessItemGroup.prototype, "EndlessItemGroup");
//# sourceMappingURL=EndlessItemGroup.js.map