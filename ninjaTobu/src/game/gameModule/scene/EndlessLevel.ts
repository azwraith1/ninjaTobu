// TypeScript file
class EndlessLevel extends eui.Group {

    public list: Array<EndlessItemGroup> = [];
    public listLength: number = 3;

    public constructor() {
        super();
    }

    public createChildren() {
        super.createChildren();
        this.height = 1334 * 3;
        this.init();
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        ObserverManager.instance.addEventListener(GameEvent.ROLE_DEAD, this.stopSlide, this);
    }

    private init() {
        this.stop = false;
        for (let i = 0; i < this.listLength; i++) {
            let item = new EndlessItemGroup("ninja_endless0" + (i + 1) + "_json");
            item.y = 0 - 1334 * i;
            this.addChild(item);
            this.list.push(item);
        }
    }

    public stop: boolean = false;

    public update() {
        if (this.stop) return;
        for (let i = 0; i < this.list.length; i++) {
            let item = this.list[i];
            let itemy = item.localToGlobal().y;
            if (itemy > 1334) {
                let last = this.findFirst() as EndlessItemGroup;
                item.y = last.y - 1334;
                EndlessItemGroup.reclaim(item);
                item.addConfig("ninja_endless0" + (i + 1) + "_json");
                return;
            }
            var sceneMediator: SceneMediator = <SceneMediator>ObserverManager.getMediator(SceneMediator)
            let player = sceneMediator.getScene().playerIcon;
            if (GameConst.IS_SLIDE) {
                if (player.localToGlobal().y <= GameConst.SCREEN_HEIGHT / 4) {
                    if (player.velocity[1] >= 0) { //下落
                        GameConst.SLIDE_SPEED = GameConst.BASE_SPEED;
                    } else {
                        GameConst.SLIDE_SPEED = -player.velocity[1];
                    }
                } else {
                    GameConst.SLIDE_SPEED = GameConst.BASE_SPEED;
                }
                this.y += GameConst.SLIDE_SPEED * Scene.factor;
                player.y += GameConst.SLIDE_SPEED * Scene.factor;
            }
        }
    }

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

    public stopSlide() {
        this.stop = true;
    }

}