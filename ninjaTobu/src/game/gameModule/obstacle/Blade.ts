class Blade extends eui.Component {

	public icon: eui.Image;
	public textrue: string;
	public static cacheDict: Object = {};
	private _data: TableNinjaLevel;
	public scale: number = 1;
	// public static bladeAarrt: Blade[] = [];
	private pzRect;

	public constructor(source: string) {
		super();
		this.skinName = "BladeSkin";
		this.textrue = source;
	}

	public createChildren() {
		super.createChildren();
		this.icon.source = this.textrue;
	}

	public static creat(data: TableNinjaLevel): Blade {
		let source: string = data.source;
		let blade: Blade = new Blade(source);
		blade.setData(data);
		Scene.trapsArray.push(blade);
		return blade;
	}
	private setData(data: TableNinjaLevel): void {
		this._data = data;
		let pos = (data.distance);
		this.icon.scaleX = this.icon.scaleY = data.scale;
		this.scale = data.scale;
		let offsetX: number = (this._data.width / 2);
		let offsetY: number = (this._data.height / 2);
		this.icon.anchorOffsetX = offsetX;
		this.icon.anchorOffsetY = offsetY;
		let tempX: number = pos[0][0];
		let tempY: number = pos[0][1];
		this.x = tempX;
		this.y = tempY;
		let dis;
		let time;
		if (pos[`length`] > 1) {
			dis = Math.sqrt(Math.pow(pos[1][0] - pos[0][0], 2) + Math.pow(pos[1][1] - pos[0][1], 2));
			time = dis / (data.velocity) * 60;
		}
		if (pos[`length`] == 2) {
			let tween: egret.Tween = egret.Tween.get(this, { loop: true });
			tween.to({ x: pos[1][0], y: pos[1][1] }, time).
				to({ x: tempX, y: tempY }, time);
		} else if (pos[`length`] == 3) {
			dis = Math.sqrt(Math.pow(pos[2][0] - pos[1][0], 2) + Math.pow(pos[2][1] - pos[1][1], 2));
			let time2 = dis / (data.velocity) * 60;
			dis = Math.sqrt(Math.pow(pos[0][0] - pos[2][0], 2) + Math.pow(pos[0][1] - pos[2][1], 2));
			let time3 = dis / (data.velocity) * 60;
			let tween: egret.Tween = egret.Tween.get(this, { loop: true });
			tween.to({ x: pos[1][0], y: pos[1][1] }, time).
				to({ x: pos[2][0], y: pos[2][1] }, time2).
				to({ x: tempX, y: tempY }, time3);
		} else if (pos[`length`] == 4) {
			dis = Math.sqrt(Math.pow(pos[2][0] - pos[1][0], 2) + Math.pow(pos[2][1] - pos[1][1], 2));
			let time2 = dis / (data.velocity) * 60;
			dis = Math.sqrt(Math.pow(pos[3][0] - pos[2][0], 2) + Math.pow(pos[3][1] - pos[2][1], 2));
			let time3 = dis / (data.velocity) * 60;
			let tween: egret.Tween = egret.Tween.get(this, { loop: true });
			tween.to({ x: pos[1][0], y: pos[1][1] }, time).
				to({ x: pos[2][0], y: pos[2][1] }, time2).
				to({ x: pos[3][0], y: pos[3][1] }, time3).
				to({ x: tempX, y: tempY }, time2);
		}

		if ((data.rotation)) {
			this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameRotaion, this);
		}
	}

	/**生产*/
	public static produce(source: string): Blade {
		let textureName: string = source;
		if (Blade.cacheDict[textureName] == null)
			Blade.cacheDict[textureName] = [];
		var dict: Blade[] = Blade.cacheDict[textureName];
		var blockObject: Blade;
		if (dict.length > 0) {
			blockObject = dict.pop();
		} else {
			blockObject = new Blade(textureName);
		}
		return blockObject;
	}
	/**回收*/
	public static reclaim(blockObject: Blade): void {
		var textureName: string = blockObject.textrue;
		if (Blade.cacheDict[textureName] == null)
		{ Blade.cacheDict[textureName] = []; }
		var dict: Blade[] = Blade.cacheDict[textureName];
		if (dict.indexOf(blockObject) == -1) {
			dict.push(blockObject);
		}
	}

	private onEnterFrameRotaion(): void {
		this.icon.rotation += (this._data.rotation) * Scene.factor;
	}
}