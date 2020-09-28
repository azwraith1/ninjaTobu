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
var PlayerIcon = (function (_super) {
    __extends(PlayerIcon, _super);
    function PlayerIcon() {
        var _this = _super.call(this) || this;
        _this.clipNum = GameConst.CLIP_NUM;
        _this.velocity = [0, 0];
        _this.roleAy = GameConst.ACC_SPEED; //忍者y方向的加速度
        _this.state = GameConst.INVICIBLE;
        _this.roleHp = GameConst.INIT_HP;
        _this.skinName = "PlayerIconSkin";
        return _this;
    }
    Object.defineProperty(PlayerIcon, "instance", {
        get: function () {
            if (!PlayerIcon._instance) {
                PlayerIcon._instance = new PlayerIcon();
            }
            return PlayerIcon._instance;
        },
        enumerable: true,
        configurable: true
    });
    PlayerIcon.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.role.anchorOffsetX = this.role.width / 2;
        this.role.anchorOffsetY = this.role.height / 2;
        this.attackani = CommonUtil.createAnimation("cut_light", function () {
            this.attackani.visible = false;
        }, this);
        egret.Ticker.getInstance().register(this.update, this);
        GameConst.CURRENT_BULLET = 0;
    };
    PlayerIcon.prototype.changeSource = function (source) {
        this.role.source = source;
        this.addChild(this.role);
        this.setPosition();
    };
    PlayerIcon.prototype.setPosition = function () {
        this.role.anchorOffsetX = this.role.width / 2;
        this.role.anchorOffsetY = this.role.height / 2;
    };
    PlayerIcon.prototype.playAttackAni = function () {
        this.attackani.visible = true;
        this.attackani.x = 40;
        this.attackani.y = 20;
        this.attackani.animation.play("cut_light", 1);
        this.addChild(this.attackani);
    };
    PlayerIcon.prototype.updateHp = function () {
        this.hp.updateBar(this.roleHp, GameConst.INIT_HP);
    };
    PlayerIcon.prototype.showDamage = function (num) {
        var damage = new DamageItem(num);
        damage.y = -22;
        damage.horizontalCenter = 0;
        egret.Tween.get(damage).to({ y: -66, alpha: 0 }, 300, egret.Ease.sineIn).call(function () {
            GameUtil.removeSelf(damage);
        });
        this.addChild(damage);
    };
    /*
    * @angle 敌我角度
    * @objContainer 显示容器
    * 玩家发射飞镖
    */
    PlayerIcon.prototype.playerShut = function (angle, objContainer) {
        if (this.clipNum <= 0)
            return;
        // angle = angle - 90;
        var bullet = Bullet.produce(GameConst.WEAPON);
        objContainer.addChildAt(bullet, objContainer.numChildren - 1);
        bullet.bullet.rotation = angle + 90;
        bullet.x = this.x + this.width / 2;
        bullet.y = this.y + this.height / 2;
        GameConst.CURRENT_BULLET++;
        //是否有巨型飞镖这个天赋        
        if (GameConst.OWN_TALENT.indexOf(3) != -1) {
            if (GameConst.CURRENT_BULLET % 3 == 0 && this.clipNum >= 3) {
                bullet.scaleX = bullet.scaleY = 2;
            }
        }
        var rot = Math.PI * (angle / 180);
        bullet.vx = GameConst.WEAPON_SPEED * Math.cos(rot);
        bullet.vy = GameConst.WEAPON_SPEED * Math.sin(rot);
        // GameConst.CLIP_NUM--;
        this.clipNum--;
        PlayerIcon.dartsArray.push(bullet);
    };
    PlayerIcon.prototype.update = function () {
        for (var i = 0; i < PlayerIcon.dartsArray.length; i++) {
            var bullet = PlayerIcon.dartsArray[i];
            bullet.x += bullet.vx * Scene.factor;
            bullet.y += bullet.vy * Scene.factor;
        }
    };
    PlayerIcon.prototype.resetDarts = function () {
        if (this.clipNum >= GameConst.CLIP_NUM)
            return;
        this.clipNum++;
    };
    PlayerIcon.dartsArray = [];
    return PlayerIcon;
}(eui.Component));
__reflect(PlayerIcon.prototype, "PlayerIcon");
//# sourceMappingURL=PlayerIcon.js.map