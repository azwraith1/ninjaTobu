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
//场景的层标识
var PlayerAction;
(function (PlayerAction) {
    PlayerAction["STAND"] = "playerActionStand_png";
    PlayerAction["SQUAT"] = "playerActionSquat_png";
    PlayerAction["JUMP"] = "playerActionJump_png";
    PlayerAction["HAND_WALL"] = "playerActionHand_wall_png";
    PlayerAction["HANG_CEILING"] = "playerActionHang_ceiling_png"; //挂顶
})(PlayerAction || (PlayerAction = {}));
var GAME_MODEL = "";
/**
 * 用于管理组成主游戏场景的各组件（每个组件有自己的Mediator），放在这里也便于适应分辨率变化
 */
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.start = false;
        _this.jumani = false;
        _this.jumpDuration = 0;
        _this.jumpCount = 0;
        _this.touchBeginX = 0;
        _this.touchBeginY = 0;
        _this.bulletTimeIcon = new eui.Image();
        _this.arrowIcon = new eui.Image();
        _this.aniGroup = new eui.Group();
        _this._isStart = false;
        _this.velocity = [0, 0];
        _this.line = new egret.Shape();
        _this.score = 0;
        _this.maxh = GameConst.totalLen;
        _this.isAttackbox = false;
        _this.killScore = 0;
        _this.list = [];
        _this.listLength = 3;
        _this.skinName = scene;
        _this.touchEnabled = false;
        Scene.blockArray = [];
        Scene.roteBlockArray = [];
        Scene.trapsArray = [];
        Soldiers.enemyArray = [];
        return _this;
    }
    Scene.prototype.showAdd = function () {
        Adevertisement.showAdd(this);
    };
    Scene.prototype.restScene = function () {
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
    };
    Scene.prototype.initUI = function () {
        GameConst.totalLen = 8000;
        this.goldmodel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goldGame, this);
        this.levelmodel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.levelGame, this);
        this.killmodel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.endlessGame, this);
        BrickGroup.instance.initWall();
        DisplayerToCanvas.add.apply(DisplayerToCanvas, [this.group, null].concat(BrickGroup.instance.lArr));
        DisplayerToCanvas.add.apply(DisplayerToCanvas, [this.group, null].concat(BrickGroup.instance.rArr));
        // ConfigManager.instance.load("ninja_default_json");
        this.group.y = GameConst.SCREEN_HEIGHT - GameConst.totalLen;
        var datas = ConfigManager.instance.datas;
        var keys = Object.keys(datas);
        for (var index = 0; index < keys.length; index++) {
            var data = datas[keys[index]]; //当前单个json数据
            var type = data.type;
            var obj = void 0;
            var initX = data.distance[0][0];
            var initY = data.distance[0][1];
            if (type == ObstacleType.block) {
                if ((data.rotation) || (data.rotation_angle)) {
                    obj = RoteBlockObject.produce(data);
                    this.group.addChild(obj);
                    Scene.roteBlockArray.push(obj);
                }
                else {
                    obj = BlockObject.produce(data);
                    this.group.addChild(obj);
                    obj.y = GameConst.totalLen - 40;
                    Scene.blockArray.push(obj);
                }
            }
            else if (type === ObstacleType.door) {
                obj = new eui.Image("gate_png");
                obj.x = initX;
                obj.y = GameConst.totalLen - initY;
                obj.rotation = (data.rotation);
                this.group.addChild(obj);
            }
        }
        this.creatTimer();
        GameUtil.playerMaxScore = GameUtil.getPlayerScore();
        if (!GameUtil.playerMaxScore)
            GameUtil.playerMaxScore = 0;
        this.maxScore.text = Math.floor(GameUtil.playerMaxScore) + "";
        this.addChild(this["scoreGroup"]);
        this.sunRise();
    };
    Scene.prototype.sunRise = function (hour) {
        if (!hour && hour != 0) {
            var time = new Date();
            hour = time.getHours();
        }
        if (hour <= 17 && hour >= 6) {
            this.sun.source = "sun_png";
            this["maskRect1"].fillColor = 0xF4F3DE;
        }
        else {
            this.sun.source = "moon_png";
            this["maskRect1"].fillColor = 0x20235E;
        }
        this.sun.x = GameUtil.retSunPos(hour).x;
        this.sun.y = GameUtil.retSunPos(hour).y;
        this["maskRect1"].fillAlpha = GameUtil.retAlpha(hour);
    };
    Scene.prototype.goldGame = function () {
        var _this = this;
        this["menuGroup"].visible = false;
        GAME_MODEL = "coin";
        egret.Tween.get(this.maskRect).to({ fillAlpha: 1 }, 600)
            .call(function () {
            _this.initConfig();
            _this.coin = new CoinGroup();
            _this.group.addChild(_this.coin);
            _this.group.addChild(_this.coin.goldDownGroup);
            _this.group.addChild(_this.playerIcon);
        })
            .to({ fillAlpha: 0 }, 600).call(function () {
            _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
            _this.group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.group.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
            _this.group.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
        });
    };
    Scene.prototype.levelGame = function () {
        var _this = this;
        this["menuGroup"].visible = false;
        GAME_MODEL = "level";
        egret.Tween.get(this.maskRect).to({ fillAlpha: 1 }, 600)
            .call(function () {
            _this.initConfig();
            _this.level = new LevelGroup();
            _this.group.addChild(_this.level);
            _this.level.y = GameConst.totalLen - _this.level.height;
            _this.group.addChild(_this.playerIcon);
        }).to({ fillAlpha: 0 }, 600).call(function () {
            _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
            _this.group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.group.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
            _this.group.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
        });
    };
    Scene.prototype.endlessGame = function () {
        var _this = this;
        this["menuGroup"].visible = false;
        GAME_MODEL = "endless";
        GameConst.totalLen = 4002;
        BrickGroup.instance.initWall();
        DisplayerToCanvas.add.apply(DisplayerToCanvas, [this.group, null].concat(BrickGroup.instance.lArr));
        DisplayerToCanvas.add.apply(DisplayerToCanvas, [this.group, null].concat(BrickGroup.instance.rArr));
        // ConfigManager.instance.load("ninja_default_json");
        this.group.y = GameConst.SCREEN_HEIGHT - GameConst.totalLen;
        egret.Tween.get(this.maskRect).to({ fillAlpha: 1 }, 600)
            .call(function () {
            _this.initConfig();
            _this.createEndlessGroup();
            _this.group.addChild(_this.playerIcon);
        }).to({ fillAlpha: 0 }, 600).call(function () {
            _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
            _this.group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.group.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
            _this.group.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
        });
    };
    Scene.prototype.showMenu = function () {
        var _this = this;
        egret.Tween.get(this.maskRect).to({ fillAlpha: 1 }, 600).call(function () {
            _this.restScene();
            _this.resetScene();
            _this.playerIcon.visible = true;
            _this["menuGroup"].visible = true;
            _this.addChild(_this["menuGroup"]);
        })
            .to({
            fillAlpha: 0
        }, 600);
    };
    Scene.prototype.resetScene = function () {
        if (GAME_MODEL == "coin") {
            this.coin.clear();
        }
        else if (GAME_MODEL = "level") {
            this.level.clear();
        }
    };
    Scene.prototype.initConfig = function () {
        this.playerIcon = PlayerIcon.instance;
        this.playerIcon.x = 400;
        this.playerIcon.y = GameConst.totalLen - GameConst.SCREEN_HEIGHT + 1100;
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
        this.deadParticle.x = -520;
        this.deadParticle.y = -520;
        this.aniGroup.addChild(this.deadParticle);
        this.group.height = GameConst.totalLen;
        this.group.y = GameConst.SCREEN_HEIGHT - GameConst.totalLen;
        //顶部生成是固定的
        if (GAME_MODEL != "endless") {
            var topBlock = BlockObject.produce("wall_png");
            topBlock.horizontalCenter = 0;
            topBlock.y = -120;
            topBlock.rotation = 90;
            this.group.addChild(topBlock);
            Scene.blockArray.push(topBlock);
        }
        //底部尖刺生成也是固定的  宽100 高30
        var group = new eui.Group();
        this.addChild(group);
        group.y = GameConst.SCREEN_HEIGHT - 23;
        group.horizontalCenter = 0;
        group.width = GameConst.SCREEN_WIDTH;
        var arr = SpikesManage.instance.creatSpikes(0, 0, Dir.TOP, GameConst.SCREEN_WIDTH, false, 1);
        DisplayerToCanvas.add.apply(DisplayerToCanvas, [group, null].concat(arr));
        // Scene.trapsArray.push(...arr);
        this.addChild(this.group);
        this.addChild(this.maskRect);
        this.group.addChild(this.aniGroup);
        this.group.addChild(this.arrowIcon);
        this.group.addChild(this.playerIcon);
    };
    Scene.prototype.onEnterFrame = function () {
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
            if (this.playerIcon.localToGlobal().y <= GameConst.SCREEN_HEIGHT * 2 / 5) {
                if (this.playerIcon.velocity[1] >= 0) {
                    GameConst.SLIDE_SPEED = GameConst.BASE_SPEED;
                }
                else {
                    GameConst.SLIDE_SPEED = -this.playerIcon.velocity[1];
                }
            }
            else {
                GameConst.SLIDE_SPEED = GameConst.BASE_SPEED;
            }
            this.update();
            if (GAME_MODEL == "endless")
                this.updateEndless();
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
    };
    Scene.prototype.onTouchBegin = function (event) {
        this.touchBeginX = event.stageX;
        this.touchBeginY = event.stageY;
        if (GAME_MODEL == "coin")
            this.arrowIcon.visible = false;
        //子弹时间
    };
    Scene.prototype.onTouchMove = function (e) {
        if (this.jumpCount >= GameConst.JUMP_TIME) {
            return;
        }
        if (GAME_MODEL != "coin")
            this.arrowIcon.visible = true;
        if (this.jumpCount == 1 || this.jumpCount == 2) {
            this.bulletTimeIcon.visible = true;
            Scene.factor = 0.2;
        }
        egret.Tween.get(this.bulletTimeIcon, { loop: true }).to({ scaleX: 0.5 }, 80)
            .to({ scaleY: 0.8 }, 100);
        var playerpoint = this.playerIcon.localToGlobal();
        var _diffx = e.stageX - this.touchBeginX;
        var _diffy = e.stageY - this.touchBeginY;
        var angle = Math.atan2(_diffy, _diffx);
        var hy = Math.sqrt(Math.pow(_diffy, 2) + Math.pow(_diffx, 2));
        var cos = _diffy / hy;
        var dian = Math.acos(cos);
        this.angle = 180 / (Math.PI / dian);
        if (_diffx < 0) {
            this.angle = -this.angle;
        }
        else if ((_diffy == 0) && (_diffx < 0)) {
            this.angle = 180;
        }
        this.arrowIcon.rotation = 180 - this.angle;
        var dis = Math.sqrt(_diffx * _diffx + _diffy * _diffy);
        if (dis > 200)
            dis = 200;
        this.arrowIcon.scaleY = dis * 0.005;
        this.clearShape();
        if (GAME_MODEL == "coin") {
            this.drawLines(angle, dis);
        }
    };
    ;
    Scene.prototype.drawLines = function (angle, dis) {
        var vx = dis * Math.cos(angle) * 0.15 * 0.5;
        var vy = dis * Math.sin(angle) * 0.2 * 0.5;
        var t = 0;
        var s = 5;
        var v;
        var tempx = this.playerIcon.x + this.playerIcon.width / 2;
        var tempy = this.playerIcon.y + this.playerIcon.height / 2;
        var y1global = 0;
        var y2global = 0;
        while (tempx >= -300 && tempx <= 1100 && y2global < 1334) {
            var x1 = this.playerIcon.x + vx * t + this.playerIcon.width / 2;
            var y1 = this.playerIcon.y + vy * t + 0.5 * GameConst.ACC_SPEED * t * t + this.playerIcon.height / 2;
            y1global = this.playerIcon.localToGlobal().y + 0.5 * GameConst.ACC_SPEED * t * t + this.playerIcon.height / 2;
            v = Math.sqrt((vx * vx) + (vy + GameConst.ACC_SPEED * t) * (vy + GameConst.ACC_SPEED * t));
            if (v == 0) {
                t = t + Math.sqrt(2 * s / GameConst.ACC_SPEED);
            }
            else {
                t = t + s / v;
            }
            var x2 = this.playerIcon.x + vx * t + this.playerIcon.width / 2;
            var y2 = this.playerIcon.y + vy * t + 0.5 * GameConst.ACC_SPEED * t * t + this.playerIcon.height / 2;
            y2global = this.playerIcon.localToGlobal().y + 0.5 * GameConst.ACC_SPEED * t * t + this.playerIcon.height / 2;
            tempx = x2;
            tempy = y2;
            this.line.graphics.lineStyle(2, 0x00ff00);
            this.line.graphics.moveTo(x1, y1);
            this.line.graphics.lineTo(x2, y2);
            this.line.graphics.endFill();
            v = Math.sqrt((vx * vx) + (vy + GameConst.ACC_SPEED * t) * (vy + GameConst.ACC_SPEED * t));
            if (v == 0) {
                t = t + Math.sqrt(2 * s / GameConst.ACC_SPEED);
            }
            else {
                t = t + s / v;
            }
            tempx += vx * t;
            tempy += vy * t + 0.5 * GameConst.ACC_SPEED * t * t;
            y2global += vy * t + 0.5 * GameConst.ACC_SPEED * t * t;
        }
        if (this.line.height < 3000)
            this.group.addChild(this.line);
    };
    Scene.prototype.clearShape = function () {
        this.line.graphics.clear();
    };
    Scene.prototype.onTouchEnd = function (e) {
        var _diffx = e.stageX - this.touchBeginX;
        var _diffy = e.stageY - this.touchBeginY;
        var dis = Math.sqrt(_diffx * _diffx + _diffy * _diffy);
        if (dis <= 20)
            return;
        this.clearShape();
        if (this.jumpCount >= GameConst.JUMP_TIME) {
            return;
        }
        if (!this._isStart)
            this._isStart = true;
        ObserverManager.sendNotification(GameEvent.START);
        //如果没有滑动，则不执行
        egret.Tween.removeTweens(this.bulletTimeIcon);
        this.arrowIcon.scaleY = 0;
        var touchPoint = new egret.Point(e.stageX, e.stageY);
        Scene.factor = 1;
        this.bulletTimeIcon.visible = false;
        var jumpDisX = touchPoint.x - this.touchBeginX;
        this.jumani = false;
        egret.Tween.get(this.playerIcon.role).to({ rotation: 360 }, 200).to({ rotation: 720 }, 200)
            .call(function () {
            this.playerIcon.role.source = PlayerAction.JUMP;
        }, this);
        //获得两点之间距离
        if (dis > 200)
            dis = 200;
        var angle = Math.atan2(_diffy, _diffx);
        var vx = dis * Math.cos(angle) * 0.15 * 0.5;
        var vy = dis * Math.sin(angle) * 0.2 * 0.5;
        this.playerIcon.velocity = [vx, vy];
        this.playerIcon.roleAy = GameConst.ACC_SPEED;
        this.dirHandle(jumpDisX);
    };
    Scene.prototype.dirHandle = function (jumpDisX) {
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
        this.jumpCount++;
        this.playerIcon.roleAy = 0.2;
        this.playerIcon.role.scaleX = jumpDisX > 0 ? 1 : -1;
        this.playerIcon.role.source = PlayerAction.SQUAT;
    };
    //墙边翻跟头
    Scene.prototype.sault = function () {
        var _this = this;
        // for (let i = 0; i < Scene.blockArray.length; i++) {
        //     let block = Scene.blockArray[i];
        // if (GameUtil.isHit(this.playerIcon, block)) {
        egret.Tween.get(this.playerIcon.role).to({ rotation: 360 }, 200).to({ rotation: 720 }, 200).call(function () {
            for (var i = 0; i < Scene.blockArray.length; i++) {
                var block = Scene.blockArray[i];
                if (GameUtil.isHit(_this.playerIcon, block) || _this.playerIcon.x <= 65 || _this.playerIcon.x >= 630 || _this.playerIcon.y <= 75) {
                    _this.playerIcon.roleAy = 0;
                    _this.playerIcon.velocity = [0, 0];
                    return;
                }
                _this.playerIcon.roleAy = 0.2;
            }
        });
        // break;
        // }
        // }
    };
    Scene.prototype.updateScore = function () {
        if (this.playerIcon.y < this.maxh) {
            this.score += Math.floor(this.maxh - this.playerIcon.y + this.killScore);
            this.maxh = this.playerIcon.y;
        }
        this.killScore = 0;
        this.scoreLable.text = this.score + "";
    };
    //碰墙着陆特效
    Scene.prototype.playLandEffect = function () {
        this.landEffect.x = 0;
        this.landEffect.y = 0;
        this.landEffect.visible = true;
        this.landEffect.animation.play("landEffect", 1);
        this.aniGroup.addChild(this.landEffect);
    };
    Scene.prototype.standLeft = function (e) {
        if (this.playerIcon.x <= 75)
            return;
        if (!this.jumani)
            this.playLandEffect();
        this.playerIcon.roleAy = 0;
        this.jumani = true;
        this.playerIcon.role.rotation = 0;
        if (this.playerIcon.role.source != PlayerAction.HAND_WALL) {
            egret.Tween.removeTweens(this.playerIcon.role);
            this.goBackTicket(this.playerIcon.velocity[0], this.playerIcon.velocity[1]);
            this.playerIcon.velocity = [0, 0];
            this.playerIcon.role.source = PlayerAction.HAND_WALL;
        }
        ;
        this.playerIcon.role.scaleX = -1;
        this.playerIcon.rotation = 0;
        this.jumpCount = 0;
    };
    Scene.prototype.standRight = function (e) {
        if (this.playerIcon.x >= 620)
            return;
        if (!this.jumani)
            this.playLandEffect();
        this.jumani = true;
        this.playerIcon.roleAy = 0;
        this.playerIcon.role.rotation = 0;
        if (this.playerIcon.role.source != PlayerAction.HAND_WALL) {
            egret.Tween.removeTweens(this.playerIcon.role);
            this.goBackTicket(this.playerIcon.velocity[0], this.playerIcon.velocity[1]);
            this.playerIcon.velocity = [0, 0];
            this.playerIcon.role.source = PlayerAction.HAND_WALL;
        }
        ;
        this.playerIcon.role.scaleX = 1;
        this.playerIcon.rotation = 0;
        this.jumpCount = 0;
    };
    Scene.prototype.standTop = function () {
        if (!this.jumani)
            this.playLandEffect();
        this.jumani = true;
        this.playerIcon.roleAy = 0;
        this.playerIcon.role.rotation = 0;
        if (this.playerIcon.role.source != PlayerAction.STAND) {
            egret.Tween.removeTweens(this.playerIcon.role);
            this.goBackTicket(this.playerIcon.velocity[0], this.playerIcon.velocity[1]);
            this.playerIcon.velocity = [0, 0];
            this.playerIcon.role.source = PlayerAction.STAND;
        }
        ;
        this.playerIcon.velocity[1] = 0;
        this.playerIcon.rotation = 0;
        this.jumpCount = 0;
    };
    Scene.prototype.standBottom = function () {
        if (!this.jumani)
            this.playLandEffect();
        this.jumani = true;
        this.playerIcon.roleAy = 0;
        this.playerIcon.role.rotation = 0;
        if (this.playerIcon.role.source != PlayerAction.HANG_CEILING) {
            egret.Tween.removeTweens(this.playerIcon.role);
            this.goBackTicket(this.playerIcon.velocity[0], this.playerIcon.velocity[1]);
            this.playerIcon.velocity = [0, 0];
            this.playerIcon.role.source = PlayerAction.HANG_CEILING;
        }
        ;
        this.jumpCount = 0;
    };
    Scene.prototype.arrive = function () {
        var restart = new RestartGameUI("pass");
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
    };
    Scene.prototype.restart = function () {
        var restart = new RestartGameUI("failed");
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
    };
    Scene.prototype.stopBulletTime = function () {
        Scene.factor = 1;
        this.bulletTimeIcon.visible = this.arrowIcon.visible = false;
    };
    Scene.prototype.goBackTicket = function (vx, vy) {
        this.playerIcon.x -= vx;
        this.playerIcon.y -= vy;
    };
    Scene.prototype.update = function () {
        this.trapHitTest();
        this.roteBlockHitTest();
        this.enemyHitTest();
        for (var i = 0; i < Scene.blockArray.length; i++) {
            var block = Scene.blockArray[i];
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
        for (var i = 0; i < GoldBox.goldBoxArray.length; i++) {
            var box = GoldBox.goldBoxArray[i];
            if (GameUtil.enemyHittest(this.playerIcon, box)) {
                if (!this.isAttackbox) {
                    this.playerIcon.playAttackAni();
                    ObserverManager.instance.dispatchEventWith(GameEvent.ATTCK_BOX);
                    this.isAttackbox = true;
                }
            }
            else {
                this.isAttackbox = false;
            }
        }
        for (var i = 0; i < Soldiers.bulletArray.length; i++) {
            var bullet = Soldiers.bulletArray[i];
            if (GameUtil.hitTest(this.playerIcon, bullet)) {
                if (bullet && bullet.parent) {
                    bullet.parent.removeChild(bullet);
                }
                Bullet.reclaim(bullet);
                Soldiers.bulletArray.splice(i, 1);
                ObserverManager.instance.dispatchEventWith(GameEvent.ROLE_DEAD);
                this.goBackTicket(this.playerIcon.velocity[0], this.playerIcon.velocity[1]);
                this.playerIcon.velocity = [0, 0];
                this.deadParticle.visible = true;
                this.deadParticle.start();
                this.deadParticle.emissionTime = 500;
                this.playerIcon.visible = false;
                egret.setTimeout(function () {
                    this.deadParticle.visible = false;
                }, this, 2000);
            }
        }
    };
    /*
    * 陷阱障碍物碰撞检测
    */
    Scene.prototype.trapHitTest = function () {
        for (var i = 0; i < Scene.trapsArray.length; i++) {
            var trap = Scene.trapsArray[i];
            if (trap && GameUtil.hitTest(this.playerIcon, trap, this)) {
                if (!this.start) {
                    ObserverManager.instance.dispatchEventWith(GameEvent.ROLE_DEAD);
                    this.goBackTicket(this.playerIcon.velocity[0], this.playerIcon.velocity[1]);
                    this.playerIcon.velocity = [0, 0];
                    this.deadParticle.visible = true;
                    this.deadParticle.start();
                    this.deadParticle.emissionTime = 500;
                    this.playerIcon.visible = false;
                    egret.setTimeout(function () {
                        this.deadParticle.visible = false;
                    }, this, 2000);
                }
            }
        }
    };
    /*
    * 旋转障碍物碰撞检测
    */
    Scene.prototype.roteBlockHitTest = function () {
        for (var i = 0; i < Scene.roteBlockArray.length; i++) {
            var block = Scene.roteBlockArray[i];
            if (block && GameUtil.roteRectHitTest(this.playerIcon, block, this)) {
                if (block.isRote) {
                    ObserverManager.instance.dispatchEventWith(GameEvent.ROLE_DEAD);
                    this.goBackTicket(this.playerIcon.velocity[0], this.playerIcon.velocity[1]);
                    this.playerIcon.velocity = [0, 0];
                    this.deadParticle.visible = true;
                    this.deadParticle.start();
                    this.deadParticle.emissionTime = 500;
                    this.playerIcon.visible = false;
                    egret.setTimeout(function () {
                        this.deadParticle.visible = false;
                    }, this, 2000);
                }
                else {
                    GameUtil.blockhitTest(this.playerIcon, block, this);
                }
            }
        }
    };
    Scene.prototype.coinHitTest = function () {
        for (var i = 0; i < Scene.coinArray.length; i++) {
            var coin = Scene.coinArray[i];
            if (GameUtil.enemyHittest(this.playerIcon, coin)) {
                // Coin.reclain(coin);
                // this.group.removeChild(coin);
                // Scene.coinArray.splice(i, 1);
                coin.visible = false;
            }
        }
    };
    /*
    * npc被攻击检测
    */
    Scene.prototype.enemyHitTest = function () {
        var _loop_1 = function (i) {
            var enemy = Soldiers.enemyArray[i];
            if (GameUtil.enemyHittest(this_1.playerIcon, enemy)) {
                if (enemy.visible) {
                    enemy.enemyDead(enemy);
                    Soldiers.enemyArray.splice(i, 1);
                    Soldiers.reclaim(enemy);
                    this_1.playerIcon.playAttackAni();
                    this_1.killScore = 80;
                    // this.scoreLable.text = Math.floor(this.score) + "";
                }
                egret.setTimeout(function () {
                    enemy.visible = false;
                }, this_1, 10);
                // Soldiers.enemyArray.splice(i, 1);
            }
        };
        var this_1 = this;
        for (var i = 0; i < Soldiers.enemyArray.length; i++) {
            _loop_1(i);
        }
    };
    /*
    * NPC攻击检测
    */
    Scene.prototype.enemyAi = function () {
        for (var i = 0; i < Soldiers.enemyArray.length; i++) {
            var enemy = Soldiers.enemyArray[i];
            var enemyPoint = enemy.localToGlobal();
            var playerPoint = this.playerIcon.localToGlobal();
            var _disx = enemyPoint.x - playerPoint.x;
            var _disy = enemyPoint.y - playerPoint.y;
            var dis = Math.sqrt(Math.pow(_disx, 2) + Math.pow(_disy, 2));
            var _dir = "";
            if (_disx > 0) {
                _dir = "left";
            }
            if (_disx < 0) {
                _dir = "right";
            }
            if (enemy.enemy.source == "attacking_enemy_0_png" && dis < 80 && enemyPoint.y >= playerPoint.y) {
                ObserverManager.instance.dispatchEventWith(GameEvent.ARRIVE_SWORD_ENEMY, false, { rangeType: "sowrd", scale: enemy.currentState, dir: _dir });
                continue;
            }
            ;
            if (enemy.enemy.source == "ranged_enemy_idle_png") {
                var data = { dir: _dir, scale: enemy.currentState, playerPoint: playerPoint, enemyPoint: enemyPoint };
                enemy.sniperAttack(data, this.group);
                continue;
            }
        }
    };
    /*
    * 角色被砍后回弹
    */
    Scene.prototype.playerBounce = function (e) {
        var data = e.data;
        if (this.playerIcon.velocity[0]) {
            this.playerIcon.velocity[0] = -this.playerIcon.velocity[0];
        }
        else {
            if (data.dir == "left") {
                this.playerIcon.velocity[0] = -2;
                this.playerIcon.roleAy = 0.2;
                this.playerIcon.role.source = PlayerAction.SQUAT;
            }
            else if (data.dir == "right") {
                this.playerIcon.velocity[0] = 2;
                this.playerIcon.roleAy = 0.2;
                this.playerIcon.role.source = PlayerAction.SQUAT;
            }
        }
    };
    Scene.prototype.createEndlessGroup = function () {
        for (var i = 0; i < this.listLength; i++) {
            var item = new EndlessItemGroup("ninja_endless0" + (i + 1) + "_json");
            item.addConfig();
            item.y = 1334 * (2 - i);
            this.group.addChild(item);
            this.list.push(item);
        }
    };
    Scene.prototype.updateEndless = function () {
        for (var i = 0; i < this.list.length; i++) {
            var item = this.list[i];
            var itemy = item.localToGlobal().y;
            if (itemy > 1334) {
                var last = this.findFirst();
                item.y = last.y - 1334;
                EndlessItemGroup.reclaim(item);
                item.addConfig("ninja_endless0" + (i + 1) + "_json");
                return;
            }
        }
    };
    Scene.prototype.findFirst = function () {
        var returnIcon = this.list[0];
        for (var i = 0; i < this.list.length; i++) {
            var icon = this.list[i];
            if (icon.y < returnIcon.y) {
                returnIcon = icon;
            }
        }
        return returnIcon;
    };
    Scene.prototype.creatSnowflake = function () {
        var _this = this;
        var shp = new egret.Shape();
        shp.graphics.beginFill(0xFFFFFF, 1);
        var width = 10 + Math.random() * 10;
        var y = 400 + Math.random() * 1200;
        shp.graphics.drawRect(0, 0, width, width);
        shp.graphics.endFill();
        shp.x = 750;
        shp.y = GameConst.totalLen - y;
        this.group.addChild(shp);
        var rotation = -45 + Math.random() * 90;
        shp.rotation = rotation;
        var tween = egret.Tween.get(shp);
        var endY = 200 + Math.random() * 300 + shp.y;
        tween.to({ x: 0, y: endY }, 3000 + Math.random() * 2000).call(function () {
            _this.group.removeChild(shp);
            shp = null;
        });
        var tween2 = egret.Tween.get(shp);
        tween2.to({ alpha: 0 }, 4500 + Math.random() * 500);
    };
    Scene.prototype.creatTimer = function () {
        var delay = 500 + Math.random() * 500;
        var timer = new egret.Timer(delay, 1);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.creatTimer, this);
        timer.start();
    };
    Scene.prototype.timerFunc = function () {
        // this.creatSnowflake();
    };
    Scene.prototype.enter = function () {
        // SoundManager.instance.playMusic(SoundConst.fightMusic_mp3);
    };
    Scene.prototype.exit = function () {
    };
    Scene.prototype.addHitTest = function () {
        // if(GameUtil.hitTest())
    };
    Scene.blockArray = [];
    Scene.roteBlockArray = [];
    Scene.coinArray = [];
    Scene.trapsArray = [];
    Scene.factor = 1;
    return Scene;
}(eui.Component));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=scene.js.map