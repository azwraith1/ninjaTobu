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
var Soldiers = (function (_super) {
    __extends(Soldiers, _super);
    function Soldiers(source) {
        var _this = _super.call(this) || this;
        _this.sowrdttckTimes = 2;
        _this.poisonNum = 0;
        _this.canAttack = true; //能否被击杀，正面朝向会被弹开，enemy不会死亡
        _this.hasShut = false;
        _this.skinName = "SoldierSkin";
        _this.textrue = source;
        _this.enemy.source = _this.textrue;
        if (_this.textrue == "ranged_enemy_idle_png") {
            _this.enemyhp = GameConst.SNIPER_HP;
            _this.hp.updateBar(_this.enemyhp, GameConst.SNIPER_HP);
        }
        else if (_this.textrue = "attacking_enemy_0_png") {
            _this.enemyhp = GameConst.SWORD_HP;
            _this.hp.updateBar(_this.enemyhp, GameConst.SWORD_HP);
        }
        return _this;
    }
    Soldiers.prototype.initHp = function () {
        if (this.textrue == "ranged_enemy_idle_png") {
            this.enemyhp = GameConst.SNIPER_HP;
            this.hp.updateBar(this.enemyhp, GameConst.SNIPER_HP);
        }
        else if (this.textrue = "attacking_enemy_0_png") {
            this.enemyhp = GameConst.SWORD_HP;
            this.hp.updateBar(this.enemyhp, GameConst.SWORD_HP);
        }
    };
    Soldiers.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.init();
        ObserverManager.instance.addEventListener(GameEvent.ARRIVE_SWORD_ENEMY, this.enemyAttack, this);
        this.poisonInterval();
    };
    Soldiers.prototype.enemyAttack = function (e) {
        var data = e.data;
        if (data.rangeType == "sniper" && this.enemy.source == "ranged_enemy_idle_png") {
            //进入枪兵瞄准范围
            // this.sniperAttack(data);
        }
        if (data.rangeType == "sowrd" && this.enemy.source == "attacking_enemy_0_png") {
            //刀兵砍人范围
            var _dir = data.dir;
            var scale = data.scale;
            if (this.canAttack && this.sowrdttckTimes > 0) {
                if (scale == "scale1" && _dir == "right") {
                    if (GameConst.INVICIBLE == "INVICIBLE")
                        return;
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
                }
                else if (scale == "scale2" && _dir == "left") {
                    if (GameConst.INVICIBLE == "INVICIBLE")
                        return;
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
    };
    Soldiers.prototype.enemyDead = function (obj) {
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
                obj["parent"].removeChild(obj);
            }
            this.showDamage(this.enemyhp);
            this.sniperbody.visible = this.sniperHead.visible = false;
            egret.Tween.removeTweens(this.lightImg2);
            this.lightImg2.scaleY = 1;
        }
    };
    /*
    * 火枪手发现敌人
    */
    Soldiers.prototype.sniperAttack = function (data, group) {
        var _this = this;
        if (data.enemyPoint.y >= data.playerPoint.y) {
            if (this.sniperbody.visible == false && this.enemy.visible == false)
                return;
            var _dir = data.dir;
            var scale = data.scale;
            var playerPoint = data.playerPoint;
            var thisPoint = data.enemyPoint;
            this.lightImg2.visible = true;
            if (_dir == "left") {
                this.currentState = "scale2";
                this.validateNow();
            }
            if (_dir == "right") {
                this.currentState = "scale1";
                this.validateNow();
            }
            this.exclamImg.visible = true;
            egret.clearInterval(this.changeInterval);
            if (!this.hasShut)
                this.shut();
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
                    egret.Tween.get(this.lightImg2).to({ scaleY: 0 }, 2000).call(function () {
                        _this.fire(_this.angle, group);
                    });
                }
            }
            else if (this.currentState == "scale1" && playerPoint.y <= thisPoint.y) {
                this.angle = this.angle - 270;
                this.headGroup.rotation = this.angle;
                this.lightGroup.rotation = this.angle;
                if (!this.hasShut) {
                    egret.Tween.get(this.lightImg2).to({ scaleY: 0 }, 2000).call(function () {
                        _this.fire(_this.angle, group);
                    });
                }
            }
            this.hasShut = true;
        }
        else if (data.enemyPoint.y < data.playerPoint.y)
            this.pause();
    };
    Soldiers.prototype.shut = function () {
        if (this.sniperbody.visible)
            return;
        this.enemy.visible = this.exclamImg.visible = false;
        this.sniperbody.visible = this.sniperHead.visible = this.lightImg2.visible = true;
    };
    /*
    * 角色移动到狙击手下
    */
    Soldiers.prototype.pause = function () {
        egret.Tween.removeTweens(this.lightImg2);
        this.exclamImg.visible = false;
        this.lightImg2.visible = false;
        this.lightImg2.scaleY = 1;
    };
    /*
    * 开枪
    */
    Soldiers.prototype.fire = function (angle, group) {
        if (this.sniperbody.visible == false)
            return;
        this.lightImg2.scaleY = 1;
        var bullet = Bullet.produce("sniper_bullet_png");
        ;
        group.addChildAt(bullet, group.numChildren - 1);
        bullet.bullet.rotation = this.angle;
        bullet.x = this.x;
        bullet.y = this.y + this.width / 2;
        var rot = Math.PI * (this.angle / 180);
        var vx = 40 * Math.cos(rot);
        var vy = 40 * Math.sin(rot);
        bullet.shut(vx, vy);
        Soldiers.bulletArray.push(bullet);
        this.hasShut = false;
    };
    /**生产*/
    Soldiers.produce = function (source) {
        var textureName = source;
        if (Soldiers.cacheDict[textureName] == null)
            Soldiers.cacheDict[textureName] = [];
        var dict = Soldiers.cacheDict[textureName];
        var blockObject;
        if (dict.length > 0) {
            blockObject = dict.pop();
        }
        else {
            blockObject = new Soldiers(textureName);
        }
        return blockObject;
    };
    /**回收*/
    Soldiers.reclaim = function (blockObject) {
        var textureName = blockObject.textrue;
        blockObject.poisonText.visible = false;
        blockObject.poisonNum = 0;
        if (Soldiers.cacheDict[textureName] == null) {
            Soldiers.cacheDict[textureName] = [];
        }
        var dict = Soldiers.cacheDict[textureName];
        if (dict.indexOf(blockObject) == -1) {
            dict.push(blockObject);
        }
    };
    Soldiers.prototype.init = function () {
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
    };
    /*
    * 士兵的转向
    */
    Soldiers.prototype.swordmanMove = function () {
        var _this = this;
        if (this.textrue == "attacking_enemy_0_png") {
            this.lightImg.visible = true;
            var i_1 = 1;
            this.changeInterval = egret.setInterval(function () {
                i_1 % 2 > 0 ? _this.setState(2) : _this.setState(1);
                i_1++;
            }, this, 5000);
        }
        else {
            this.lightImg.visible = false;
            if (this.textrue == "ranged_enemy_idle_png") {
                var i_2 = 1;
                this.changeInterval = egret.setInterval(function () {
                    i_2 % 2 > 0 ? _this.setState(2) : _this.setState(1);
                    i_2++;
                }, this, 5000);
            }
            else {
                this.changeInterval = egret.setInterval(function () {
                    _this.enemy.scaleX = -_this.enemy.scaleX;
                }, this, 5000);
            }
        }
    };
    Soldiers.prototype.setState = function (a) {
        this.currentState = "scale" + a;
        this.validateNow();
    };
    Soldiers.prototype.enemyHurt = function () {
        if (this.textrue == "attacking_enemy_0_png") {
            this.enemyhp -= GameConst.WEAPON_POWER + this.poisonNum * 1;
            this.hp.updateBar(this.enemyhp, GameConst.SWORD_HP);
        }
        else if (this.textrue == "ranged_enemy_idle_png") {
            this.enemyhp -= GameConst.WEAPON_POWER + this.poisonNum * 1;
            this.hp.updateBar(this.enemyhp, GameConst.SNIPER_HP);
        }
        if (GameConst.OWN_TALENT.indexOf(2) != -1) {
            this.poisonNum++;
            if (this.poisonNum >= 5)
                this.poisonNum = 5;
            this.poisonText.visible = true;
        }
        this.showDamage(GameConst.WEAPON_POWER + this.poisonNum * 1);
    };
    Soldiers.prototype.poisonInterval = function () {
        var _this = this;
        egret.setInterval(function () {
            if (_this.poisonNum >= 1)
                _this.poisonNum--;
            if (_this.poisonNum <= 0)
                _this.poisonText.visible = false;
        }, this, 5000);
    };
    Soldiers.prototype.showDamage = function (hp) {
        var damage;
        if (hp) {
            damage = new DamageItem(hp);
        }
        else {
            damage = new DamageItem();
        }
        damage.horizontalCenter = 0;
        damage.y = -22;
        egret.Tween.get(damage).to({ y: -66, alpha: 0 }, 300, egret.Ease.sineIn).call(function () {
            GameUtil.removeSelf(damage);
        });
        this.addChild(damage);
    };
    Soldiers.enemyArray = [];
    Soldiers.bulletArray = [];
    Soldiers.cacheDict = {};
    return Soldiers;
}(eui.Component));
__reflect(Soldiers.prototype, "Soldiers");
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(source) {
        var _this = _super.call(this) || this;
        _this.velocity = [];
        _this.scale = 1;
        _this.skinName = "BulletSkin";
        _this.texture = source;
        _this.bullet.source = _this.texture;
        return _this;
    }
    Bullet.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.bullet.anchorOffsetX = this.bullet.width / 2;
        this.bullet.anchorOffsetY = this.bullet.height / 2;
        // this.addEventListener(egret.Event.ENTER_FRAME,this.shut,this);
    };
    Bullet.prototype.shut = function (vx, vy) {
        var _this = this;
        egret.Ticker.getInstance().register(function () {
            _this.x += vx * Scene.factor;
            _this.y += vy * Scene.factor;
        }, this);
    };
    /**生产*/
    Bullet.produce = function (source) {
        var textureName = source;
        if (Bullet.cacheDict[textureName] == null)
            Bullet.cacheDict[textureName] = [];
        var dict = Bullet.cacheDict[textureName];
        var blockObject;
        if (dict.length > 0) {
            blockObject = dict.pop();
        }
        else {
            blockObject = new Bullet(source);
        }
        return blockObject;
    };
    /**回收*/
    Bullet.reclaim = function (blockObject) {
        var textureName = blockObject.texture;
        blockObject.scaleX = blockObject.scaleY = 1;
        if (Bullet.cacheDict[textureName] == null)
            Bullet.cacheDict[textureName] = [];
        var dict = Bullet.cacheDict[textureName];
        if (dict.indexOf(blockObject) == -1) {
            dict.push(blockObject);
        }
    };
    Bullet.cacheDict = {};
    return Bullet;
}(eui.Component));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=SoldierBehavior.js.map