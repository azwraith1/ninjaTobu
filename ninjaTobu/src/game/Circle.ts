/**
     * 圆形类
     */
class SHCircle {
    public x: number;
    public y: number;
    public r: number;
    public vector: SHVector;
    public circle: egret.Shape;

    /**
     * 构造函数
     */
    public constructor(x: number, y: number, r: number) {

        this.x = x;
        this.y = y;
        this.r = r;

        this.vector = new SHVector(x, y);

        let circle: egret.Shape = new egret.Shape();
        circle.graphics.beginFill(0xff0000, 0.2);
        circle.graphics.drawCircle(0, 0, r);
        circle.graphics.endFill();
        circle.x = x;
        circle.y = y;
        this.circle = circle;
    }
}