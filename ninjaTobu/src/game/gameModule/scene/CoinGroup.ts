// TypeScript file
class CoinGroup extends eui.Group {
    public endPoint: EndPoint;
    public goldDownGroup: eui.Group = new eui.Group();
    public constructor() {
        super();
        ObserverManager.instance.addEventListener(GameEvent.BROKEN_BOX, this.goldenRain, this);
    }

    public createChildren() {
        super.createChildren();
        this.initGroup();
    }

    public initGroup() {
        ConfigManager.instance.load("ninja_coin_json");
        let datas: Object = ConfigManager.instance.datas;
        let keys: string[] = Object.keys(datas);
        for (let index = 0; index < keys.length; index++) {
            const data: TableNinjaLevel = datas[keys[index]]; //当前单个json数据
            let type: string = data.type;
            let obj;
            let initX: number = (data.distance[0][0]);
            let initY: number = (data.distance[0][1]);
            if (type == ObstacleType.block) { //石块障碍物
                if ((data.rotation) || (data.rotation_angle)) {
                    obj = RoteBlockObject.produce(data);
                    this.addChild(obj);
                    Scene.roteBlockArray.push(obj);
                } else {
                    obj = BlockObject.produce(data);
                    this.addChild(obj);
                    Scene.blockArray.push(obj);
                }
            } else if (type === ObstacleType.pole) { //杆
                obj = new Pole(data);
                this.addChild(obj);
            } else if (type === ObstacleType.blade) { //齿轮障碍物、
                obj = Blade.creat(data);
                this.addChild(obj);
            } else if (type === ObstacleType.swingBlade) { //摆动齿轮障碍物
                obj = SwingBlade.creat(data);
                this.addChild(obj);
            } else if (type === ObstacleType.spikes) { //尖刺
                let spikes: Spikes[] = SpikesManage.instance.creatSpikes(initX, initY, Dir.RIGHT, (data.width), false, (data.scale));
                DisplayerToCanvas.add(this, null, ...spikes);
                // Scene.trapsArray.push(...spikes);
            } else if (type === ObstacleType.endPoint) { //终点
                this.endPoint = new EndPoint("goalmarker_png");
                this.endPoint.x = initX;
                this.endPoint.y = initY;
                this.addChild(this.endPoint);
            } else if (type === ObstacleType.door) { //门
                obj = new eui.Image("gate_png");
                obj.x = initX;
                obj.y = initY;
                obj.rotation = (data.rotation);
                this.addChild(obj);
            } else if (type == ObstacleType.enemy) {
                let enemy = Soldiers.produce(data.source);
                enemy.x = initX;
                enemy.y = initY;
                this.addChild(enemy);
                Soldiers.enemyArray.push(enemy);
            } else if (type == ObstacleType.coin) {
                let coin = Coin.produce(data.source);
                coin.x = initX;
                coin.y = initY;
                this.addChild(coin);
                Scene.coinArray.push(coin);
            } else if (type == ObstacleType.coinBox) {
                let box = new GoldBox();
                box.init();
                box.x = initX;
                box.y = initY;
                this.addChild(box);
                GoldBox.goldBoxArray.push(box);
                GameConst.BASE_SPEED = 0;
            }
        }
    }

    public clear() {
        for (let i = 0; i < this.numChildren; i++) {
            let coin = this.getChildAt(i);
            if (coin instanceof Coin) {
                coin.visible = false;
            }
        }
    }

    public show() {
        for (let i = 0; i < this.numChildren; i++) {
            let coin = this.getChildAt(i);
            if (coin instanceof Coin) {
                coin.visible = true;
            }
        }
    }

    private timer: any;
    private coinNum: number = 0;
    public goldenRain() {
        this.timer = egret.setInterval(() => {
            if (this.coinNum < 100) {
                let gold_right1 = this.createGold("coin_png");
                this.goldDownGroup.addChild(gold_right1);
                this.coinNum++;
                Scene.coinArray.push(gold_right1);
            }
        }, this, 100);
        egret.setTimeout(() => {
            egret.clearInterval(this.timer);
        }, this, 5000);
    }

    public createGold(name) {
        let gold_big = Coin.produce(name);
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
        egret.Tween.get(gold_big).to({ y: GameConst.totalLen }, 10000, egret.Ease.cubicIn).call(() => {
            Coin.reclain(gold_big);
            gold_big.parent.removeChild(gold_big);
            this.coinNum--;
            Scene.coinArray.shift();
        });
        // egret.Tween.get(gold_big, { loop: true }).to({ scaleX: -1, scaleY: -1 }, 800).to({ scaleX: 1, scaleY: 1 }, 800)
        return gold_big;
    }


}