
//场景的层标识
// enum PlayerAction {
//     STAND = "playerActionStand_png",//站立
//     SQUAT = "playerActionSquat_png",//蹲
//     JUMP = "playerActionJump_png",//跳
//     HAND_WALL = "playerActionHand_wall_png",//挂墙
//     HANG_CEILING = "playerActionHang_ceiling_png"//挂顶
// }

// var GAME_MODEL: string = "";
/**
 * 用于管理组成主游戏场景的各组件（每个组件有自己的Mediator），放在这里也便于适应分辨率变化
 */

class TempScene extends eui.Component {

    public sun: eui.Image;
    public group: eui.Group;
    public menuGroup: eui.Group;
    public goldmodel: eui.Image;
    public levelmodel: eui.Image;
    public killmodel: eui.Image;
    public scoreGroup: eui.Group;
    public scoreLable: eui.Label;
    public maxScore: eui.Label;
    public playerDarts: PlayerDarts;
    public maskRect1: eui.Rect;
    public maskRect: eui.Rect;

    public leftRect: eui.Rect;
    public rightRect: eui.Rect;
    public static blockArray: Array<any> = [];
    public static roteBlockArray: Array<any> = [];
    public static coinArray: Array<Coin> = [];
    public playerIcon: PlayerIcon;
    public static trapsArray: Array<any> = [];
    public endPoint: EndPoint;
    public static factor: number = 1;
    public start: boolean = false;
    private jumani: boolean = false;
    private jumpDuration: number = 0;
    private jumpCount: number = 0;
    private touchBeginX: number = 0;
    private touchBeginY: number = 0;
    public bulletTimeIcon: eui.Image = new eui.Image();
    public arrowIcon: eui.Image = new eui.Image();
    public aniGroup: eui.Group = new eui.Group();
    private _isStart: boolean = false;


    //碰墙着陆特效
    private landEffect: dragonBones.EgretArmatureDisplay;
    //死亡粒子效果
    private deadParticle: particle.GravityParticleSystem;


    public constructor() {
        super();
        this.skinName = scene;
        this.touchEnabled = false;
        Scene.blockArray = [];
        Scene.roteBlockArray = [];
        Scene.trapsArray = [];
        Soldiers.enemyArray = [];
    }

    showAdd() {
        Adevertisement.showAdd(this);
    }


    restScene() {
        if (GAME_MODEL == "coin") {
            this.coin.show();
        }
        if (GAME_MODEL == "level") {
            this.level.show();
        }
        // Soldiers.enemyArray = [];
        this.group.height = GameConst.totalLen;
        this.group.y = GameConst.SCREEN_HEIGHT - GameConst.totalLen;
        GameConst.IS_SLIDE = false;
        this.playerIcon.x = 400;
        this.playerIcon.y = GameConst.totalLen - GameConst.SCREEN_HEIGHT + 1110;
        this.playerIcon.visible = true;
        this.playerIcon.role.source = "playerActionStand_png";
        this.jumpCount = 0;
        this.start = false;
        this.arrowIcon.scaleY = 0;
        this.bulletTimeIcon.visible = false;
        BrickGroup.instance.initWall();
        this.score = 0;
        this.scoreLable.text = this.score + "";
        this.maxh = GameConst.totalLen;
        this.killScore = 0;
        GameConst.CURRENT_HP = GameConst.INIT_HP;
        this.playerIcon.roleHp = GameConst.CURRENT_HP;

    }


    public initUI() {
        GameConst.totalLen = 8000;
        this.goldmodel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goldGame, this);
        this.levelmodel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.levelGame, this);
        this.killmodel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.endlessGame, this);
        BrickGroup.instance.initWall();
        DisplayerToCanvas.add(this.group, null, ...BrickGroup.instance.lArr);
        DisplayerToCanvas.add(this.group, null, ...BrickGroup.instance.rArr);
        // ConfigManager.instance.load("ninja_default_json");
        this.group.y = GameConst.SCREEN_HEIGHT - GameConst.totalLen;

        let datas: Object = ConfigManager.instance.datas;
        let keys: string[] = Object.keys(datas);
        for (let index = 0; index < keys.length; index++) {
            const data: TableNinjaLevel = datas[keys[index]]; //当前单个json数据
            let type: string = data.type;
            let obj;
            let initX: number = data.distance[0][0];
            let initY: number = data.distance[0][1];
            if (type == ObstacleType.block) { //石块障碍物
                if ((data.rotation) || (data.rotation_angle)) {
                    obj = RoteBlockObject.produce(data);
                    this.group.addChild(obj);
                    Scene.roteBlockArray.push(obj);
                } else {
                    obj = BlockObject.produce(data);
                    this.group.addChild(obj);
                    obj.y = GameConst.totalLen - 40;
                    Scene.blockArray.push(obj);
                }

            } else if (type === ObstacleType.door) { //门
                obj = new eui.Image("gate_png");
                obj.x = initX;
                obj.y = GameConst.totalLen - initY;
                obj.rotation = (data.rotation);
                this.group.addChild(obj);
            }
        }
        this.creatTimer();
        GameUtil.playerMaxScore = GameUtil.getPlayerScore();
        if (!GameUtil.playerMaxScore) GameUtil.playerMaxScore = 0;
        this.maxScore.text = Math.floor(GameUtil.playerMaxScore) + "";
        this.addChild(this[`scoreGroup`]);
        this.addChild(this.playerDarts);
        this.sunRise();
    }

    sunRise(hour?: number) {
        if (!hour && hour != 0) {
            let time = new Date();
            hour = time.getHours();
        }
        if (hour <= 17 && hour >= 6) {
            this.sun.source = "sun_png";
            this[`maskRect1`].fillColor = 0xF4F3DE;
        } else {
            this.sun.source = "moon_png";
            this[`maskRect1`].fillColor = 0x20235E;
        }
        this.sun.x = GameUtil.retSunPos(hour).x;
        this.sun.y = GameUtil.retSunPos(hour).y;
        this[`maskRect1`].fillAlpha = GameUtil.retAlpha(hour);
    }

    goldGame() {
        this[`menuGroup`].visible = false;
        GAME_MODEL = "coin";
        egret.Tween.get(this.maskRect).to({ fillAlpha: 1 }, 600)
            .call(() => {
                this.initConfig();
                this.coin = new CoinGroup();
                this.group.addChild(this.coin);
                this.group.addChild(this.coin.goldDownGroup);
                this.group.addChild(this.playerIcon);
            })
            .to({ fillAlpha: 0 }, 600).call(() => {
                this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                this.group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.group.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.group.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            });
    }

    levelGame() {
        this[`menuGroup`].visible = false;
        GAME_MODEL = "level";
        egret.Tween.get(this.maskRect).to({ fillAlpha: 1 }, 600)
            .call(() => {
                this.initConfig();
                this.level = new LevelGroup();
                this.group.addChild(this.level);
                this.level.y = GameConst.totalLen - this.level.height;
                this.group.addChild(this.playerIcon);
            }).to({ fillAlpha: 0 }, 600).call(() => {
                this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                this.group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.group.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.group.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            })
    }

    endlessGame() {
        this[`menuGroup`].visible = false;
        GAME_MODEL = "endless";
        GameConst.totalLen = 4002;
        BrickGroup.instance.initWall();
        DisplayerToCanvas.add(this.group, null, ...BrickGroup.instance.lArr);
        DisplayerToCanvas.add(this.group, null, ...BrickGroup.instance.rArr);
        // ConfigManager.instance.load("ninja_default_json");
        this.group.y = GameConst.SCREEN_HEIGHT - GameConst.totalLen;
        egret.Tween.get(this.maskRect).to({ fillAlpha: 1 }, 600)
            .call(() => {
                this.initConfig();
                this.createEndlessGroup();
                this.group.addChild(this.playerIcon);
            }).to({ fillAlpha: 0 }, 600).call(() => {
                this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                this.group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.group.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.group.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            })
    }

    public showMenu() {
        egret.Tween.get(this.maskRect).to({ fillAlpha: 1 }, 600).call(() => {
            this.restScene();
            this.resetScene();
            this.playerIcon.visible = true;
            this[`menuGroup`].visible = true;
            this.addChild(this[`menuGroup`]);
        })
            .to({
                fillAlpha: 0
            }, 600)

    }
    public resetScene() {
        if (GAME_MODEL == "coin") {
            this.coin.clear();
        } else if (GAME_MODEL = "level") {
            this.level.clear();
        }
    }
    private coin: CoinGroup;
    private level: LevelGroup;
    private endless: EndlessLevel;

    private initConfig(): void {
        this.playerIcon = PlayerIcon.instance;
        this.playerIcon.x = 400;
        this.playerIcon.y = GameConst.totalLen - GameConst.SCREEN_HEIGHT + 1100;
        this.playerIcon.roleHp = GameConst.CURRENT_HP;
        //箭头
        this.arrowIcon.source = RES.getRes("chest_swipe_png");
        this.arrowIcon.scaleX = 0.3;
        this.arrowIcon.scaleY = 0;
        this.arrowIcon.anchorOffsetY = 382;
        this.arrowIcon.anchorOffsetX = 215;
        this.arrowIcon.x = this.playerIcon.x + this.playerIcon.width / 2;
        this.arrowIcon.y = this.playerIcon.y + this.playerIcon.height / 2;
        //子弹时间背景
        this.bulletTimeIcon.source = RES.getRes("diamond_2_png");
        this.bulletTimeIcon.anchorOffsetX = 84.5;
        this.bulletTimeIcon.anchorOffsetY = 84.5;
        this.bulletTimeIcon.x = this.playerIcon.x + this.playerIcon.width / 2;
        this.bulletTimeIcon.y = this.playerIcon.y + this.playerIcon.height / 2;
        this.bulletTimeIcon.visible = false;

        //着陆效果
        this.landEffect = CommonUtil.createAnimation("landEffect", function () {
            this.landEffect.visible = false;
        }, this);
        this.group.addChild(this.bulletTimeIcon);

        //死亡粒子效果
        this.deadParticle = new particle.GravityParticleSystem(RES.getRes("deadParticle_png"), RES.getRes("deadParticle_json"));
        this.deadParticle.visible = false;
        this.deadParticle.x = -520; this.deadParticle.y = -520;
        this.aniGroup.addChild(this.deadParticle);

        this.group.height = GameConst.totalLen;
        this.group.y = GameConst.SCREEN_HEIGHT - GameConst.totalLen;


        //顶部生成是固定的
        if (GAME_MODEL != "endless") {
            let topBlock: BlockObject = BlockObject.produce("wall_png");
            topBlock.horizontalCenter = 0;
            topBlock.y = -120;
            topBlock.rotation = 90;
            this.group.addChild(topBlock);
            Scene.blockArray.push(topBlock);
        }
        // Scene.trapsArray.push(...arr);
        this.addChild(this.group);
        this.addChild(this.playerDarts);
        this.addChild(this.maskRect);
        this.group.addChild(this.aniGroup);
        this.group.addChild(this.arrowIcon);
        this.group.addChild(this.playerIcon);

    }

    private velocity: Array<number> = [0, 0];
    private onEnterFrame(): void {
        if (this.group.y >= 0 && GAME_MODEL != "endless") {
            GameConst.IS_SLIDE = false;
            // this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            // return;
        }
        this.sunRise();
        if (this._isStart) {
            this.playerIcon.x += (this.playerIcon.velocity[0] + this.velocity[0]) * Scene.factor;
            this.playerIcon.y += (this.playerIcon.velocity[1] + this.velocity[1]) * Scene.factor;
            this.playerIcon.velocity[1] += this.playerIcon.roleAy * Scene.factor;
            this.istrapBonus = false;
            if (this.playerIcon.localToGlobal().y <= GameConst.SCREEN_HEIGHT * 2 / 5) {
                if (this.playerIcon.velocity[1] >= 0) { //下落
                    GameConst.SLIDE_SPEED = GameConst.BASE_SPEED;
                } else {
                    GameConst.SLIDE_SPEED = -this.playerIcon.velocity[1];
                }
            } else {
                GameConst.SLIDE_SPEED = GameConst.BASE_SPEED;
            }
            this.update();
            if (GAME_MODEL == "endless") this.updateEndless();
            if (this.playerIcon.x <= 65) {
                this.stopBulletTime();
                this.standRight();
            }
            if (this.playerIcon.x >= 630) {
                this.stopBulletTime();
                this.standLeft();
            }
            if (this.playerIcon.y <= 75 && GAME_MODEL != "endless") {
                this.stopBulletTime();
                this.standBottom();
            }
            egret.Tween.TIMESCALE = Scene.factor;
            this.aniGroup.x = this.playerIcon.x + this.playerIcon.width / 2;
            this.aniGroup.y = this.playerIcon.y + this.playerIcon.height / 2;
            this.arrowIcon.x = this.playerIcon.x + this.playerIcon.width / 2;
            this.arrowIcon.y = this.playerIcon.y + this.playerIcon.height / 2;
            this.bulletTimeIcon.x = this.playerIcon.x + this.playerIcon.width / 2;
            this.bulletTimeIcon.y = this.playerIcon.y + this.playerIcon.height / 2;

            this.enemyAi();
            this.updateScore();
            if (GameConst.IS_SLIDE) {
                this.group.y += GameConst.SLIDE_SPEED * Scene.factor;
                BrickGroup.instance.updateWall();
            }

            //人死了
            this.playerIcon.roleHp = GameConst.CURRENT_HP;
            this.playerIcon.state = GameConst.INVICIBLE;
            this.playerIcon.updateHp();
            if (this.playerIcon.roleHp <= 0) {
                this.playerDead();
            }
            if (this.playerIcon.localToGlobal().y > GameConst.SCREEN_HEIGHT) {
                this.playerDead();
            }

            //子弹移除
            // for (let i = 0; i < Soldiers.bulletArray.length; i++) {
            //     let bullet = Soldiers.bulletArray[i];
            //     let point = bullet.localToGlobal();
            //     if (bullet.x < 0 || bullet.x > GameConst.SCREEN_WIDTH || bullet.y < 0 || bullet.y > GameConst.SCREEN_HEIGHT) {
            //         if (bullet && bullet.parent) {
            //             bullet.parent.removeChild(bullet);
            //         }
            //         Bullet.reclaim(bullet);
            //         Soldiers.bulletArray.splice(i, 1);
            //     }
            // }
        }

    }

    public invicibleTime() {
        if (this.playerIcon.state == "INVICIBLE") return;
        egret.Tween.get(this.playerIcon, { loop: true }).to({ alpha: 0.5 }, 200).to({ alpha: 1 }, 200);
        egret.setTimeout(() => {
            this.playerIcon.alpha = 1;
            GameConst.INVICIBLE = "NONE";
            egret.Tween.removeTweens(this.playerIcon);
        }, this, 2000)
    }

    playerDead() {
        ObserverManager.instance.dispatchEventWith(GameEvent.ROLE_DEAD);
        this.goBackTicket(this.playerIcon.velocity[0], this.playerIcon.velocity[1]);
        this.playerIcon.velocity = [0, 0];
        this.deadParticle.visible = true;
        this.deadParticle.start();
        this.deadParticle.emissionTime = 500;
        this.playerIcon.visible = false;

        egret.setTimeout(function () {
            this.deadParticle.visible = false;
        }, this, 2000)
    }

    private onTouchBegin(event: egret.TouchEvent): void {
        this.touchBeginX = event.stageX;
        this.touchBeginY = event.stageY;
        if (GAME_MODEL == "coin") this.arrowIcon.visible = false;
        //子弹时间

    }
    private angle: number;
    private onTouchMove(e: egret.TouchEvent): void {
        if (this.jumpCount >= GameConst.JUMP_TIME) {
            return;
        }
        if (GAME_MODEL != "coin") this.arrowIcon.visible = true;
        if (this.jumpCount == 1 || this.jumpCount == 2) {
            this.bulletTimeIcon.visible = true;
            Scene.factor = 0.2;
        }
        egret.Tween.get(this.bulletTimeIcon, { loop: true }).to({ scaleX: 0.5 }, 80)
            .to({ scaleY: 0.8 }, 100)
        let playerpoint = this.playerIcon.localToGlobal();
        let _diffx = e.stageX - this.touchBeginX;
        let _diffy = e.stageY - this.touchBeginY;
        let angle = Math.atan2(_diffy, _diffx);
        let hy = Math.sqrt(Math.pow(_diffy, 2) + Math.pow(_diffx, 2));
        let cos = _diffy / hy;
        let dian = Math.acos(cos);
        this.angle = 180 / (Math.PI / dian);
        if (_diffx < 0) {
            this.angle = -this.angle;
        } else if ((_diffy == 0) && (_diffx < 0)) {
            this.angle = 180;
        }
        this.arrowIcon.rotation = 180 - this.angle;
        let dis = Math.sqrt(_diffx * _diffx + _diffy * _diffy);
        if (dis > 200) dis = 200;
        this.arrowIcon.scaleY = dis * 0.005;
        this.clearShape();
        if (GAME_MODEL == "coin") {
            this.drawLines(angle, dis);
        }
    }

    private line: egret.Shape = new egret.Shape();;
    drawLines(angle, dis) {
        let vx = dis * Math.cos(angle) * 0.15 * 0.5;
        let vy = dis * Math.sin(angle) * 0.2 * 0.5;
        let t = 0;
        let s = 5;
        let v;
        let tempx = this.playerIcon.x + this.playerIcon.width / 2;
        let tempy = this.playerIcon.y + this.playerIcon.height / 2;
        let y1global = 0;
        let y2global = 0;
        while (tempx >= -300 && tempx <= 1100 && y2global < 1334) {
            let x1 = this.playerIcon.x + vx * t + this.playerIcon.width / 2;
            let y1 = this.playerIcon.y + vy * t + 0.5 * GameConst.ACC_SPEED * t * t + this.playerIcon.height / 2;
            y1global = this.playerIcon.localToGlobal().y + 0.5 * GameConst.ACC_SPEED * t * t + this.playerIcon.height / 2;
            v = Math.sqrt((vx * vx) + (vy + GameConst.ACC_SPEED * t) * (vy + GameConst.ACC_SPEED * t));
            if (v == 0) {
                t = t + Math.sqrt(2 * s / GameConst.ACC_SPEED)
            } else {
                t = t + s / v;
            }
            let x2 = this.playerIcon.x + vx * t + this.playerIcon.width / 2;
            let y2 = this.playerIcon.y + vy * t + 0.5 * GameConst.ACC_SPEED * t * t + this.playerIcon.height / 2;
            y2global = this.playerIcon.localToGlobal().y + 0.5 * GameConst.ACC_SPEED * t * t + this.playerIcon.height / 2;
            tempx = x2;
            tempy = y2;
            this.line.graphics.lineStyle(2, 0x00ff00);
            this.line.graphics.moveTo(x1, y1);
            this.line.graphics.lineTo(x2, y2);
            this.line.graphics.endFill();
            v = Math.sqrt((vx * vx) + (vy + GameConst.ACC_SPEED * t) * (vy + GameConst.ACC_SPEED * t));
            if (v == 0) {
                t = t + Math.sqrt(2 * s / GameConst.ACC_SPEED)
            } else {
                t = t + s / v;
            }
            tempx += vx * t;
            tempy += vy * t + 0.5 * GameConst.ACC_SPEED * t * t;
            y2global += vy * t + 0.5 * GameConst.ACC_SPEED * t * t;
        }
        if (this.line.height < 3000) this.group.addChild(this.line);
    }

    public clearShape() {
        this.line.graphics.clear();
    }

    private onTouchEnd(e: egret.TouchEvent): void {
        let _diffx = e.stageX - this.touchBeginX;
        let _diffy = e.stageY - this.touchBeginY;
        let dis = Math.sqrt(_diffx * _diffx + _diffy * _diffy);
        if (dis <= 20) return;
        this.clearShape();
        if (this.jumpCount >= GameConst.JUMP_TIME) {
            return;
        }
        if (!this._isStart) this._isStart = true;

        ObserverManager.sendNotification(GameEvent.START);
        //如果没有滑动，则不执行
        egret.Tween.removeTweens(this.bulletTimeIcon);
        this.arrowIcon.scaleY = 0;


        var touchPoint: egret.Point = new egret.Point(e.stageX, e.stageY);
        Scene.factor = 1;
        this.bulletTimeIcon.visible = false;

        var jumpDisX = touchPoint.x - this.touchBeginX;
        this.jumani = false;
        egret.Tween.get(this.playerIcon.role).to({ rotation: 360 }, 200).to({ rotation: 720 }, 200)
            .call(function () {
                this.playerIcon.role.source = PlayerAction.JUMP;
            }, this);
        //获得两点之间距离
        if (dis > 200) dis = 200;
        let angle = Math.atan2(_diffy, _diffx);

        let vx = dis * Math.cos(angle) * 0.15 * 0.5;
        let vy = dis * Math.sin(angle) * 0.2 * 0.5;
        this.playerIcon.velocity = [vx, vy];
        this.playerIcon.roleAy = GameConst.ACC_SPEED;
        this.dirHandle(jumpDisX);
    }

    dirHandle(jumpDisX) {
        if (this.playerIcon.role.source == PlayerAction.STAND) {
            if (this.playerIcon.velocity[1] > 0) {
                this.playerIcon.velocity[1] = 0;
                this.sault();
                return;
            }
        }
        if (this.playerIcon.role.source == PlayerAction.HANG_CEILING) {
            if (this.playerIcon.velocity[1] < 0) {
                this.playerIcon.velocity[1] = 0;
                this.sault();
                return;
            }
        }
        if (this.playerIcon.role.source == PlayerAction.HAND_WALL && this.playerIcon.role.scaleX == 1) {
            if (this.playerIcon.velocity[0] < 0) {
                this.playerIcon.velocity[0] = 0;
                this.sault();
                return;
            }
        }
        if (this.playerIcon.role.source == PlayerAction.HAND_WALL && this.playerIcon.role.scaleX == -1) {
            if (this.playerIcon.velocity[0] > 0) {
                this.playerIcon.velocity[0] = 0;
                this.sault();
                return;
            }
        }
        this.bulletFlag = false;
        this.isJumpFlag = true;
        this.jumpCount++;
        this.playerIcon.roleAy = 0.2;
        this.playerIcon.role.scaleX = jumpDisX > 0 ? 1 : -1;
        this.playerIcon.role.source = PlayerAction.SQUAT;

    }

    public isJumpFlag: boolean = false; //是否在跳跃状态
    //墙边翻跟头
    sault() {
        // for (let i = 0; i < Scene.blockArray.length; i++) {
        //     let block = Scene.blockArray[i];
        // if (GameUtil.isHit(this.playerIcon, block)) {
        egret.Tween.get(this.playerIcon.role).to({ rotation: 360 }, 200).to({ rotation: 720 }, 200).call(() => {
            for (let i = 0; i < Scene.blockArray.length; i++) {
                let block = Scene.blockArray[i];
                if (GAME_MODEL == "endless") {
                    if (GameUtil.isHit(this.playerIcon, block) || this.playerIcon.x <= 65 || this.playerIcon.x >= 630) {
                        this.playerIcon.roleAy = 0;
                        this.playerIcon.velocity = [0, 0];
                        return;
                    }
                } else if (GameUtil.isHit(this.playerIcon, block) || this.playerIcon.x <= 65 || this.playerIcon.x >= 630 || this.playerIcon.y <= 75) {
                    this.playerIcon.roleAy = 0;
                    this.playerIcon.velocity = [0, 0];
                    return;
                }
                this.playerIcon.roleAy = 0.2;
            }
        })
        // break;
        // }
        // }
    }
    public score: number = 0;
    public maxh: number = GameConst.totalLen;
    updateScore() {
        if (this.playerIcon.y < this.maxh) {
            this.score += Math.floor(this.maxh - this.playerIcon.y + this.killScore);
            this.maxh = this.playerIcon.y;
        }
        this.killScore = 0;
        this.scoreLable.text = this.score + "";
    }

    //碰墙着陆特效
    public playLandEffect() {
        this.landEffect.x = 0;
        this.landEffect.y = 0;
        this.landEffect.visible = true;
        this.landEffect.animation.play("landEffect", 1);
        this.aniGroup.addChild(this.landEffect);
    }

    public standLeft(e?: egret.Event) {
        if (this.playerIcon.x <= 75) return;
        if (!this.jumani) this.playLandEffect();
        this.playerIcon.roleAy = 0;
        this.jumani = true;
        this.playerIcon.role.rotation = 0;
        if (this.playerIcon.role.source != PlayerAction.HAND_WALL) {
            egret.Tween.removeTweens(this.playerIcon.role);
            this.goBackTicket(this.playerIcon.velocity[0], this.playerIcon.velocity[1]);
            this.playerIcon.velocity = [0, 0];
            this.playerIcon.role.source = PlayerAction.HAND_WALL;
        };

        this.playerIcon.role.scaleX = -1;
        this.playerIcon.rotation = 0;
        this.jumpCount = 0;
        this.resetPlayerBullet();
    }

    public standRight(e?: egret.Event) {
        if (this.playerIcon.x >= 620) return;
        if (!this.jumani) this.playLandEffect();
        this.jumani = true;
        this.playerIcon.roleAy = 0;
        this.playerIcon.role.rotation = 0;

        if (this.playerIcon.role.source != PlayerAction.HAND_WALL) {
            egret.Tween.removeTweens(this.playerIcon.role);
            this.goBackTicket(this.playerIcon.velocity[0], this.playerIcon.velocity[1]);
            this.playerIcon.velocity = [0, 0];
            this.playerIcon.role.source = PlayerAction.HAND_WALL;
        };

        this.playerIcon.role.scaleX = 1;
        this.playerIcon.rotation = 0;
        this.jumpCount = 0;
        this.resetPlayerBullet();
    }

    public standTop() {
        if (!this.jumani) this.playLandEffect();
        this.jumani = true;
        this.playerIcon.roleAy = 0;
        this.playerIcon.role.rotation = 0;
        if (this.playerIcon.role.source != PlayerAction.STAND) {
            egret.Tween.removeTweens(this.playerIcon.role);
            this.goBackTicket(this.playerIcon.velocity[0], this.playerIcon.velocity[1]);
            this.playerIcon.velocity = [0, 0];
            this.playerIcon.role.source = PlayerAction.STAND;
        };
        this.playerIcon.velocity[1] = 0;
        this.playerIcon.rotation = 0;
        this.jumpCount = 0;
        this.resetPlayerBullet();

    }

    public standBottom() {
        if (!this.jumani) this.playLandEffect();
        this.jumani = true;
        this.playerIcon.roleAy = 0;
        this.playerIcon.role.rotation = 0;
        if (this.playerIcon.role.source != PlayerAction.HANG_CEILING) {

            egret.Tween.removeTweens(this.playerIcon.role);
            this.goBackTicket(this.playerIcon.velocity[0], this.playerIcon.velocity[1]);
            this.playerIcon.velocity = [0, 0];
            this.playerIcon.role.source = PlayerAction.HANG_CEILING;
        };
        this.jumpCount = 0;
        this.resetPlayerBullet();
    }

    arrive() {
        let restart = new RestartGameUI("pass");
        restart.visible = true;
        restart.horizontalCenter = 0;
        this.parent.addChild(restart);
        this.start = true;
        this.playerIcon.roleAy = GameConst.ACC_SPEED;
        if (GameUtil.playerMaxScore < this.score) {
            GameUtil.playerMaxScore = this.score;
            GameUtil.setPlayerScore(this.score);
        }
        this.maxScore.text = Math.floor(GameUtil.playerMaxScore) + "";
    }
    restart() {
        let restart = new RestartGameUI("failed");
        restart.visible = true;
        Scene.factor = 1;
        egret.Tween.TIMESCALE = Scene.factor;
        restart.horizontalCenter = 0;
        this.parent.addChild(restart);
        this.start = true;
        this.arrowIcon.visible = this.bulletTimeIcon.visible = false;
        this.playerIcon.roleAy = GameConst.ACC_SPEED;
        this._isStart = false;
        if (GameUtil.playerMaxScore < this.score) {
            GameUtil.playerMaxScore = this.score;
            GameUtil.setPlayerScore(this.score);
        }
        this.maxScore.text = Math.floor(GameUtil.playerMaxScore) + "";

    }


    stopBulletTime() {
        Scene.factor = 1;
        this.bulletTimeIcon.visible = this.arrowIcon.visible = false;
    }

    private goBackTicket(vx, vy) {
        this.playerIcon.x -= vx;
        this.playerIcon.y -= vy;
    }

    public isAttackbox: boolean = false;
    public isdispatchFlag: boolean = false; //是否已经找到目标并发射子弹
    public update() {
        if (this.isJumpFlag && !this.isdispatchFlag) {
            this.playerShut();
        }
        this.bulletReclaim();
        this.trapHitTest();
        this.roteBlockHitTest();
        this.enemyHitTest();
        for (let i = 0; i < Scene.blockArray.length; i++) {
            if (this.istrapBonus) continue;
            let block = Scene.blockArray[i];
            GameUtil.blockhitTest(this.playerIcon, block, this);
        }
        this.coinHitTest();
        if (GAME_MODEL != "coin") {
            if (LevelGroup.endPoint) {
                if (GameUtil.hitTest(this.playerIcon, LevelGroup.endPoint)) {
                    if (!this.start) {
                        this.playerIcon.velocity = [0, 0];
                        ObserverManager.instance.dispatchEventWith(GameEvent.ARRIVE_END);
                    }
                }
            }
        }
        for (let i = 0; i < GoldBox.goldBoxArray.length; i++) {
            let box = GoldBox.goldBoxArray[i];
            if (GameUtil.enemyHittest(this.playerIcon, box)) {
                if (!this.isAttackbox) {
                    this.playerIcon.playAttackAni();
                    ObserverManager.instance.dispatchEventWith(GameEvent.ATTCK_BOX);
                    this.isAttackbox = true;
                }
            } else {
                this.isAttackbox = false;
            }

        }
        for (let i = 0; i < Soldiers.bulletArray.length; i++) {
            if (this.playerIcon.state == "INVICIBLE") return;
            let bullet = Soldiers.bulletArray[i];
            if (GameUtil.hitTest(this.playerIcon, bullet)) {
                if (bullet && bullet.parent) {
                    bullet.parent.removeChild(bullet);
                }
                Bullet.reclaim(bullet);
                Soldiers.bulletArray.splice(i, 1);
                GameConst.CURRENT_HP -= 0.5 * GameConst.INIT_HP;
                this.playerIcon.showDamage(0.5 * GameConst.INIT_HP);
                this.invicibleTime();
            }
        }
        this.playerbulletHit();
    }
    private istrapBonus: boolean = false;//尖刺碰撞后参与反弹不参与碰撞
    /*
    * 陷阱障碍物碰撞检测
    */
    trapHitTest() {
        if (this.playerIcon.state == "INVICIBLE") return;
        for (let i = 0; i < Scene.trapsArray.length; i++) {
            let trap = Scene.trapsArray[i];
            if (trap && GameUtil.hitTest(this.playerIcon, trap, this)) {
                if (!this.start) {
                    if (trap instanceof Spikes) {
                        GameConst.CURRENT_HP -= 0.4 * GameConst.INIT_HP;
                        this.playerIcon.showDamage(0.4 * GameConst.INIT_HP);
                        this.istrapBonus = true;
                    } else if (trap instanceof Blade) {
                        GameConst.CURRENT_HP -= 0.3 * GameConst.INIT_HP;
                        this.playerIcon.showDamage(0.3 * GameConst.INIT_HP);
                    }
                    // this.playerBounce();
                    this.playerIcon.velocity[0] = -this.playerIcon.velocity[0];
                    this.playerIcon.velocity[1] = -this.playerIcon.velocity[1];

                    this.jumpCount = 0;
                    
                    GameConst.INVICIBLE = "INVICIBLE";
                    this.invicibleTime();
                }
            }
        }
    }
    /*
    * 旋转障碍物碰撞检测
    */
    roteBlockHitTest() {
        if (this.playerIcon.state == "INVICIBLE") return;
        for (let i = 0; i < Scene.roteBlockArray.length; i++) {
            let block = Scene.roteBlockArray[i];
            if (block && GameUtil.roteRectHitTest(this.playerIcon, block, this)) {
                if (block.isRote) {
                    if (block instanceof RoteBlockObject) {
                        GameConst.CURRENT_HP -= 0.4 * GameConst.INIT_HP;
                        this.playerIcon.showDamage(0.4 * GameConst.INIT_HP);
                        this.playerBounce();
                        GameConst.INVICIBLE = "INVICIBLE";
                        this.invicibleTime();

                    }
                } else {
                    GameUtil.blockhitTest(this.playerIcon, block, this);
                }
            }
        }
    }

    coinHitTest() {
        for (let i = 0; i < Scene.coinArray.length; i++) {
            let coin = Scene.coinArray[i];
            if (GameUtil.enemyHittest(this.playerIcon, coin)) {
                // Coin.reclain(coin);
                // this.group.removeChild(coin);
                // Scene.coinArray.splice(i, 1);
                coin.visible = false;
            }
        }
    }

    /*
    * 玩家发射飞镖
    */
    playerbulletHit() {
        for (let i = 0; i < PlayerIcon.dartsArray.length; i++) {
            let bullet = PlayerIcon.dartsArray[i];
            for (let j = 0; j < Soldiers.enemyArray.length; j++) {
                let enemy = Soldiers.enemyArray[j];
                if (GameUtil.bulletHit(bullet, enemy)) {
                    enemy.enemyHurt();
                    if (bullet && bullet.parent) {
                        bullet.parent.removeChild(bullet)
                    };
                    Bullet.reclaim(bullet);
                    PlayerIcon.dartsArray.splice(i, 1);
                    if (enemy.enemyhp <= 0) {
                        Soldiers.reclaim(enemy);
                        Soldiers.enemyArray.splice(j, 1);
                        if (enemy && enemy.parent) {
                            enemy.parent.removeChild(enemy);
                        }
                    }
                }
            }
            //武器能否穿墙
            if (!GameConst.CROSS_WALL) {
                for (let k = 0; k < Scene.blockArray.length; k++) {
                    let block = Scene.blockArray[k];
                    if (GameUtil.bulletHit(bullet, block)) {
                        if (bullet && bullet.parent) { bullet.parent.removeChild(bullet) };
                        Bullet.reclaim(bullet);
                        PlayerIcon.dartsArray.splice(i, 1);
                    }
                }
            }

        }
    }
    private killScore: number = 0;
    /*
    * npc被攻击检测
    */
    enemyHitTest() {
        for (let i = 0; i < Soldiers.enemyArray.length; i++) {
            let enemy = Soldiers.enemyArray[i];
            if (GameUtil.enemyHittest(this.playerIcon, enemy)) {
                if (enemy) {
                    Soldiers.enemyArray.splice(i, 1);
                    if (enemy && enemy.parent) {
                        enemy.parent.removeChild(enemy);
                    }
                    Soldiers.reclaim(enemy);
                    enemy.enemyDead(enemy);
                    this.playerIcon.playAttackAni();
                    this.killScore = 80;
                    // this.scoreLable.text = Math.floor(this.score) + "";
                }

                // Soldiers.enemyArray.splice(i, 1);
            }
            if (enemy.localToGlobal().y > GameConst.SCREEN_HEIGHT) {
                enemy.enemyDead(enemy);
                Soldiers.enemyArray.splice(i, 1);
                Soldiers.reclaim(enemy);
            }
        }
    }
    /*
    * NPC攻击检测
    */
    enemyAi() {
        for (let i = 0; i < Soldiers.enemyArray.length; i++) {
            let enemy = Soldiers.enemyArray[i];
            let enemyPoint = enemy.localToGlobal();
            let playerPoint = this.playerIcon.localToGlobal();
            let _disx = enemyPoint.x - playerPoint.x;
            let _disy = enemyPoint.y - playerPoint.y;
            let dis = Math.sqrt(Math.pow(_disx, 2) + Math.pow(_disy, 2));
            let _dir: string = "";
            if (_disx > 0) { _dir = "left" }
            if (_disx < 0) { _dir = "right" }
            if (enemy.enemy.source == "attacking_enemy_0_png" && dis < 70 && Math.abs(enemyPoint.y - playerPoint.y) <= 100) {
                ObserverManager.instance.dispatchEventWith(GameEvent.ARRIVE_SWORD_ENEMY, false, { rangeType: "sowrd", scale: enemy.currentState, dir: _dir });
                continue;
            }
            ;
            if (enemy.enemy.source == "ranged_enemy_idle_png") {
                let data = { dir: _dir, scale: enemy.currentState, playerPoint: playerPoint, enemyPoint: enemyPoint };
                enemy.sniperAttack(data, this.group);
                continue;
            }

        }
    }
    /*
    * 角色被砍后回弹
    */
    playerBounce(e?) {
        this.playerIcon.velocity[0] = -this.playerIcon.velocity[0];
        this.playerIcon.velocity[1] = -this.playerIcon.velocity[1];
        if (e) {
            let data = e.data;
            if (data.dir == "left") {
                this.playerIcon.velocity[0] = -2;
                this.playerIcon.roleAy = 0.2;
                this.playerIcon.role.source = PlayerAction.SQUAT;
            } else if (data.dir == "right") {
                this.playerIcon.velocity[0] = 2;
                this.playerIcon.roleAy = 0.2;
                this.playerIcon.role.source = PlayerAction.SQUAT;
            }
            GameConst.INVICIBLE = "INVICIBLE";
            this.invicibleTime();
        }

    }

    public bulletFlag: boolean = false
    /*
    * 站墙上装填子弹
    */
    resetPlayerBullet() {
        if (!this.bulletFlag) {
            egret.clearInterval(this.playershutInterval);
            this.playershutInterval = egret.setInterval(() => {
                this.playerIcon.resetDarts();
                this.playerDarts.addDarts();
            }, this, GameConst.RELOAD_INTERVAL);
            this.bulletFlag = true;
            this.isJumpFlag = false;
            this.isdispatchFlag = false;
        }
    }
    public shurInterver() {
        egret.setTimeout(() => {
            this.isdispatchFlag = false;
        }, this, GameConst.ATTACK_SPEED);
    }

    public playershutInterval: any;
    public playerShut() {
        let enemy: Soldiers[] = this.findNearest();
        if (enemy && enemy.length > 0) {
            let enemyPoint = enemy[0].localToGlobal();
            let playerPoint = this.playerIcon.localToGlobal();
            if (GameConst.OWN_TALENT.indexOf(1) != -1 && enemy.length >= 2) {
                let enemyPoint1 = enemy[1].localToGlobal();
                let rotation1 = CommonUtil.getAngle(playerPoint.x, playerPoint.y, enemyPoint1.x, enemyPoint1.y) % 360;
                rotation1 = rotation1 - 90;
                this.playerIcon.playerShut(rotation1, this.group);
                this.playerDarts.subDarts();
            }
            let rotation = CommonUtil.getAngle(playerPoint.x, playerPoint.y, enemyPoint.x, enemyPoint.y) % 360;
            rotation = rotation - 90;
            egret.clearInterval(this.playershutInterval);
            // this.playershutInterval = egret.setInterval(() => {
            this.playerIcon.playerShut(rotation, this.group);
            this.playerDarts.subDarts();
            // }, this, 200);
            this.isdispatchFlag = true;
            this.shurInterver();
        }
    }

    //寻找离最近的敌人
    public findNearest(): Soldiers[] {
        let playerPoint = this.playerIcon.localToGlobal();
        let dis1 = 0;
        let dis;
        let enemyPoint;
        let retenemy = [];
        for (let i = 0; i < Soldiers.enemyArray.length; i++) {
            let enemy = Soldiers.enemyArray[i];
            enemyPoint = enemy.localToGlobal();
            dis = Math.sqrt((Math.pow(playerPoint.x - enemyPoint.x, 2) + Math.pow(playerPoint.y - enemyPoint.y, 2)));
            enemy.distance = dis;
            // if (!dis1) {
            //     dis1 = dis;
            // }
            if (dis <= 500) {
                retenemy.push(enemy);
                retenemy = _.sortBy(retenemy, function (item) {
                    return item.distance;
                })
            }
        }
        return retenemy;
    }

    //子弹回收
    public bulletReclaim() {
        for (let i = 0; i < PlayerIcon.dartsArray.length; i++) {
            let bullet = PlayerIcon.dartsArray[i];
            if (bullet.localToGlobal().x < 0 || bullet.localToGlobal().x > 750 || bullet.localToGlobal().y < 0 || bullet.localToGlobal().y > 1334) {
                if (bullet && bullet.parent) {
                    bullet.parent.removeChild(bullet)
                }
                Bullet.reclaim(bullet);
                PlayerIcon.dartsArray.splice(i, 1);
            }
        }
    }

    public list: Array<EndlessItemGroup> = [];
    public listLength: number = 3;

    //创建无尽模式初始关卡
    public createEndlessGroup() {
        for (let i = 0; i < this.listLength; i++) {
            let item = new EndlessItemGroup("ninja_endless" + (i + 1) + "_json");
            item.addConfig();
            item.y = 1334 * (2 - i);
            this.group.addChild(item);
            this.list.push(item);
        }
    }

    //无尽模式更新关卡
    private updateEndless() {
        for (let i = 0; i < this.list.length; i++) {
            let item = this.list[i];
            let itemy = item.localToGlobal().y;
            let key = Math.floor(Math.random() * 5 + 9);
            if (itemy > 1334) {
                let last = this.findFirst() as EndlessItemGroup;
                item.y = last.y - 1334;
                EndlessItemGroup.reclaim(item);
                item.addConfig("ninja_endless" + (key) + "_json");
                return;
            }
        }
    }

    //返回最底下的无尽模式item,移除,添加到最上层
    private findFirst() {
        let returnIcon = this.list[0];
        for (let i = 0; i < this.list.length; i++) {
            let icon = this.list[i];
            if (icon.y < returnIcon.y) {
                returnIcon = icon;
            }
        }
        return returnIcon;
    }

    private creatSnowflake() {
        var shp: egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0xFFFFFF, 1);
        let width: number = 10 + Math.random() * 10;
        let y: number = 400 + Math.random() * 1200;
        shp.graphics.drawRect(0, 0, width, width);
        shp.graphics.endFill();
        shp.x = 750;
        shp.y = GameConst.totalLen - y;
        this.group.addChild(shp);
        let rotation: number = -45 + Math.random() * 90;
        shp.rotation = rotation;
        let tween: egret.Tween = egret.Tween.get(shp);
        let endY: number = 200 + Math.random() * 300 + shp.y;
        tween.to({ x: 0, y: endY }, 3000 + Math.random() * 2000).call(() => {
            this.group.removeChild(shp);
            shp = null;
        });
        let tween2: egret.Tween = egret.Tween.get(shp);
        tween2.to({ alpha: 0 }, 4500 + Math.random() * 500);
    }

    private creatTimer(): void {
        let delay: number = 500 + Math.random() * 500;
        let timer: egret.Timer = new egret.Timer(delay, 1);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.creatTimer, this);
        timer.start();
    }

    private timerFunc(): void {
        this.creatSnowflake();
    }

    enter(): void {
        // SoundManager.instance.playMusic(SoundConst.fightMusic_mp3);
    }

    exit(): void {
    }

    addHitTest() {
        // if(GameUtil.hitTest())
    }

}