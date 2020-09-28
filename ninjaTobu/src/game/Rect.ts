/**
     * 矩形类
     */
class SHRect extends egret.Shape {
    public vx1: number;
    public vy1: number;
    public vx2: number;
    public vy2: number;
    public vx3: number;
    public vy3: number;
    public vx4: number;
    public vy4: number;

    public vector1: SHVector;
    public vector2: SHVector;
    public vector3: SHVector;
    public vector4: SHVector;

    /**
     * 构造函数
     */
    public constructor(vx1: number, vy1: number, vx2: number, vy2: number, vx3: number, vy3: number, vx4: number, vy4: number) {
        super();

        this.vx1 = vx1;
        this.vy1 = vy1;
        this.vx2 = vx2;
        this.vy2 = vy2;
        this.vx3 = vx3;
        this.vy3 = vy3;
        this.vx4 = vx4;
        this.vy4 = vy4;

        this.vector1 = new SHVector(vx1, vy1);
        this.vector2 = new SHVector(vx2, vy2);
        this.vector3 = new SHVector(vx3, vy3);
        this.vector4 = new SHVector(vx4, vy4);

        // this.graphics.beginFill(0xff0000, 0.2);
        // this.graphics.drawRect(0, 0, vx2 - vx1, vy3 - vy2);
        // this.graphics.endFill();
        this.x = vx1;
        this.y = vy1;
    }
}