//向量类
class SHVector {
    public x: number;
    public y: number;
    public z: number;

    /**
* 构造函数
*/
    public constructor(x: number, y: number, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;

    }

    /**
* 向量的模
*/
    public model(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

    }

    /**
  * 加法
  */
    public add(vector: SHVector): SHVector {
        return new SHVector(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z
        );

    }

    /**
  * 减法
  */
    public sub(vector: SHVector, reverse: Boolean = false): SHVector {
        if (!reverse) {
            return new SHVector(
                this.x - vector.x,
                this.y - vector.y,
                this.z - vector.z
            );

        }
        else {
            return new SHVector(
                vector.x - this.x,
                vector.y - this.y,
                vector.z - this.z
            );

        }

    }

    /**
* 点乘（内积）
*/
    public dot(vector: SHVector): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;

    }

    /**
  * 叉乘（外积）
  */
    public cross(vector: SHVector): SHVector {
        var resultVector: SHVector = new SHVector(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        );

        return resultVector;

    }

    /**
  * 求两条向量的夹角，以弧度为单位
  */
    public angle(vector: SHVector): Number {
        if (this.model() == 0 ||
            vector.model() == 0)
            return 0;

        return Math.acos(this.dot(vector) / (this.model() * vector.model()));

    }

    /**
   * 对象信息
  */
    public toString(): string {
        return "x:" + this.x + "," +
            "y:" + this.y + "," +
            "z:" + this.z + "," +
            "model:" + this.model();
    }
}