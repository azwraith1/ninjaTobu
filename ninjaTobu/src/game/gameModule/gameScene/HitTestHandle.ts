// TypeScript file
class HitTestHandle {

    public static addTicket(obj) {
        egret.Ticker.getInstance().register(this.update, obj)
    }

    public static update() {
        HitTestHandle.hitTest();
    }

    /*
    * 物体碰撞检测，物体需包含类型属性
    */
    public static hitTest() {
       
    }

    public static hitBlock(obj) {
        //人物停止移动，播放停下动画
        let block = obj;
        if (block == "leftBlock") {

        } else if (block == "rightBlock") {

        }
    }

    public static hitTrap() {
        //人物死亡，播放死亡效果
    }

    public static hitEnemy(obj) {
        //攻击敌人
        let enemy = obj;
        enemy.destory();
    }

    public static arriveEnd() {
        //抵达终点
    }

    public static checkRolePosition(roleDeriction: Array<number>) {
        let block;
        let role;
        let disx = role.x - block.x;
        let disy = role.y - block.y;
        let distance = Math.sqrt(disx * disx + disy * disy);
        let minlength1 = Math.sqrt((Math.pow(block.height / 4, 2)) + (Math.pow(block.width / 2, 2)));
        let minlength2 = Math.sqrt((Math.pow(block.width / 4, 2)) + (Math.pow(block.height / 2, 2)));
        let maxLength = Math.sqrt(block.width * block.width + block.height * block.height) / 2;
        if (distance >= minlength1 && distance <= maxLength || distance >= minlength2 && distance <= maxLength) {
            //role可以穿过方块拐角event
            //计算运动方向与人物站立物角度判断可否穿过
        } else {
            //派发role无法穿过拐角，只翻跟头动作event
        }
    }
} 