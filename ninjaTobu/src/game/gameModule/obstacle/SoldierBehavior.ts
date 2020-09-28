// TypeScript file
class Soldiers extends eui.Component {
    public enemy: eui.Image;
    public pzRect: eui.Rect;
    public lightImg: eui.Image;
    public exclamImg: eui.Image;
    public sniperbody: eui.Image;
    public hp: PlayerHp;
    public enemyhp: number;
    public headGroup: eui.Group;
    public sniperHead: eui.Image;
    public lightGroup: eui.Group;
    public lightImg2: eui.Image;

    public sowrdttckTimes: number = 2;

    private deadParticle: particle.GravityParticleSystem;
    private attackAni: dragonBones.EgretArmatureDisplay;
    public static enemyArray: Array<Soldiers> = [];
    public static bulletArray: Array<Bullet> = [];
    public static cacheDict: Object = {};

    public textrue: string;
    public poisonNum: number = 0;
    public poisonText: eui.Label;
    public distance:number;

    public constructor(source: string) {
        super();
        this.skinName = "SoldierSkin";
        this.textrue = source;
        this.enemy.source = this.textrue;
        if (this.textrue == "ranged_enemy_idle_png") {
            this.enemyhp = GameConst.SNIPER_HP;
            this.hp.updateBar(this.enemyhp, GameConst.SNIPER_HP);
        } else if (this.textrue = "attacking_enemy_0_png") {
            this.enemyhp = GameConst.SWORD_HP;
            this.hp.updateBar(this.enemyhp, GameConst.SWORD_HP);
        }
    }

    public initHp() {
        if (this.textrue == "ranged_enemy_idle_png") {
            this.enemyhp = GameConst.SNIPER_HP;
            this.hp.updateBar(this.enemyhp, GameConst.SNIPER_HP);
        } else if (this.textrue = "attacking_enemy_0_png") {
            this.enemyhp = GameConst.SWORD_HP;
            this.hp.updateBar(this.enemyhp, GameConst.SWORD_HP);
        }
    }

    public createChildren() {
        super.createChildren();
        this.init();
        ObserverManager.instance.addEventListener(GameEvent.ARRIVE_SWORD_ENEMY, this.enemyAttack, this);
        this.poisonInterval();
    }

    public canAttack: boolean = true; //能否被击杀，正面朝向会被弹开，enemy不会死亡
    public enemyAttack(e: egret.Event) {
        let data = e.data;
        if (data.rangeType == "sniper" && this.enemy.source == "ranged_enemy_idle_png") {
            //进入枪兵瞄准范围
            // this.sniperAttack(data);
        }
        if (data.rangeType == "sowrd" && this.enemy.source == "attacking_enemy_0_png") {
            //刀兵砍人范围
            let _dir = data.dir;
            let scale = data.scale;
            if (this.canAttack && this.sowrdttckTimes > 0) {
                if (scale == "scale1" && _dir == "right") {
                    if (GameConst.INVICIBLE == "INVICIBLE") return;
                    this.canAttack = false;
                    this.enemy.visible = false;
                    this.attackAni.visible = true;
                    this.attackAni.x = 40;
                    this.attackAni.y = 45;
                    this.attackAni.visible = true;
                    this.attackAni.animation.play("enemy_cut", 1);
                    this.attackAni.scaleX = 1;
                    this.addChild(this.attackAni);
                    ObserverManager.instance.dispatchEventWith(GameEvent.ROLE_ATTCKED, false, { dir: _dir });
                    // }, this, 200)
                } else if (scale == "scale2" && _dir == "left") {
                    if (GameConst.INVICIBLE == "INVICIBLE") return;
                    this.canAttack = false;
                    this.enemy.visible = false;
                    this.attackAni.visible = true;
                    this.attackAni.x = 40;
                    this.attackAni.y = 45;
                    this.attackAni.visible = true;
                    this.attackAni.animation.play("enemy_cut", 1);
                    this.attackAni.scaleX = -1;
                    this.addChild(this.attackAni);
                    ObserverManager.instance.dispatchEventWith(GameEvent.ROLE_ATTCKED, false, { dir: _dir });
                    // }, this, 200)
                }

            }
        }
    }

    public enemyDead(obj) {
        if (this.canAttack) {
            this.canAttack = false;
            this.deadParticle = new particle.GravityParticleSystem(RES.getRes("deadParticle_png"), RES.getRes("deadParticle_json"));
            this.deadParticle.start();
            this.deadParticle.x = this.deadParticle.y = -450;
            this.deadParticle.emissionTime = 500;
            this.currentState = "scale1";
            this.validateNow();
            egret.clearInterval(this.changeInterval);
            this.addChild(this.deadParticle);
            if (obj && obj.parent) {
                obj[`parent`].removeChild(obj);
            }
            this.showDamage(this.enemyhp);
            this.sniperbody.visible = this.sniperHead.visible = false;
            egret.Tween.removeTweens(this.lightImg2);
            this.lightImg2.scaleY = 1;
        }
    }
    private shutimeout: any;
    private hasShut: boolean = false;
    private angle: number;
    /*
    * 火枪手发现敌人
    */
    sniperAttack(data, group) {
        if (data.enemyPoint.y >= data.playerPoint.y) {
            if (this.sniperbody.visible == false && this.enemy.visible == false) return;
            let _dir = data.dir;
            let scale = data.scale;
            let playerPoint = data.playerPoint;
            let thisPoint = data.enemyPoint;
            this.lightImg2.visible = true;
            if (_dir == "left") {
                this.currentState = "scale2";
                this.validateNow();
            } if (_dir == "right") {
                this.currentState = "scale1";
                this.validateNow();
            }
            this.exclamImg.visible = true;
            egret.clearInterval(this.changeInterval);
            if (!this.hasShut) this.shut();

            /*
             * 准备开枪
             */
            this.angle = CommonUtil.getAngle(playerPoint.x, playerPoint.y, thisPoint.x, thisPoint.y) % 360;
            if (this.currentState == "scale2" && playerPoint.y <= thisPoint.y) {
                this.angle = this.angle - 90;
                this.headGroup.rotation = this.angle;
                this.lightGroup.rotation = this.angle;
                this.angle = this.angle + 180;
                if (!this.hasShut) {
                    egret.Tween.get(this.lightImg2).to({ scaleY: 0 }, 2000).call(() => {
                        this.fire(this.angle, group);
                    });
                }
            } else if (this.currentState == "scale1" && playerPoint.y <= thisPoint.y) {
                this.angle = this.angle - 270;
                this.headGroup.rotation = this.angle;
                this.lightGroup.rotation = this.angle;
                if (!this.hasShut) {
                    egret.Tween.get(this.lightImg2).to({ scaleY: 0 }, 2000).call(() => {
                        this.fire(this.angle, group);
                    });
                }
            }
            this.hasShut = true;

        }
        else if (data.enemyPoint.y < data.playerPoint.y) this.pause();
    }

    shut() {
        if (this.sniperbody.visible) return;
        this.enemy.visible = this.exclamImg.visible = false;
        this.sniperbody.visible = this.sniperHead.visible = this.lightImg2.visible = true;
    }
    /*
    * 角色移动到狙击手下
    */
    pause() {
        egret.Tween.removeTweens(this.lightImg2);
        this.exclamImg.visible = false;
        this.lightImg2.visible = false;
        this.lightImg2.scaleY = 1;
    }

    /*
    * 开枪
    */
    fire(angle, group) {
        if (this.sniperbody.visible == false) return;
        this.lightImg2.scaleY = 1;
        let bullet = Bullet.produce("sniper_bullet_png");;
        group.addChildAt(bullet, group.numChildren - 1);
        bullet.bullet.rotation = this.angle;
        bullet.x = this.x; bullet.y = this.y + this.width / 2;
        let rot = Math.PI * (this.angle / 180);
        let vx = 40 * Math.cos(rot);
        let vy = 40 * Math.sin(rot);
        bullet.shut(vx, vy);
        Soldiers.bulletArray.push(bullet);
        this.hasShut = false;
    }


    /**生产*/
    public static produce(source: string): Soldiers {
        let textureName: string = source;
        if (Soldiers.cacheDict[textureName] == null)
            Soldiers.cacheDict[textureName] = [];
        var dict: Soldiers[] = Soldiers.cacheDict[textureName];
        var blockObject: Soldiers;
        if (dict.length > 0) {
            blockObject = dict.pop();
        } else {
            blockObject = new Soldiers(textureName);
        }
        return blockObject;
    }
    /**回收*/
    public static reclaim(blockObject: Soldiers): void {
        var textureName: string = blockObject.textrue;
        blockObject.poisonText.visible = false;
        blockObject.poisonNum = 0;
        if (Soldiers.cacheDict[textureName] == null)
        { Soldiers.cacheDict[textureName] = []; }
        var dict: Soldiers[] = Soldiers.cacheDict[textureName];
        if (dict.indexOf(blockObject) == -1) {
            dict.push(blockObject);
        }
    }
    private changeInterval: any;
    init() {
        this.attackAni = CommonUtil.createAnimation("enemy_cut", function () {
            this.enemy.visible = true;
            this.attackAni.visible = false;
            this.canAttack = true;
            // this.sowrdttckTimes -= 1;
            if (this.sowrdttckTimes == 0) {
                this.enemy.source = "ashigaru_yield_png";
                egret.clearInterval(this.changeInterval);
                this.lightImg.visible = false;
                this.enemy.scaleX = this.attackAni.scaleX;
            }
        }, this);
        this.enemy.source = this.textrue;
        this.enemy.visible = true;
        this.canAttack = true;
        this.sowrdttckTimes = 2;
        this.enemy.anchorOffsetX = this.enemy.width / 2;
        this.enemy.anchorOffsetY = this.enemy.height / 2;
        this.lightImg.anchorOffsetX = this.lightImg.width / 2;
        this.lightImg.anchorOffsetY = this.lightImg.height / 2;
        this.lightImg2.scaleY = 1;
        egret.clearInterval(this.changeInterval);
        this.hasShut = false;
        this.sniperbody.visible = this.sniperHead.visible = this.lightImg2.visible = this.exclamImg.visible = false;
        this.swordmanMove();
    }

    /*
    * 士兵的转向
    */
    public swordmanMove() {
        if (this.textrue == "attacking_enemy_0_png") {
            this.lightImg.visible = true;
            let i = 1;
            this.changeInterval = egret.setInterval(() => {
                i % 2 > 0 ? this.setState(2) : this.setState(1);
                i++;
            }, this, 5000);
        } else {
            this.lightImg.visible = false;
            if (this.textrue == "ranged_enemy_idle_png") {
                let i = 1;
                this.changeInterval = egret.setInterval(() => {
                    i % 2 > 0 ? this.setState(2) : this.setState(1);
                    i++;
                }, this, 5000);
            } else {
                this.changeInterval = egret.setInterval(() => {
                    this.enemy.scaleX = -this.enemy.scaleX;
                }, this, 5000);
            }

        }

    }

    setState(a) {
        this.currentState = `scale${a}`;
        this.validateNow();
    }

    enemyHurt() {
        if (this.textrue == "attacking_enemy_0_png") {
            this.enemyhp -= GameConst.WEAPON_POWER + this.poisonNum * 1;
            this.hp.updateBar(this.enemyhp, GameConst.SWORD_HP);
        } else if (this.textrue == "ranged_enemy_idle_png") {
            this.enemyhp -= GameConst.WEAPON_POWER + this.poisonNum * 1;
            this.hp.updateBar(this.enemyhp, GameConst.SNIPER_HP);
        }
        if (GameConst.OWN_TALENT.indexOf(2) != -1) {
            this.poisonNum++;
            if (this.poisonNum >= 5) this.poisonNum = 5;
            this.poisonText.visible = true;
        }
        this.showDamage(GameConst.WEAPON_POWER + this.poisonNum * 1);
    }

    poisonInterval() {
        egret.setInterval(() => {
            if (this.poisonNum >= 1) this.poisonNum--;
            if(this.poisonNum<=0) this.poisonText.visible = false;

        }, this, 5000)
    }

    public showDamage(hp?: number) {
        let damage;
        if (hp) {
            damage = new DamageItem(hp);
        } else {
            damage = new DamageItem();
        }
        damage.horizontalCenter = 0;
        damage.y = -22;
        egret.Tween.get(damage).to({ y: -66, alpha: 0 }, 300, egret.Ease.sineIn).call(() => {
            GameUtil.removeSelf(damage);
        });
        this.addChild(damage);
    }


}

class Bullet extends eui.Component {
    public velocity: Array<number> = [];
    public texture: string;
    public bullet: eui.Image;
    public static cacheDict: Object = {};
    public scale = 1;
    public vx;
    public vy;

    public constructor(source) {
        super();
        this.skinName = "BulletSkin";
        this.texture = source;
        this.bullet.source = this.texture;
    }

    public createChildren() {
        super.createChildren();
        this.bullet.anchorOffsetX = this.bullet.width / 2;
        this.bullet.anchorOffsetY = this.bullet.height / 2;
        // this.addEventListener(egret.Event.ENTER_FRAME,this.shut,this);
    }

    shut(vx, vy) {
        egret.Ticker.getInstance().register(() => {
            this.x += vx * Scene.factor;
            this.y += vy * Scene.factor;
        }, this);
    }


    /**生产*/
    public static produce(source: string): Bullet {
        let textureName: string = source;
        if (Bullet.cacheDict[textureName] == null)
            Bullet.cacheDict[textureName] = [];
        var dict: Bullet[] = Bullet.cacheDict[textureName];
        var blockObject: Bullet;
        if (dict.length > 0) {
            blockObject = dict.pop();
        } else {
            blockObject = new Bullet(source);
        }
        return blockObject;
    }
    /**回收*/
    public static reclaim(blockObject: Bullet): void {
        var textureName: string = blockObject.texture;
        blockObject.scaleX = blockObject.scaleY = 1;
        if (Bullet.cacheDict[textureName] == null)
            Bullet.cacheDict[textureName] = [];
        var dict: Bullet[] = Bullet.cacheDict[textureName];
        if (dict.indexOf(blockObject) == -1) {
            dict.push(blockObject);
        }
    }
}