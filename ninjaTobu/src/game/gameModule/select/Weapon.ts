// TypeScript file
class Weapon extends eui.Component {
    public weapon: eui.Image;
    public texture: string;
    public constructor(img) {
        super();
        this.skinName = "WeaponSkin";
        this.texture = img;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseWeapon, this);
    }

    public createChildren() {
        super.createChildren();
        this.weapon.source = this.texture;
    }
    /*
    * 选择武器
    */
    public chooseWeapon() {
        GameConst.WEAPON = this.texture;
        ObserverManager.instance.dispatchEventWith(GameEvent.CLOSE_SELECT);
        switch (this.texture) {
            case "ninja_weapon2_png":
                GameConst.CLIP_NUM = 6;
                GameConst.ATTACK_SPEED = 400;
                GameConst.RELOAD_INTERVAL = 400;
                GameConst.WEAPON_POWER = 35;
                GameConst.WEAPON_SPEED = 12;
                break;
            case "ninja_weapon4_png":
                GameConst.CLIP_NUM = 12;
                GameConst.ATTACK_SPEED = 200;
                GameConst.RELOAD_INTERVAL = 100;
                GameConst.WEAPON_POWER = 15;
                GameConst.WEAPON_SPEED = 15;
                break;
            case "ninja_weapon5_png":
                GameConst.CLIP_NUM = 2;
                GameConst.ATTACK_SPEED = 1000;
                GameConst.RELOAD_INTERVAL = 1000;
                GameConst.WEAPON_POWER = 80;
                GameConst.WEAPON_SPEED = 8;
                break;
            case "ninja_weapon6_png":
                GameConst.CLIP_NUM = 8;
                GameConst.ATTACK_SPEED = 500;
                GameConst.RELOAD_INTERVAL = 300;
                GameConst.WEAPON_POWER = 25;
                GameConst.WEAPON_SPEED = 10;
                GameConst.CROSS_WALL = true;
                break;
            case "ninja_weapon1_png":
                GameConst.CLIP_NUM = 10;
                GameConst.ATTACK_SPEED = 200;
                GameConst.RELOAD_INTERVAL = 100;
                GameConst.WEAPON_POWER = 2;
                GameConst.WEAPON_SPEED = 12;
                break;
            case "ninja_weapon3_png":
                GameConst.CLIP_NUM = 10;
                GameConst.ATTACK_SPEED = 200;
                GameConst.RELOAD_INTERVAL = 100;
                GameConst.WEAPON_POWER = 2;
                GameConst.WEAPON_SPEED = 12;
                break;
        }
    }
}