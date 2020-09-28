// TypeScript file
class PlayerIcon extends eui.Component {
    public role: eui.Image;
    public roleRect: eui.Rect;

    public clipNum: number = GameConst.CLIP_NUM;
    public hp: PlayerHp;
    public velocity: any = [0, 0];
    public roleAy: number = GameConst.ACC_SPEED; //忍者y方向的加速度
    public state: string = GameConst.INVICIBLE;
    public roleHp: number = GameConst.INIT_HP;
    public static _instance: PlayerIcon;
    public static dartsArray: Bullet[] = [];
    public constructor() {
        super();
        this.skinName = "PlayerIconSkin";
    }

    public static get instance() {
        if (!PlayerIcon._instance) {
            PlayerIcon._instance = new PlayerIcon();
        }
        return PlayerIcon._instance;
    }


    public createChildren() {
        super.createChildren();
        this.role.anchorOffsetX = this.role.width / 2;
        this.role.anchorOffsetY = this.role.height / 2;
        this.attackani = CommonUtil.createAnimation("cut_light", function () {
            this.attackani.visible = false;
        }, this);
        egret.Ticker.getInstance().register(this.update, this);
        GameConst.CURRENT_BULLET = 0;
    }

    public changeSource(source) {
        this.role.source = source;
        this.addChild(this.role)
        this.setPosition();
    }

    protected setPosition() {
        this.role.anchorOffsetX = this.role.width / 2;
        this.role.anchorOffsetY = this.role.height / 2;
    }
    public attackani: dragonBones.EgretArmatureDisplay;
    public playAttackAni() {
        this.attackani.visible = true;
        this.attackani.x = 40;
        this.attackani.y = 20;
        this.attackani.animation.play("cut_light", 1);
        this.addChild(this.attackani);
    }

    public updateHp() {
        this.hp.updateBar(this.roleHp, GameConst.INIT_HP);
    }

    public showDamage(num) {
        let damage = new DamageItem(num);
        damage.y = -22;
        damage.horizontalCenter = 0;
        egret.Tween.get(damage).to({ y: -66, alpha: 0 }, 300, egret.Ease.sineIn).call(() => {
            GameUtil.removeSelf(damage);
        })
        this.addChild(damage);
    }

    /*
    * @angle 敌我角度
    * @objContainer 显示容器
    * 玩家发射飞镖
    */
    public playerShut(angle, objContainer: egret.DisplayObjectContainer) {
        if (this.clipNum <= 0) return;

        // angle = angle - 90;
        let bullet = Bullet.produce(GameConst.WEAPON);
        objContainer.addChildAt(bullet, objContainer.numChildren - 1);
        bullet.bullet.rotation = angle + 90;
        bullet.x = this.x + this.width / 2; bullet.y = this.y + this.height / 2;
        GameConst.CURRENT_BULLET++;
        //是否有巨型飞镖这个天赋        
        if (GameConst.OWN_TALENT.indexOf(3) != -1) {
            if (GameConst.CURRENT_BULLET % 3 == 0 && this.clipNum >= 3) {
                bullet.scaleX = bullet.scaleY = 2;
            }
        }
        let rot = Math.PI * (angle / 180);
        bullet.vx = GameConst.WEAPON_SPEED * Math.cos(rot);
        bullet.vy = GameConst.WEAPON_SPEED * Math.sin(rot);
        // GameConst.CLIP_NUM--;
        this.clipNum--;
        PlayerIcon.dartsArray.push(bullet);
    }

    public update() {
        for (let i = 0; i < PlayerIcon.dartsArray.length; i++) {
            let bullet = PlayerIcon.dartsArray[i];
            bullet.x += bullet.vx * Scene.factor;
            bullet.y += bullet.vy * Scene.factor;
        }
    }

    public resetDarts() {
        if (this.clipNum >= GameConst.CLIP_NUM) return;
        this.clipNum++;
    }

}