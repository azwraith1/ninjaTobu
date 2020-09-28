//砖块
class Brick extends eui.Component {

	private _img: eui.Image;

	public constructor(source: string) {
		super();
		this._img = new eui.Image(source);
		this.addChild(this._img);
	}
}