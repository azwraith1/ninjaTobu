// TypeScript file  尖刺类
class Spikes extends eui.Component {
    public traps: eui.Image;
    public static cacheDict: Object = {};
    public texture: string;
    public scale;

    public constructor(source?) {
        super();
        this.skinName = "SpikesSkin";
        this.texture = source;
        this.traps.source = this.texture;
    }

    /**生产*/
    public static produce(source: string): Spikes {
        let textureName: string = source;
        if (Spikes.cacheDict[textureName] == null)
            Spikes.cacheDict[textureName] = [];
        var dict: Spikes[] = Spikes.cacheDict[textureName];
        var blockObject: Spikes;
        if (dict.length > 0) {
            blockObject = dict.pop();
        } else {
            blockObject = new Spikes(textureName);
        }
        return blockObject;
    }
    /**回收*/
    public static reclaim(blockObject: Spikes): void {
        var textureName: string = blockObject.texture;
        if (Spikes.cacheDict[textureName] == null)
        { Spikes.cacheDict[textureName] = []; }
        var dict: Spikes[] = Spikes.cacheDict[textureName];
        if (dict.indexOf(blockObject) == -1) {
            blockObject.skewX = 0;
            blockObject.rotation = 0;
            dict.push(blockObject);
        }
    }
}