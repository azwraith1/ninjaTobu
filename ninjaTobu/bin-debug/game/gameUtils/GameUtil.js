var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 某个特定游戏的工具类
 */
var GameUtil = (function () {
    function GameUtil() {
    }
    GameUtil.hitTest = function (obj1, obj2, group) {
        var rect1 = obj1["roleRect"].getBounds();
        var rect2;
        var point = obj1.localToGlobal();
        var point2 = obj2.localToGlobal();
        if (!(obj2 instanceof Blade)) {
            rect2 = obj2.getBounds();
            rect2.width = rect2.width * obj2["scale"];
            rect2.height = rect2.height * obj2["scale"];
            rect1.x = point.x;
            rect1.y = point.y;
            rect2.x = point2.x;
            rect2.y = point2.y;
            // let shp1 = new egret.Shape();
            // shp1.graphics.beginFill(0x0000ff, 2);
            // shp1.graphics.drawRect(rect1.x, rect1.y, rect1.width, rect1.height);
            // group.addChild(shp1);
            // egret.Tween.get(shp1).to({
            //     alpha: 0
            // }, 200).call(() => {
            //     group.removeChild(shp1);
            // })
            // if (obj2 instanceof Spikes) {
            //     let shp = new egret.Shape();
            //     shp.graphics.beginFill(0x0000ff, 2);
            //     shp.graphics.drawRect(rect2.x, rect2.y, rect2.width, rect2.height);
            //     group.addChild(shp);
            //     egret.Tween.get(shp).to({
            //         alpha: 0
            //     }, 200).call(() => {
            //         group.removeChild(shp);
            //     })
            // }
            return rect1.intersects(rect2);
        }
        else {
            var tempX = point2.x + obj2.width / 2;
            var tempY = point2.y + obj2.height / 2;
            var circle = new SHCircle(tempX, tempY, obj2["scale"] * obj2.width / 2);
            var rect = new SHRect(point.x, point.y, point.x + rect1.width, point.y, point.x + rect1.width, point.y + rect1.height, point.x, point.y + rect1.height);
            // let shp = new egret.Shape();
            // shp.graphics.beginFill(0x000000, 2);
            // shp.graphics.drawCircle(tempX, tempY, 2);
            // shp.graphics.endFill();
            // group.addChild(shp);
            // egret.Tween.get(shp).to({ alpha: 0 }, 200).call(() => {
            //     group.removeChild(shp);
            // });
            // group.addChild(circle.circle);
            // let tween: egret.Tween = egret.Tween.get(circle.circle, {
            //     loop: false
            // });
            // tween.to({ alpha: 0 }, 200).call(() => { group.removeChild(circle.circle); });
            // group.addChild(rect);
            // let tween2: egret.Tween = egret.Tween.get(rect, {
            //     loop: false
            // });
            // tween2.to({ alpha: 0 }, 200).call(() => { group.removeChild(rect); });
            var result = GameUtil.detectCircleAndRectCollision(circle, rect);
            return result;
        }
    };
    /*
    * 对block矩形碰撞方向检测
    */
    GameUtil.blockhitTest = function (obj1, obj2, group) {
        var rect1 = obj1["roleRect"].getBounds();
        var rect2left;
        var rect2right;
        var rect2top;
        var rect2bottom;
        var point = obj1["roleRect"].localToGlobal();
        var point2 = obj2.localToGlobal();
        rect1.x = point.x;
        rect1.y = point.y;
        // var shp: egret.Shape = new egret.Shape();
        // shp.graphics.beginFill(0xff0000, 0.2);
        // shp.graphics.drawRect(rect1.x, rect1.y, rect1.width, rect1.height);
        // shp.graphics.endFill();
        // // GameUtil.isshape = false
        // group.addChild(shp);
        // egret.Tween.get(shp).to({ alpha: 0 }, 200).call(() => { group.removeChild(shp) });
        if (obj2["leftRect"]) {
            rect2left = obj2["leftRect"].getBounds();
            rect2left.x = point2.x + 5;
            rect2left.y = point2.y + 10;
            if (rect1.intersects(rect2left)) {
                ObserverManager.instance.dispatchEventWith(GameEvent.HIT_LEFT_RECT, false, { rect: rect2left });
                return;
            }
            // var shp: egret.Shape = new egret.Shape();
            // shp.graphics.beginFill(0xff0000, 0.2);
            // shp.graphics.drawRect(rect2left.x, rect2left.y, rect2left.width, rect2left.height);
            // shp.graphics.endFill();
            // // GameUtil.isshape = false
            // group.addChild(shp);
            // egret.Tween.get(shp).to({ alpha: 0 }, 200).call(() => { group.removeChild(shp) });
        }
        if (obj2["rightRect"]) {
            rect2right = obj2["rightRect"].getBounds();
            rect2right.x = point2.x + obj2.width - 10;
            rect2right.y = point2.y + 10;
            if (rect1.intersects(rect2right)) {
                ObserverManager.instance.dispatchEventWith(GameEvent.HIT_RIGHT_RECT, false, { rect: rect2right });
                return;
            }
            // var shp2: egret.Shape = new egret.Shape();
            // shp2.graphics.beginFill(0xff0000, 0.2);
            // shp2.graphics.drawRect(rect2right.x, rect2right.y, rect2right.width, rect2right.height);
            // shp2.graphics.endFill();
            // // GameUtil.isshape = false
            // group.addChild(shp2);
            // egret.Tween.get(shp2).to({ alpha: 0 }, 200).call(() => { group.removeChild(shp2) });
        }
        if (obj2["topRect"]) {
            rect2top = obj2["topRect"].getBounds();
            rect2top.x = point2.x + 5;
            rect2top.y = point2.y + 10;
            if (rect1.intersects(rect2top)) {
                ObserverManager.instance.dispatchEventWith(GameEvent.HIT_TOP_RECT);
                return;
            }
            // var shp3: egret.Shape = new egret.Shape();
            // shp3.graphics.beginFill(0xff0000, 0.2);
            // shp3.graphics.drawRect(rect2top.x, rect2top.y, rect2top.width, rect2top.height);
            // shp3.graphics.endFill();
            // // GameUtil.isshape = false
            // group.addChild(shp3);
            // egret.Tween.get(shp3).to({ alpha: 0 }, 200).call(() => { group.removeChild(shp3) });
        }
        if (obj2["bottomRect"]) {
            rect2bottom = obj2["bottomRect"].getBounds();
            rect2bottom.x = point2.x + 5;
            rect2bottom.y = point2.y + obj2.height - 20;
            if (rect1.intersects(rect2bottom)) {
                ObserverManager.instance.dispatchEventWith(GameEvent.HIT_BOTTOM_RECT);
                return;
            }
            // var shp4: egret.Shape = new egret.Shape();
            // shp4.graphics.beginFill(0xff0000, 0.2);
            // shp4.graphics.drawRect(rect2bottom.x, rect2bottom.y, rect2bottom.width, rect2bottom.height);
            // shp4.graphics.endFill();
            // // GameUtil.isshape = false
            // group.addChild(shp4);
            // egret.Tween.get(shp4).to({ alpha: 0 }, 200).call(() => { group.removeChild(shp4) });
        }
    };
    //人物是否与方块产生碰撞
    GameUtil.isHit = function (obj1, obj2) {
        var rect1 = obj1["roleRect"].getBounds();
        var rect2left;
        var rect2right;
        var rect2top;
        var rect2bottom;
        var point = obj1["roleRect"].localToGlobal();
        var point2 = obj2.localToGlobal();
        rect1.x = point.x;
        rect1.y = point.y;
        if (obj2["leftRect"]) {
            rect2left = obj2["leftRect"].getBounds();
            rect2left.x = point2.x + 5;
            rect2left.y = point2.y + 10;
            if (rect1.intersects(rect2left)) {
                return true;
            }
        }
        if (obj2["rightRect"]) {
            rect2right = obj2["rightRect"].getBounds();
            rect2right.x = point2.x + obj2.width - 10;
            rect2right.y = point2.y + 10;
            if (rect1.intersects(rect2right)) {
                return true;
            }
        }
        if (obj2["topRect"]) {
            rect2top = obj2["topRect"].getBounds();
            rect2top.x = point2.x + 5;
            rect2top.y = point2.y + 10;
            if (rect1.intersects(rect2top)) {
                return true;
            }
        }
        if (obj2["bottomRect"]) {
            rect2bottom = obj2["bottomRect"].getBounds();
            rect2bottom.x = point2.x + 5;
            rect2bottom.y = point2.y + obj2.height - 20;
            if (rect1.intersects(rect2bottom)) {
                return true;
            }
        }
        return false;
    };
    /**
         * 求出点到某条直线的距离
         */
    GameUtil.computeDistanceBetweenPointAndLine = function (x, y, x1, y1, x2, y2) {
        var a = y2 - y1;
        var b = x1 - x2;
        var c = x2 * y1 - x1 * y2;
        return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
    };
    /**
     * 检测圆和矩形的相交
     */
    GameUtil.detectCircleAndRectCollision = function (circle, rect) {
        var ABLength = (rect.vector2.sub(rect.vector1)).model(); // 求AB边的长度
        var DALength = (rect.vector1.sub(rect.vector4)).model(); // 求AD边的长度
        var halfABLength = ABLength / 2;
        var halfDALength = DALength / 2;
        var vectorAB = rect.vector2.sub(rect.vector1);
        var vectorAC = rect.vector3.sub(rect.vector1);
        var vectorAD = rect.vector4.sub(rect.vector1);
        // 矩形中心坐标
        var rectCenterX = rect.x + vectorAC.x / 2;
        var rectCenterY = rect.y + vectorAC.y / 2;
        // AB边的中点坐标
        var ABCenterX = rect.x + vectorAB.x / 2;
        var ABCenterY = rect.y + vectorAB.y / 2;
        // AD边的中点坐标
        var ADCenterX = rect.x + vectorAD.x / 2;
        var ADCenterY = rect.y + vectorAD.y / 2;
        // 圆心到两条直线的距离
        var d1 = GameUtil.computeDistanceBetweenPointAndLine(circle.x, circle.y, rectCenterX, rectCenterY, ADCenterX, ADCenterY);
        if (d1 > (halfDALength + circle.r))
            return false;
        var d2 = GameUtil.computeDistanceBetweenPointAndLine(circle.x, circle.y, rectCenterX, rectCenterY, ABCenterX, ABCenterY);
        if (d2 > (halfABLength + circle.r))
            return false;
        // trace(d1, halfDALength);
        // trace(d2, halfABLength);
        // 与矩形某条边相交
        if ((d1 <= halfDALength) ||
            (d2 <= halfABLength))
            return true;
        // trace(circle.vector.sub(rect.vector1).model());
        // trace(circle.vector.sub(rect.vector2).model());
        // trace(circle.vector.sub(rect.vector3).model());
        // trace(circle.vector.sub(rect.vector4).model());
        // 与矩形顶点相交
        if (circle.vector.sub(rect.vector1).model() <= circle.r ||
            circle.vector.sub(rect.vector2).model() <= circle.r ||
            circle.vector.sub(rect.vector3).model() <= circle.r ||
            circle.vector.sub(rect.vector4).model() <= circle.r)
            return true;
        return false;
    };
    /*
    *  obj1 人物不参加旋转
    *  obj2 旋转物体
    */
    GameUtil.roteRectHitTest = function (obj1, obj2, group) {
        var rotation = obj2.rotation % 360;
        var obj2point1 = new egret.Point();
        var obj2point2 = new egret.Point();
        var obj2point3 = new egret.Point();
        var obj2point4 = new egret.Point();
        var rolePoint1 = new egret.Point();
        var rolePoint2 = new egret.Point();
        var rolePoint3 = new egret.Point();
        var rolePoint4 = new egret.Point();
        var point1 = obj1.localToGlobal();
        var point2 = obj2.localToGlobal();
        var w = obj2.initWidth;
        var h = obj2.initHeight;
        var l = Math.sqrt(w * w + h * h);
        if (rotation >= 0 && rotation <= 90) {
            obj2point1.x = point2.x;
            obj2point2.x = point2.x + w * Math.cos(Math.PI * rotation / 180);
            obj2point3.x = obj2point2.x - h * Math.sin(Math.PI * rotation / 180);
            obj2point4.x = point2.x - h * Math.sin(Math.PI * rotation / 180);
            obj2point1.y = point2.y;
            obj2point2.y = point2.y + w * Math.sin(Math.PI * rotation / 180);
            obj2point3.y = obj2point2.y + h * Math.cos(Math.PI * rotation / 180);
            obj2point4.y = point2.y + h * Math.cos(Math.PI * rotation / 180);
        }
        else if (rotation > 90 && rotation <= 180) {
            obj2point1.x = point2.x - h * Math.cos(Math.PI * (rotation - 90) / 180);
            obj2point2.x = point2.x;
            obj2point3.x = point2.x - w * Math.sin(Math.PI * (rotation - 90) / 180);
            obj2point4.x = obj2point3.x - h * Math.cos(Math.PI * (rotation - 90) / 180);
            obj2point1.y = point2.y - w * Math.sin(Math.PI * (rotation - 90) / 180);
            obj2point2.y = point2.y;
            obj2point3.y = point2.y + w * Math.cos(Math.PI * (rotation - 90) / 180);
            obj2point4.y = obj2point3.y - h * Math.sin(Math.PI * (rotation - 90) / 180);
        }
        else if (rotation < 0 && rotation >= -90) {
            obj2point1.x = point2.x + w * Math.sin(Math.PI * (rotation + 90) / 180);
            obj2point3.x = point2.x + h * Math.cos(Math.PI * (rotation + 90) / 180);
            obj2point4.x = point2.x;
            obj2point2.x = obj2point3.x + w * Math.sin(Math.PI * (rotation + 90) / 180);
            obj2point1.y = point2.y - w * Math.cos(Math.PI * (rotation + 90) / 180);
            obj2point3.y = point2.y + h * Math.sin(Math.PI * (rotation + 90) / 180);
            obj2point4.y = point2.y;
            obj2point2.y = obj2point3.y - w * Math.cos(Math.PI * (rotation + 90) / 180);
        }
        else if (rotation < -90 && rotation >= -180) {
            obj2point2.x = point2.x + h * Math.sin(Math.PI * (rotation + 180) / 180);
            obj2point3.x = point2.x;
            obj2point4.x = point2.x - w * Math.cos(Math.PI * (rotation + 180) / 180);
            obj2point1.x = obj2point4.x + h * Math.sin(Math.PI * (rotation + 180) / 180);
            obj2point2.y = point2.y - h * Math.cos(Math.PI * (rotation + 180) / 180);
            obj2point3.y = point2.y;
            obj2point4.y = point2.y - w * Math.sin(Math.PI * (rotation + 180) / 180);
            obj2point1.y = obj2point4.y - h * Math.cos(Math.PI * (rotation + 180) / 180);
        }
        rolePoint1.x = point1.x;
        rolePoint1.y = point1.y;
        rolePoint2.x = point1.x + obj1.width;
        rolePoint2.y = point1.y;
        rolePoint3.x = point1.x + obj1.width;
        rolePoint3.y = point1.y + obj1.height;
        rolePoint4.x = point1.x;
        rolePoint4.y = point1.y + obj1.height;
        var blockLineArray = [obj2point1, obj2point2, obj2point3, obj2point4];
        var roleLineArray = [rolePoint1, rolePoint2, rolePoint3, rolePoint4];
        if (GameUtil.QuickReject(obj2point1, obj2point2, rolePoint1, rolePoint2) && GameUtil.Straddle(obj2point1, obj2point2, rolePoint1, rolePoint2))
            return true;
        if (GameUtil.QuickReject(obj2point2, obj2point3, rolePoint1, rolePoint2) && GameUtil.Straddle(obj2point2, obj2point3, rolePoint1, rolePoint2))
            return true;
        if (GameUtil.QuickReject(obj2point3, obj2point4, rolePoint1, rolePoint2) && GameUtil.Straddle(obj2point3, obj2point4, rolePoint1, rolePoint2))
            return true;
        if (GameUtil.QuickReject(obj2point4, obj2point1, rolePoint1, rolePoint2) && GameUtil.Straddle(obj2point4, obj2point1, rolePoint1, rolePoint2))
            return true;
        if (GameUtil.QuickReject(obj2point1, obj2point2, rolePoint2, rolePoint3) && GameUtil.Straddle(obj2point1, obj2point2, rolePoint2, rolePoint3))
            return true;
        if (GameUtil.QuickReject(obj2point2, obj2point3, rolePoint2, rolePoint3) && GameUtil.Straddle(obj2point2, obj2point3, rolePoint2, rolePoint3))
            return true;
        if (GameUtil.QuickReject(obj2point3, obj2point4, rolePoint2, rolePoint3) && GameUtil.Straddle(obj2point3, obj2point4, rolePoint2, rolePoint3))
            return true;
        if (GameUtil.QuickReject(obj2point4, obj2point1, rolePoint2, rolePoint3) && GameUtil.Straddle(obj2point4, obj2point1, rolePoint2, rolePoint3))
            return true;
        if (GameUtil.QuickReject(obj2point1, obj2point2, rolePoint3, rolePoint4) && GameUtil.Straddle(obj2point1, obj2point2, rolePoint3, rolePoint4))
            return true;
        if (GameUtil.QuickReject(obj2point2, obj2point3, rolePoint3, rolePoint4) && GameUtil.Straddle(obj2point2, obj2point3, rolePoint3, rolePoint4))
            return true;
        if (GameUtil.QuickReject(obj2point3, obj2point4, rolePoint3, rolePoint4) && GameUtil.Straddle(obj2point3, obj2point4, rolePoint3, rolePoint4))
            return true;
        if (GameUtil.QuickReject(obj2point4, obj2point1, rolePoint3, rolePoint4) && GameUtil.Straddle(obj2point4, obj2point1, rolePoint3, rolePoint4))
            return true;
        if (GameUtil.QuickReject(obj2point1, obj2point2, rolePoint4, rolePoint1) && GameUtil.Straddle(obj2point1, obj2point2, rolePoint4, rolePoint1))
            return true;
        if (GameUtil.QuickReject(obj2point2, obj2point3, rolePoint4, rolePoint1) && GameUtil.Straddle(obj2point2, obj2point3, rolePoint4, rolePoint1))
            return true;
        if (GameUtil.QuickReject(obj2point3, obj2point4, rolePoint4, rolePoint1) && GameUtil.Straddle(obj2point3, obj2point4, rolePoint4, rolePoint1))
            return true;
        if (GameUtil.QuickReject(obj2point4, obj2point1, rolePoint4, rolePoint1) && GameUtil.Straddle(obj2point4, obj2point3, rolePoint4, rolePoint1))
            return true;
        return false;
    };
    GameUtil.QuickReject = function (startPoint1, endPoint1, startPoint2, endPoint2) {
        var l1xMax = Math.max(startPoint1.x, endPoint1.x);
        var l1yMax = Math.max(startPoint1.y, endPoint1.y);
        var l1xMin = Math.min(startPoint1.x, endPoint1.x);
        var l1yMin = Math.min(startPoint1.y, endPoint1.y);
        var l2xMax = Math.max(startPoint2.x, endPoint2.x);
        var l2yMax = Math.max(startPoint2.y, endPoint2.y);
        var l2xMin = Math.min(startPoint2.x, endPoint2.x);
        var l2yMin = Math.min(startPoint2.y, endPoint2.y);
        if (l1xMax < l2xMin || l1yMax < l2yMin || l2xMax < l1xMin || l2yMax < l1yMin) {
            return false;
        }
        return true;
    };
    GameUtil.Straddle = function (l1Start, l1End, l2Start, l2End) {
        var l1x1 = l1Start.x;
        var l1x2 = l1End.x;
        var l1y1 = l1Start.y;
        var l1y2 = l1End.y;
        var l2x1 = l2Start.x;
        var l2x2 = l2End.x;
        var l2y1 = l2Start.y;
        var l2y2 = l2End.y;
        if ((((l1x1 - l2x1) * (l2y2 - l2y1) - (l1y1 - l2y1) * (l2x2 - l2x1)) *
            ((l1x2 - l2x1) * (l2y2 - l2y1) - (l1y2 - l2y1) * (l2x2 - l2x1))) > 0 ||
            (((l2x1 - l1x1) * (l1y2 - l1y1) - (l2y1 - l1y1) * (l1x2 - l1x1)) *
                ((l2x2 - l1x1) * (l1y2 - l1y1) - (l2y2 - l1y1) * (l1x2 - l1x1))) > 0) {
            return false;
        }
        return true;
    };
    GameUtil.enemyHittest = function (obj1, obj2) {
        var rect1 = obj1["roleRect"].getBounds();
        var rect2 = obj2["pzRect"].getBounds();
        var point = obj1.localToGlobal();
        var point2 = obj2.localToGlobal();
        rect1.x = point.x;
        rect1.y = point.y;
        rect2.x = point2.x;
        rect2.y = point2.y;
        return rect1.intersects(rect2);
    };
    GameUtil.setPlayerScore = function (score) {
        egret.localStorage.setItem("maxScorel", score);
    };
    GameUtil.getPlayerScore = function () {
        var score = parseInt(egret.localStorage.getItem("maxScorel"));
        return score;
    };
    /**
     * 获取圆内坐标X
     * @param r 半径
     * @param ao 角度(0-360)
     * @return
     */
    GameUtil.getArcX = function (r, ao) {
        return r * Math.cos(ao * Math.PI / 180);
    };
    /**
     * 获取圆内坐标Y
     * @param r 半径
     * @param ao 角度(0-360)
     * @return
     */
    GameUtil.getArcY = function (r, ao) {
        return r * Math.sin(ao * Math.PI / 180);
    };
    GameUtil.resetScene = function () {
        if (GAME_MODEL == "coin") {
            for (var i = 0; i < Scene.coinArray.length; i++) {
                var coin = Scene.coinArray[i];
                if (coin && coin.parent) {
                    coin.parent.removeChild(coin);
                }
                Coin.reclain(coin);
                Scene.coinArray.splice(i, 1);
            }
        }
        else if (GAME_MODEL = "level") {
            for (var i = 0; i < Scene.trapsArray.length; i++) {
                var trap = Scene.trapsArray[i];
                if (trap && trap.parent) {
                    trap.parent.removeChild(trap);
                }
                Scene.trapsArray.splice(i, 1);
            }
            for (var i = 0; i < Soldiers.enemyArray.length; i++) {
                var enemy = Soldiers.enemyArray[i];
                if (enemy && enemy.parent) {
                    enemy.parent.removeChild(enemy);
                }
                Soldiers.reclaim(enemy);
                Soldiers.enemyArray.splice(i, 0);
            }
            for (var i = 0; i < Scene.roteBlockArray.length; i++) {
                var roteblock = Scene.blockArray[i];
                if (roteblock && roteblock.parent) {
                    roteblock.parent.removeChild(roteblock);
                }
                RoteBlockObject.reclaim(roteblock);
                Scene.roteBlockArray.splice(i, 1);
            }
            for (var i = 0; i < Scene.blockArray.length; i++) {
                var block = Scene.blockArray[i];
                if (block && block.parent) {
                    block.parent.removeChild(block);
                }
                BlockObject.reclaim(block);
                Scene.blockArray.splice(i, 1);
            }
        }
    };
    GameUtil.retSunPos = function (time) {
        var point = new egret.Point();
        switch (time) {
            case 1:
            case 13:
                point.x = 280;
                point.y = 280;
                break;
            case 2:
            case 14:
                point.x = 320;
                point.y = 320;
                break;
            case 3:
            case 15:
                point.x = 360;
                point.y = 340;
                break;
            case 4:
            case 16:
                point.x = 400;
                point.y = 360;
                break;
            case 5:
            case 17:
                point.x = 440;
                point.y = 400;
                break;
            case 6:
            case 18:
                point.x = 120;
                point.y = 480;
                break;
            case 7:
            case 19:
                point.x = 140;
                point.y = 440;
                break;
            case 8:
            case 20:
                point.x = 160;
                point.y = 400;
                break;
            case 9:
            case 21:
                point.x = 180;
                point.y = 360;
                break;
            case 10:
            case 22:
                point.x = 200;
                point.y = 320;
                break;
            case 11:
            case 23:
                point.x = 220;
                point.y = 280;
                break;
            case 12:
            case 0:
                point.x = 240;
                point.y = 240;
                break;
        }
        return point;
    };
    GameUtil.retAlpha = function (hour) {
        var alpha;
        switch (hour) {
            case 1:
                alpha = 0.3;
                break;
            case 2:
                alpha = 0.4;
                break;
            case 3:
                alpha = 0.3;
                break;
            case 4:
                alpha = 0.25;
                break;
            case 5:
                alpha = 0.2;
                break;
            case 6:
                alpha = 0;
                break;
            case 7:
                alpha = 0.05;
                break;
            case 8:
                alpha = 0.05;
                break;
            case 9:
                alpha = 0.1;
                break;
            case 10:
                alpha = 0.1;
                break;
            case 11:
                alpha = 0.1;
                break;
            case 12:
                alpha = 0.1;
                break;
            case 13:
                alpha = 0.1;
                break;
            case 14:
                alpha = 0.1;
                break;
            case 15:
                alpha = 0.1;
                break;
            case 16:
                alpha = 0.1;
                break;
            case 17:
                alpha = 0.05;
                break;
            case 18:
                alpha = 0;
                break;
            case 19:
                alpha = 0.2;
                break;
            case 20:
                alpha = 0.25;
                break;
            case 21:
                alpha = 0.3;
                break;
            case 22:
                alpha = 0.3;
                break;
            case 23:
                alpha = 0.4;
                break;
            case 0:
                alpha = 0.5;
                break;
        }
        return alpha;
    };
    GameUtil.bulletHit = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        var point = obj1.localToGlobal();
        var point2 = obj2.localToGlobal();
        rect1.x = point.x;
        rect1.y = point.y;
        rect2.x = point2.x;
        rect2.y = point2.y;
        return rect1.intersects(rect2);
    };
    GameUtil.removeSelf = function (obj) {
        if (obj && obj.parent) {
            obj.parent.removeChild(obj);
        }
    };
    /**基于矩形的碰撞检测*/
    GameUtil.isshape = true;
    GameUtil.playerMaxScore = 0;
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
//# sourceMappingURL=GameUtil.js.map