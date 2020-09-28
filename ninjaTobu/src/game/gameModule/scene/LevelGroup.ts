// TypeScript file
class LevelGroup extends eui.Group {
    public static endPoint: EndPoint;

    public constructor() {
        super();
    }

    public createChildren() {
        super.createChildren();
        this.initGroup();
    }

    public initGroup() {
        this.height = GameConst.totalLen;
        ConfigManager.instance.load("ninja_cofig02_json");
        let datas: Object = ConfigManager.instance.datas;
        let keys: string[] = Object.keys(datas);
        for (let index = 0; index < keys.length; index++) {
            const data: TableNinjaLevel = datas[keys[index]]; //当前单个json数据
            let type: string = data.type;
            let obj;
            let initX: number = (data.distance[0][0]);
            let initY: number = (data.distance[0][1]);
            if (type == ObstacleType.block) { //石块障碍物
                if (data.rotation || data.rotation_angle) {
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
                obj.anchorOffsetX = obj.width / 2;
                obj.anchorOffsetY = obj.height / 2;
            } else if (type === ObstacleType.swingBlade) { //摆动齿轮障碍物
                obj = SwingBlade.creat(data);
                this.addChild(obj);
            } else if (type === ObstacleType.spikes) { //尖刺
                let dir;
                switch (data.rotation_angle) {
                    case 0:
                        dir = 0;
                        break;
                    case 90:
                        dir = 3
                        break;
                    case 180:
                        dir = 1
                        break;
                    case 270:
                        dir = 2
                        break;
                }
                let spikes: Spikes[] = SpikesManage.instance.creatSpikes2(initX, initY, dir, (data.width), false, (data.scale));
                DisplayerToCanvas.add(this, null, ...spikes);
                // Scene.trapsArray.push(...spikes);
            } else if (type === ObstacleType.endPoint) { //终点
                LevelGroup.endPoint = new EndPoint("goalmarker_png");
                LevelGroup.endPoint.x = initX;
                LevelGroup.endPoint.y = initY;
                this.addChild(LevelGroup.endPoint);
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
            }else if (type == ObstacleType.coin) {
                let coin = Coin.produce(data.source);
                coin.x = initX -40;
                coin.y = initY -40;
                this.addChild(coin);
                Scene.coinArray.push(coin);
            }
        }
    }

    public clear() {
        for (let i = 0; i < this.numChildren; i++) {
            let trap = this.getChildAt(i);
            if (trap instanceof Spikes || trap instanceof Soldiers || trap instanceof BlockObject || trap instanceof RoteBlockObject || trap instanceof Blade || trap instanceof SwingBlade) {
                trap.visible = false;
            }
        }
        if (LevelGroup.endPoint) LevelGroup.endPoint.visible = false;
    }

    public disponse() {
        for (let i = 0; i < Scene.coinArray.length; i++) {
            let coin = Scene.coinArray[i];
            coin.parent.removeChild(coin);
            Coin.reclain(coin);
            Scene.coinArray.splice(i, 1);
        }
    }

    public show() {
        for (let i = 0; i < this.numChildren; i++) {
            let trap = this.getChildAt(i);
            if (trap instanceof Spikes || trap instanceof Soldiers || trap instanceof BlockObject || trap instanceof RoteBlockObject || trap instanceof Blade || trap instanceof SwingBlade) {
                trap.visible = true;
            }
        }
        if (LevelGroup.endPoint) LevelGroup.endPoint.visible = true;
    }
}