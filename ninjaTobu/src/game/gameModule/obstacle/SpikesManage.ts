//尖刺管理器
enum Dir {
    TOP,
    BOTTOM,
    LEFT,
    RIGHT,
}

class SpikesManage {
    private static _instance: SpikesManage; //单例
    public static get instance(): SpikesManage {
        return this._instance = this._instance || new SpikesManage();
    }
    private constructor() { }

    public creatSpikes(x: number, y: number, dir: Dir, len: number, rote: boolean, scale?: number, height?: number): Spikes[] {
        let arr: Spikes[] = [];
        //基本长度尺寸 100 * 30  但是有空隙取90
        let width: number = 90;
        let num: number = Math.floor(len / 100);

        for (let index = 0; index < num; index++) {
            let img: Spikes = new Spikes("spikes_png");
            arr.push(img);
            img.scale = scale;

            if (!rote) {
                Scene.trapsArray.push(img)
            };
            if (dir == Dir.TOP) { //朝上正常横着摆
                img.x = index == 0 ? x : x + width * index;
                img.y = y;
            } else if (dir == Dir.BOTTOM) { //下
                //翻转
                img.traps.skewX = 180;
                img.x = index == 0 ? x : x + width * index;
                img.y = y;
            } else if (dir == Dir.LEFT) { //左
                //翻转
                img.traps.skewX = 180;
                //旋转90
                img.traps.rotation = 90;
                img.x = x;
                img.y = index == 0 ? y : y + width * index;
            } else if (dir == Dir.RIGHT) { //右
                //旋转90
                img.traps.rotation = 90;
                img.x = x;
                img.y = index == 0 ? y : y + width * index;
            }
        }
        return arr;
    }

    public creatSpikes2(x: number, y: number, dir: Dir, len: number, rote: boolean, scale?: number, height?: number): Spikes[] {
        let arr: Spikes[] = [];
        //基本长度尺寸 100 * 30  但是有空隙取90
        let width: number = 90;
        let num: number = Math.floor(len / 100);

        for (let index = 0; index < num; index++) {
            let img: Spikes = Spikes.produce("spikes_png");
            arr.push(img);
            img.scale = scale;

            if (!rote) {
                Scene.trapsArray.push(img)
            };
            if (dir == Dir.TOP) { //朝上正常横着摆
                img.x = index == 0 ? x : x + width * index;
                img.y = y + 5;
            } else if (dir == Dir.BOTTOM) { //下
                //翻转
                img.traps.skewX = 180;
                img.x = index == 0 ? x - (width * scale) : x - (width * scale) + width * scale * index;
                img.y = y - 30 * scale;
            } else if (dir == Dir.LEFT) { //左
                //翻转
                img.traps.skewX = 180;
                //旋转90
                img.traps.rotation = 90;
                img.x = x;
                img.y = index == 0 ? y - (width * scale) : y - (width * scale) + width * scale * index;
            } else if (dir == Dir.RIGHT) { //右
                //旋转90
                img.traps.rotation = 90;
                img.x = x - 30 * scale;
                img.y = index == 0 ? y : y + width * scale * index;
            }
        }
        return arr;
    }
}