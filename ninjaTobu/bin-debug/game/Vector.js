var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//向量类
var SHVector = (function () {
    /**
* 构造函数
*/
    function SHVector(x, y, z) {
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    /**
* 向量的模
*/
    SHVector.prototype.model = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    /**
  * 加法
  */
    SHVector.prototype.add = function (vector) {
        return new SHVector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    };
    /**
  * 减法
  */
    SHVector.prototype.sub = function (vector, reverse) {
        if (reverse === void 0) { reverse = false; }
        if (!reverse) {
            return new SHVector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
        }
        else {
            return new SHVector(vector.x - this.x, vector.y - this.y, vector.z - this.z);
        }
    };
    /**
* 点乘（内积）
*/
    SHVector.prototype.dot = function (vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    };
    /**
  * 叉乘（外积）
  */
    SHVector.prototype.cross = function (vector) {
        var resultVector = new SHVector(this.y * vector.z - this.z * vector.y, this.z * vector.x - this.x * vector.z, this.x * vector.y - this.y * vector.x);
        return resultVector;
    };
    /**
  * 求两条向量的夹角，以弧度为单位
  */
    SHVector.prototype.angle = function (vector) {
        if (this.model() == 0 ||
            vector.model() == 0)
            return 0;
        return Math.acos(this.dot(vector) / (this.model() * vector.model()));
    };
    /**
   * 对象信息
  */
    SHVector.prototype.toString = function () {
        return "x:" + this.x + "," +
            "y:" + this.y + "," +
            "z:" + this.z + "," +
            "model:" + this.model();
    };
    return SHVector;
}());
__reflect(SHVector.prototype, "SHVector");
//# sourceMappingURL=Vector.js.map