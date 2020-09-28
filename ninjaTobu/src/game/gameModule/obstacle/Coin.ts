// TypeScript file
class Coin extends eui.Component {
    public coin: eui.Image;
    public texture: string;
    public static cacheDict: Object = {};
    public constructor(texture) {
        super();
        this.skinName = "CoinSkin";
        this.texture = texture;
        this.coin.source = this.texture;
    }

    public createChildren() {
        super.createChildren();
    }

    public static produce(texture: string): Coin {
        let textureName: string = texture;
        if (Coin.cacheDict[textureName] == null)
            Coin.cacheDict[textureName] = [];
        var dict: Coin[] = Coin.cacheDict[textureName];
        var blockObject: Coin;
        if (dict.length > 0) {
            blockObject = dict.pop();
        } else {
            blockObject = new Coin(RES.getRes(textureName));
        }
        return blockObject;
    }

    public static reclain(coin: Coin) {
        var textureName: string = coin.texture;
        if (Coin.cacheDict[textureName] == null)
            Coin.cacheDict[textureName] = [];
        var dict: Coin[] = Coin.cacheDict[textureName];
        if (dict.indexOf(coin) == -1)
            dict.push(coin);
    }
}