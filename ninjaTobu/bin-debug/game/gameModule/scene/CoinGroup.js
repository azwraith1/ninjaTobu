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
var CoinGroup = (function (_super) {
    __extends(CoinGroup, _super);
    function CoinGroup() {
        var _this = _super.call(this) || this;
        _this.goldDownGroup = new eui.Group();
        _this.coinNum = 0;
        ObserverManager.instance.addEventListener(GameEvent.BROKEN_BOX, _this.goldenRain, _this);
        return _this;
    }
    CoinGroup.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.initGroup();
    };
    CoinGroup.prototype.initGroup = function () {
        ConfigManager.instance.load("ninja_coin_json");
        var datas = ConfigManager.instance.datas;
        var keys = Object.keys(datas);
        for (var index = 0; index < keys.length; index++) {
            var data = datas[keys[index]]; //当前单个json数据
            var type = data.type;
            var obj = void 0;
            var initX = (data.distance[0][0]);
            var initY = (data.distance[0][1]);
            if (type == ObstacleType.block) {
                if ((data.rotation) || (data.rotation_angle)) {
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
                var spikes = SpikesManage.instance.creatSpikes(initX, initY, Dir.RIGHT, (data.width), false, (data.scale));
                DisplayerToCanvas.add.apply(DisplayerToCanvas, [this, null].concat(spikes));
                // Scene.trapsArray.push(...spikes);
            }
            else if (type === ObstacleType.endPoint) {
                this.endPoint = new EndPoint("goalmarker_png");
                this.endPoint.x = initX;
                this.endPoint.y = initY;
                this.addChild(this.endPoint);
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
                coin.x = initX;
                coin.y = initY;
                this.addChild(coin);
                Scene.coinArray.push(coin);
            }
            else if (type == ObstacleType.coinBox) {
                var box = new GoldBox();
                box.init();
                box.x = initX;
                box.y = initY;
                this.addChild(box);
                GoldBox.goldBoxArray.push(box);
                GameConst.BASE_SPEED = 0;
            }
        }
    };
    CoinGroup.prototype.clear = function () {
        for (var i = 0; i < this.numChildren; i++) {
            var coin = this.getChildAt(i);
            if (coin instanceof Coin) {
                coin.visible = false;
            }
        }
    };
    CoinGroup.prototype.show = function () {
        for (var i = 0; i < this.numChildren; i++) {
            var coin = this.getChildAt(i);
            if (coin instanceof Coin) {
                coin.visible = true;
            }
        }
    };
    CoinGroup.prototype.goldenRain = function () {
        var _this = this;
        this.timer = egret.setInterval(function () {
            if (_this.coinNum < 100) {
                var gold_right1 = _this.createGold("coin_png");
                _this.goldDownGroup.addChild(gold_right1);
                _this.coinNum++;
                Scene.coinArray.push(gold_right1);
            }
        }, this, 100);
        egret.setTimeout(function () {
            egret.clearInterval(_this.timer);
        }, this, 5000);
    };
    CoinGroup.prototype.createGold = function (name) {
        var _this = this;
        var gold_big = Coin.produce(name);
        if (!gold_big) {
            gold_big = new Coin(name);
            gold_big.scaleY = 1;
            gold_big.scaleX = 1;
        }
        // gold_big.callback = () => {
        //     Coin.reclain(name);
        // }
        gold_big.x = Math.ceil(Math.random() * 500) + 105;
        gold_big.y = -200;
        egret.Tween.get(gold_big).to({ y: GameConst.totalLen }, 10000, egret.Ease.cubicIn).call(function () {
            Coin.reclain(gold_big);
            gold_big.parent.removeChild(gold_big);
            _this.coinNum--;
            Scene.coinArray.shift();
        });
        // egret.Tween.get(gold_big, { loop: true }).to({ scaleX: -1, scaleY: -1 }, 800).to({ scaleX: 1, scaleY: 1 }, 800)
        return gold_big;
    };
    return CoinGroup;
}(eui.Group));
__reflect(CoinGroup.prototype, "CoinGroup");
//# sourceMappingURL=CoinGroup.js.map