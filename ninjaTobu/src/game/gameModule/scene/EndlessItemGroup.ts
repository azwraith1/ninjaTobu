// TypeScript file
class EndlessItemGroup extends eui.Group {
    public config: string;
    public constructor(config) {
        super();
        this.height = 1334;
        this.width = 750;
        this.config = config;
    }

    public addConfig(config?: string) {
        ConfigManager.instance.load(config ? config : this.config);
        let datas: Object = ConfigManager.instance.datas;
        let keys: string[] = Object.keys(datas);
        for (let index = 0; index < keys.length; index++) {
            const data: TableNinjaLevel = datas[keys[index]]; //当前单个json数据
            let type: string = data.type;
            let obj;
            let initX: number = data.distance[0][0];
            let initY: number = data.distance[0][1];
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
            } else if (type === ObstacleType.door) { //门
                obj = new eui.Image("gate_png");
                obj.x = initX;
                obj.y = initY;
                obj.rotation = data.rotation;
                this.addChild(obj);
            } else if (type == ObstacleType.enemy) {
                let enemy = Soldiers.produce(data.source);
                enemy.initHp();
                enemy.x = initX - 40;
                enemy.y = initY - 48;
                this.addChild(enemy);
                Soldiers.enemyArray.push(enemy);
            }
        }

    }

    public static reclaim(objContainer: egret.DisplayObjectContainer) {
        for (let i = 0; i < objContainer.numChildren; i++) {
            let obj = objContainer.getChildAt(i);
            if (obj instanceof Spikes) {
                for (let j = 0; j < Scene.trapsArray.length; j++) {
                    if (Scene.trapsArray[j].$hashCode == obj.$hashCode) {
                        Scene.trapsArray.splice(j, 1);
                        Spikes.reclaim(obj);
                        continue;
                    }
                }
            } else if (obj instanceof Blade) {
                for (let j = 0; j < Scene.trapsArray.length; j++) {
                    if (Scene.trapsArray[j].$hashCode == obj.$hashCode) {
                        Scene.trapsArray.splice(j, 1);
                        Blade.reclaim(obj);
                        continue;
                    }
                }
            } else if (obj instanceof SwingBlade) {
                SwingBlade.reclaim(obj);
                objContainer.removeChild(obj);
                i--;
                continue;
            }
            else if (obj instanceof RoteBlockObject) {
                for (let j = 0; j < Scene.roteBlockArray.length; j++) {
                    if (Scene.roteBlockArray[j].$hashCode == obj.$hashCode) {
                        Scene.roteBlockArray.splice(j, 1);
                        RoteBlockObject.reclaim(obj);
                        continue;
                    }
                }
            } else if (obj instanceof Soldiers) {
                for (let j = 0; j < Soldiers.enemyArray.length; j++) {
                    if (Soldiers.enemyArray[j].$hashCode == obj.$hashCode) {
                        obj.pause();
                        Soldiers.enemyArray.splice(j, 1);
                        Soldiers.reclaim(obj);
                        continue;
                    }
                }
            } else if (obj instanceof Coin) {
                for (let j = 0; j < Scene.coinArray.length; j++) {
                    if (Scene.coinArray[j].$hashCode == obj.$hashCode) {
                        Scene.coinArray.splice(j, 1);
                        Coin.reclain(obj);
                        continue;
                    }
                }
            } else if (obj instanceof BlockObject) {
                for (let j = 0; j < Scene.blockArray.length; j++) {
                    if (Scene.blockArray[j].$hashCode == obj.$hashCode) {
                        Scene.blockArray.splice(j, 1);
                        BlockObject.reclaim(obj);
                        continue;
                    }

                }
            }
        }
        objContainer.removeChildren();
    }
}