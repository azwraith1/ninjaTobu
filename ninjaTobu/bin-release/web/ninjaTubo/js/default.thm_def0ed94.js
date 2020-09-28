window.skins=window.skins||{};
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/assets/skin/common_skins/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/assets/skin/common_skins/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/assets/skin/common_skins/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/assets/skin/common_skins/eui_skins/HSliderSkin.exml","eui.Panel":"resource/assets/skin/common_skins/eui_skins/PanelSkin.exml","eui.TextInput":"resource/assets/skin/common_skins/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/assets/skin/common_skins/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/assets/skin/common_skins/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/assets/skin/common_skins/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/assets/skin/common_skins/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/assets/skin/common_skins/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/assets/skin/common_skins/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/assets/skin/common_skins/eui_skins/ItemRendererSkin.exml"};generateEUI.paths['resource/assets/skin/common_skins/CommonAlertSkin.exml'] = window.CommonAlertSkin = (function (_super) {
	__extends(CommonAlertSkin, _super);
	var CommonAlertSkin$Skin1 = 	(function (_super) {
		__extends(CommonAlertSkin$Skin1, _super);
		function CommonAlertSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","cancelPress_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = CommonAlertSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "cancelNormal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return CommonAlertSkin$Skin1;
	})(eui.Skin);

	var CommonAlertSkin$Skin2 = 	(function (_super) {
		__extends(CommonAlertSkin$Skin2, _super);
		function CommonAlertSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","confirmPress_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = CommonAlertSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "confirmNormal_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return CommonAlertSkin$Skin2;
	})(eui.Skin);

	var CommonAlertSkin$Skin3 = 	(function (_super) {
		__extends(CommonAlertSkin$Skin3, _super);
		function CommonAlertSkin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","confirmPressCountDown_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = CommonAlertSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "confirmNormalCountDown_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return CommonAlertSkin$Skin3;
	})(eui.Skin);

	function CommonAlertSkin() {
		_super.call(this);
		this.skinParts = ["bgRect","ui_text","btn_cancel","btn_affirm","btn_affirmCountDown","countDownLab","countDownIcon"];
		
		this.elementsContent = [this.bgRect_i(),this._Group1_i()];
	}
	var _proto = CommonAlertSkin.prototype;

	_proto.bgRect_i = function () {
		var t = new eui.Rect();
		this.bgRect = t;
		t.bottom = 0;
		t.fillAlpha = 0.35;
		t.fillColor = 0x000000;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 315;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 500;
		t.elementsContent = [this._Image1_i(),this.ui_text_i(),this.btn_cancel_i(),this.btn_affirm_i(),this.btn_affirmCountDown_i(),this.countDownLab_i(),this.countDownIcon_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "alertBG_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.ui_text_i = function () {
		var t = new eui.Label();
		this.ui_text = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 1;
		t.lineSpacing = 8;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 36;
		t.text = "正在为您自动重连中\n（如多次重连失败，请检查您的网络状况）";
		t.textAlign = "center";
		t.textColor = 0xcbdfff;
		t.verticalCenter = -34.5;
		t.width = 414;
		t.wordWrap = false;
		return t;
	};
	_proto.btn_cancel_i = function () {
		var t = new eui.Button();
		this.btn_cancel = t;
		t.label = "";
		t.x = 271;
		t.y = 230.32;
		t.skinName = CommonAlertSkin$Skin1;
		return t;
	};
	_proto.btn_affirm_i = function () {
		var t = new eui.Button();
		this.btn_affirm = t;
		t.label = "";
		t.x = 100;
		t.y = 230.32;
		t.skinName = CommonAlertSkin$Skin2;
		return t;
	};
	_proto.btn_affirmCountDown_i = function () {
		var t = new eui.Button();
		this.btn_affirmCountDown = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 225.32;
		t.skinName = CommonAlertSkin$Skin3;
		return t;
	};
	_proto.countDownLab_i = function () {
		var t = new eui.Label();
		this.countDownLab = t;
		t.bold = true;
		t.borderColor = 0x000000;
		t.fontFamily = "Microsoft YaHei";
		t.size = 13;
		t.text = "5";
		t.textColor = 0xc8ff59;
		t.x = 207.02;
		t.y = 282;
		return t;
	};
	_proto.countDownIcon_i = function () {
		var t = new eui.Image();
		this.countDownIcon = t;
		t.source = "confirmIcon_png";
		t.x = 217.84;
		t.y = 281.34;
		return t;
	};
	return CommonAlertSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/CountDownComponentSkin.exml'] = window.CountDownComponentSkin = (function (_super) {
	__extends(CountDownComponentSkin, _super);
	function CountDownComponentSkin() {
		_super.call(this);
		this.skinParts = ["countDownHintLab"];
		
		this.elementsContent = [this.countDownHintLab_i()];
	}
	var _proto = CountDownComponentSkin.prototype;

	_proto.countDownHintLab_i = function () {
		var t = new eui.Label();
		this.countDownHintLab = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 26;
		t.stroke = 2;
		t.strokeColor = 0x000000;
		t.text = "Auto selected after 10 secs";
		t.textColor = 0xcccccc;
		t.verticalCenter = 0;
		return t;
	};
	return CountDownComponentSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.currentState = "down";
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png"),
					new eui.SetProperty("_Image1","percentWidth",110),
					new eui.SetProperty("_Image1","percentHeight",110)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = [];
		
	}
	var _proto = ItemRendererSkin.prototype;

	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/common_skins/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/BladeSkin.exml'] = window.BladeSkin = (function (_super) {
	__extends(BladeSkin, _super);
	function BladeSkin() {
		_super.call(this);
		this.skinParts = ["icon"];
		
		this.height = 105;
		this.width = 106;
		this.elementsContent = [this.icon_i(),this._Rect1_i()];
	}
	var _proto = BladeSkin.prototype;

	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.anchorOffsetX = 53;
		t.anchorOffsetY = 52;
		t.horizontalCenter = 0;
		t.pixelHitTest = true;
		t.rotation = 0;
		t.source = "small_blade_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.visible = false;
		return t;
	};
	return BladeSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/BlockSkin.exml'] = window.BlockSkin = (function (_super) {
	__extends(BlockSkin, _super);
	function BlockSkin() {
		_super.call(this);
		this.skinParts = ["block"];
		
		this.elementsContent = [this.block_i()];
	}
	var _proto = BlockSkin.prototype;

	_proto.block_i = function () {
		var t = new eui.Image();
		this.block = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.rotation = 0;
		t.source = "2x1_png";
		t.top = 0;
		return t;
	};
	return BlockSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/BulletSkin.exml'] = window.BulletSkin = (function (_super) {
	__extends(BulletSkin, _super);
	function BulletSkin() {
		_super.call(this);
		this.skinParts = ["bullet"];
		
		this.elementsContent = [this.bullet_i()];
	}
	var _proto = BulletSkin.prototype;

	_proto.bullet_i = function () {
		var t = new eui.Image();
		this.bullet = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 57;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ninja_weapon5_png";
		t.verticalCenter = 0;
		return t;
	};
	return BulletSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/CoinSkin.exml'] = window.CoinSkin = (function (_super) {
	__extends(CoinSkin, _super);
	function CoinSkin() {
		_super.call(this);
		this.skinParts = ["coin","pzRect"];
		
		this.elementsContent = [this.coin_i(),this.pzRect_i()];
	}
	var _proto = CoinSkin.prototype;

	_proto.coin_i = function () {
		var t = new eui.Image();
		this.coin = t;
		t.horizontalCenter = 0;
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.source = "coin_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.pzRect_i = function () {
		var t = new eui.Rect();
		this.pzRect = t;
		t.bottom = 0;
		t.fillAlpha = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	return CoinSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/DamageSkin.exml'] = window.DamageSkin = (function (_super) {
	__extends(DamageSkin, _super);
	function DamageSkin() {
		_super.call(this);
		this.skinParts = ["damageLabel"];
		
		this.height = 22;
		this.width = 50;
		this.elementsContent = [this.damageLabel_i()];
	}
	var _proto = DamageSkin.prototype;

	_proto.damageLabel_i = function () {
		var t = new eui.Label();
		this.damageLabel = t;
		t.bold = true;
		t.fontFamily = "KaiTi_GB2312";
		t.height = 22;
		t.horizontalCenter = 0;
		t.italic = true;
		t.size = 22;
		t.text = "-1";
		t.textAlign = "center";
		t.textColor = 0xff0000;
		t.verticalCenter = 0;
		t.width = 50;
		return t;
	};
	return DamageSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/GoldBoxSkin.exml'] = window.GoldBoxSkin = (function (_super) {
	__extends(GoldBoxSkin, _super);
	function GoldBoxSkin() {
		_super.call(this);
		this.skinParts = ["box","lock","pzRect","leftBox","rightBox"];
		
		this.elementsContent = [this.box_i(),this.lock_i(),this.pzRect_i(),this.leftBox_i(),this.rightBox_i()];
	}
	var _proto = GoldBoxSkin.prototype;

	_proto.box_i = function () {
		var t = new eui.Image();
		this.box = t;
		t.anchorOffsetX = 215;
		t.anchorOffsetY = 191;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.source = "gold_chest_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.lock_i = function () {
		var t = new eui.Image();
		this.lock = t;
		t.horizontalCenter = 0;
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.source = "gold_lock_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.pzRect_i = function () {
		var t = new eui.Rect();
		this.pzRect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0;
		t.height = 84.67;
		t.horizontalCenter = 1;
		t.verticalCenter = -2.5;
		t.width = 135.73;
		return t;
	};
	_proto.leftBox_i = function () {
		var t = new eui.Image();
		this.leftBox = t;
		t.anchorOffsetX = 215;
		t.anchorOffsetY = 191;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.source = "gold_chest_half1_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.rightBox_i = function () {
		var t = new eui.Image();
		this.rightBox = t;
		t.anchorOffsetX = 215;
		t.anchorOffsetY = 191;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.source = "gold_chest_half2_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	return GoldBoxSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/LeafSkin.exml'] = window.LeafSkin = (function (_super) {
	__extends(LeafSkin, _super);
	function LeafSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 300;
		this.width = 400;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = LeafSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "leaves_png";
		t.x = 104;
		t.y = 40;
		return t;
	};
	return LeafSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/PlayerBulletSkin.exml'] = window.PlayerBulletSkin = (function (_super) {
	__extends(PlayerBulletSkin, _super);
	function PlayerBulletSkin() {
		_super.call(this);
		this.skinParts = ["bulletGroup","dartlabel"];
		
		this.height = 50;
		this.width = 560;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = PlayerBulletSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.elementsContent = [this.bulletGroup_i(),this._Image1_i(),this.dartlabel_i()];
		return t;
	};
	_proto.bulletGroup_i = function () {
		var t = new eui.Group();
		this.bulletGroup = t;
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.right = 0;
		t.top = 0;
		t.width = 420;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnWidth = 42;
		t.horizontalAlign = "left";
		t.horizontalGap = 0;
		t.orientation = "rows";
		t.requestedColumnCount = 10;
		t.requestedRowCount = 1;
		t.rowHeight = 50;
		t.verticalAlign = "justify";
		t.verticalGap = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "ninja_weapon1_png";
		t.verticalCenter = 0;
		t.x = 13.5;
		return t;
	};
	_proto.dartlabel_i = function () {
		var t = new eui.Label();
		this.dartlabel = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.fontFamily = "KaiTi";
		t.italic = true;
		t.text = "X 0";
		t.textColor = 0x7f191d;
		t.verticalCenter = 0;
		t.width = 74;
		t.x = 70;
		return t;
	};
	return PlayerBulletSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/PlayerHpSkin.exml'] = window.PlayerHpSkin = (function (_super) {
	__extends(PlayerHpSkin, _super);
	function PlayerHpSkin() {
		_super.call(this);
		this.skinParts = ["hpBar"];
		
		this.height = 5;
		this.elementsContent = [this._Rect1_i(),this.hpBar_i()];
	}
	var _proto = PlayerHpSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0;
		t.height = 5;
		t.horizontalCenter = 0;
		t.strokeAlpha = 1;
		t.strokeColor = 0x000000;
		t.verticalCenter = 0;
		t.width = 50;
		return t;
	};
	_proto.hpBar_i = function () {
		var t = new eui.Rect();
		this.hpBar = t;
		t.fillColor = 0x88ff07;
		t.height = 5;
		t.left = 0;
		t.verticalCenter = 0;
		t.width = 50;
		return t;
	};
	return PlayerHpSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/PlayerIconSkin.exml'] = window.PlayerIconSkin = (function (_super) {
	__extends(PlayerIconSkin, _super);
	function PlayerIconSkin() {
		_super.call(this);
		this.skinParts = ["role","roleRect","hp"];
		
		this.height = 91;
		this.width = 59;
		this.elementsContent = [this.role_i(),this.roleRect_i(),this.hp_i()];
	}
	var _proto = PlayerIconSkin.prototype;

	_proto.role_i = function () {
		var t = new eui.Image();
		this.role = t;
		t.horizontalCenter = 0;
		t.pixelHitTest = true;
		t.rotation = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "playerActionStand_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.roleRect_i = function () {
		var t = new eui.Rect();
		this.roleRect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0;
		t.height = 81.17;
		t.width = 24.64;
		t.x = 23;
		t.y = 17;
		return t;
	};
	_proto.hp_i = function () {
		var t = new PlayerHp();
		this.hp = t;
		t.height = 5;
		t.horizontalCenter = 0.5;
		t.skinName = "PlayerHpSkin";
		t.width = 50;
		t.y = 0.8;
		return t;
	};
	return PlayerIconSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/PoleSkin.exml'] = window.PoleSkin = (function (_super) {
	__extends(PoleSkin, _super);
	function PoleSkin() {
		_super.call(this);
		this.skinParts = ["img"];
		
		this.elementsContent = [this.img_i()];
	}
	var _proto = PoleSkin.prototype;

	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.source = "blade_rail_png";
		return t;
	};
	return PoleSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/scene.exml'] = window.scene = (function (_super) {
	__extends(scene, _super);
	function scene() {
		_super.call(this);
		this.skinParts = ["sun","group","goldmodel","levelmodel","killmodel","menuGroup","scoreLable","maxScore","scoreGroup","playerDarts","maskRect1","maskRect"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this.sun_i(),this.group_i(),this.menuGroup_i(),this.scoreGroup_i(),this.playerDarts_i(),this.maskRect1_i(),this.maskRect_i()];
	}
	var _proto = scene.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1334;
		t.horizontalCenter = 0;
		t.source = "bg-test_png";
		t.verticalCenter = 0;
		t.width = 750;
		return t;
	};
	_proto.sun_i = function () {
		var t = new eui.Image();
		this.sun = t;
		t.source = "sun_png";
		t.x = 360;
		t.y = 340;
		return t;
	};
	_proto.group_i = function () {
		var t = new eui.Group();
		this.group = t;
		t.height = 1334;
		t.horizontalCenter = 0;
		t.width = 750;
		t.y = 0;
		return t;
	};
	_proto.menuGroup_i = function () {
		var t = new eui.Group();
		this.menuGroup = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this.goldmodel_i(),this._Label1_i(),this.levelmodel_i(),this._Label2_i(),this.killmodel_i(),this._Label3_i()];
		return t;
	};
	_proto.goldmodel_i = function () {
		var t = new eui.Image();
		this.goldmodel = t;
		t.anchorOffsetX = 0;
		t.height = 80;
		t.horizontalCenter = 0.5;
		t.scale9Grid = new egret.Rectangle(8,8,48,48);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "restartbg_png";
		t.width = 345;
		t.x = 203;
		t.y = 611;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "金币模式";
		t.touchEnabled = false;
		t.x = 315;
		t.y = 634.37;
		return t;
	};
	_proto.levelmodel_i = function () {
		var t = new eui.Image();
		this.levelmodel = t;
		t.anchorOffsetX = 0;
		t.height = 80;
		t.horizontalCenter = 0.5;
		t.scale9Grid = new egret.Rectangle(8,8,48,48);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "restartbg_png";
		t.width = 345;
		t.x = 203;
		t.y = 715;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "关卡模式";
		t.touchEnabled = false;
		t.x = 315;
		t.y = 741.04;
		return t;
	};
	_proto.killmodel_i = function () {
		var t = new eui.Image();
		this.killmodel = t;
		t.anchorOffsetX = 0;
		t.height = 80;
		t.horizontalCenter = 0.5;
		t.scale9Grid = new egret.Rectangle(8,8,48,48);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "restartbg_png";
		t.width = 345;
		t.x = 203;
		t.y = 825;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "无尽模式";
		t.touchEnabled = false;
		t.x = 315;
		t.y = 849.03;
		return t;
	};
	_proto.scoreGroup_i = function () {
		var t = new eui.Group();
		this.scoreGroup = t;
		t.anchorOffsetY = 0;
		t.height = 59;
		t.left = 0;
		t.right = 0;
		t.top = 15;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.scoreLable_i(),this.maxScore_i(),this._Label4_i(),this._Label5_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.scoreLable_i = function () {
		var t = new eui.Label();
		this.scoreLable = t;
		t.fontFamily = "KaiTi";
		t.left = 305;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "0";
		t.textAlign = "center";
		t.top = 15;
		t.x = 209;
		t.y = 0;
		return t;
	};
	_proto.maxScore_i = function () {
		var t = new eui.Label();
		this.maxScore = t;
		t.fontFamily = "KaiTi";
		t.left = 514;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "0";
		t.textAlign = "center";
		t.top = 15;
		t.x = 418;
		t.y = 0;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.fontFamily = "KaiTi";
		t.left = 232;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "分数";
		t.textAlign = "center";
		t.top = 15;
		t.x = 136;
		t.y = 0;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.fontFamily = "KaiTi";
		t.left = 411;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "最高分";
		t.top = 15;
		t.x = 315;
		t.y = 0;
		return t;
	};
	_proto.playerDarts_i = function () {
		var t = new PlayerDarts();
		this.playerDarts = t;
		t.height = 50;
		t.horizontalCenter = 0;
		t.skinName = "PlayerBulletSkin";
		t.touchEnabled = false;
		t.width = 560;
		t.y = 59;
		return t;
	};
	_proto.maskRect1_i = function () {
		var t = new eui.Rect();
		this.maskRect1 = t;
		t.bottom = 0;
		t.fillAlpha = 0.1;
		t.fillColor = 0xF4F3DE;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchEnabled = false;
		return t;
	};
	_proto.maskRect_i = function () {
		var t = new eui.Rect();
		this.maskRect = t;
		t.bottom = 0;
		t.fillAlpha = 0;
		t.fillColor = 0x000000;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchEnabled = false;
		return t;
	};
	return scene;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/SoldierSkin.exml'] = window.SoldierSkin = (function (_super) {
	__extends(SoldierSkin, _super);
	function SoldierSkin() {
		_super.call(this);
		this.skinParts = ["enemy","pzRect","lightImg","exclamImg","sniperbody","hp","poisonText","sniperHead","headGroup","lightImg2","lightGroup"];
		
		this.currentState = "scale1";
		this.height = 150;
		this.width = 100;
		this.elementsContent = [this.enemy_i(),this.pzRect_i(),this.lightImg_i(),this.exclamImg_i(),this.sniperbody_i(),this.hp_i(),this.poisonText_i(),this.headGroup_i(),this.lightGroup_i()];
		this.states = [
			new eui.State ("scale1",
				[
					new eui.SetProperty("enemy","horizontalCenter",0),
					new eui.SetProperty("exclamImg","visible",false),
					new eui.SetProperty("sniperHead","rotation",0),
					new eui.SetProperty("headGroup","rotation",0),
					new eui.SetProperty("headGroup","x",29),
					new eui.SetProperty("headGroup","y",33),
					new eui.SetProperty("headGroup","verticalCenter",-15),
					new eui.SetProperty("lightImg2","rotation",0),
					new eui.SetProperty("lightGroup","rotation",0),
					new eui.SetProperty("lightGroup","verticalCenter",-8),
					new eui.SetProperty("lightGroup","x",29.67),
					new eui.SetProperty("","width",150)
				])
			,
			new eui.State ("scale2",
				[
					new eui.SetProperty("enemy","scaleX",-1),
					new eui.SetProperty("enemy","horizontalCenter",0),
					new eui.SetProperty("pzRect","width",60),
					new eui.SetProperty("pzRect","height",160),
					new eui.SetProperty("lightImg","scaleX",0.5),
					new eui.SetProperty("lightImg","x",7.01),
					new eui.SetProperty("exclamImg","visible",false),
					new eui.SetProperty("sniperbody","scaleX",-1),
					new eui.SetProperty("sniperbody","horizontalCenter",-35),
					new eui.SetProperty("sniperbody","visible",false),
					new eui.SetProperty("sniperHead","scaleX",-1),
					new eui.SetProperty("sniperHead","x",24.5),
					new eui.SetProperty("sniperHead","rotation",0),
					new eui.SetProperty("sniperHead","horizontalCenter",-20.5),
					new eui.SetProperty("sniperHead","verticalCenter",-5.5),
					new eui.SetProperty("sniperHead","visible",false),
					new eui.SetProperty("headGroup","verticalCenter",-11),
					new eui.SetProperty("headGroup","x",43),
					new eui.SetProperty("headGroup","rotation",0),
					new eui.SetProperty("lightImg2","scaleX",-1),
					new eui.SetProperty("lightImg2","x",-59),
					new eui.SetProperty("lightGroup","scaleX",-1),
					new eui.SetProperty("lightGroup","rotation",0),
					new eui.SetProperty("lightGroup","horizontalCenter",6.5),
					new eui.SetProperty("lightGroup","verticalCenter",-8),
					new eui.SetProperty("","width",150)
				])
		];
	}
	var _proto = SoldierSkin.prototype;

	_proto.enemy_i = function () {
		var t = new eui.Image();
		this.enemy = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.source = "ranged_enemy_idle_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.pzRect_i = function () {
		var t = new eui.Rect();
		this.pzRect = t;
		t.anchorOffsetX = 0;
		t.fillAlpha = 0;
		t.height = 150;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 100;
		return t;
	};
	_proto.lightImg_i = function () {
		var t = new eui.Image();
		this.lightImg = t;
		t.anchorOffsetX = 65.5;
		t.anchorOffsetY = 51;
		t.scaleX = -0.5;
		t.scaleY = 0.5;
		t.source = "enemy_visioncone_png";
		t.visible = false;
		t.x = 64;
		t.y = 19;
		return t;
	};
	_proto.exclamImg_i = function () {
		var t = new eui.Image();
		this.exclamImg = t;
		t.source = "ranged_enemy_alerted_png";
		t.visible = false;
		t.x = 6.5;
		t.y = -59;
		return t;
	};
	_proto.sniperbody_i = function () {
		var t = new eui.Image();
		this.sniperbody = t;
		t.horizontalCenter = 13;
		t.source = "sniper_body_png";
		t.visible = false;
		t.y = 39.5;
		return t;
	};
	_proto.hp_i = function () {
		var t = new PlayerHp();
		this.hp = t;
		t.height = 5;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.skinName = "PlayerHpSkin";
		t.width = 50;
		t.y = 0;
		return t;
	};
	_proto.poisonText_i = function () {
		var t = new eui.Label();
		this.poisonText = t;
		t.horizontalCenter = 31;
		t.size = 16;
		t.text = "nmb下毒啊你！";
		t.textColor = 0x01f900;
		t.visible = false;
		t.y = 44.5;
		return t;
	};
	_proto.headGroup_i = function () {
		var t = new eui.Group();
		this.headGroup = t;
		t.anchorOffsetX = 15;
		t.anchorOffsetY = 15;
		t.height = 30;
		t.horizontalCenter = -14;
		t.rotation = 0;
		t.width = 30;
		t.y = 60;
		t.elementsContent = [this.sniperHead_i()];
		return t;
	};
	_proto.sniperHead_i = function () {
		var t = new eui.Image();
		this.sniperHead = t;
		t.anchorOffsetX = 88;
		t.anchorOffsetY = 39;
		t.horizontalCenter = 20;
		t.rotation = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "ranged_enemy_head_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.lightGroup_i = function () {
		var t = new eui.Group();
		this.lightGroup = t;
		t.anchorOffsetX = 215;
		t.anchorOffsetY = 100;
		t.height = 200;
		t.horizontalCenter = -50;
		t.rotation = 0;
		t.width = 430;
		t.y = 77;
		t.elementsContent = [this.lightImg2_i()];
		return t;
	};
	_proto.lightImg2_i = function () {
		var t = new eui.Image();
		this.lightImg2 = t;
		t.anchorOffsetX = 65.5;
		t.anchorOffsetY = 51;
		t.horizontalCenter = 90.5;
		t.rotation = 0;
		t.scaleX = -1;
		t.scaleY = 1;
		t.source = "enemy_visioncone_png";
		t.verticalCenter = -6;
		t.visible = false;
		return t;
	};
	return SoldierSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/SpikesSkin.exml'] = window.SpikesSkin = (function (_super) {
	__extends(SpikesSkin, _super);
	function SpikesSkin() {
		_super.call(this);
		this.skinParts = ["traps"];
		
		this.elementsContent = [this.traps_i()];
	}
	var _proto = SpikesSkin.prototype;

	_proto.traps_i = function () {
		var t = new eui.Image();
		this.traps = t;
		t.anchorOffsetX = 50;
		t.anchorOffsetY = 15;
		t.horizontalCenter = 0;
		t.pixelHitTest = true;
		t.rotation = 0;
		t.scaleX = 1;
		t.skewX = 0;
		t.source = "spikes_png";
		t.verticalCenter = 0;
		return t;
	};
	return SpikesSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/game/SwingBladeSkin.exml'] = window.SwingBladeSkin = (function (_super) {
	__extends(SwingBladeSkin, _super);
	function SwingBladeSkin() {
		_super.call(this);
		this.skinParts = ["pole","axle"];
		
		this.elementsContent = [this.pole_i(),this.axle_i()];
	}
	var _proto = SwingBladeSkin.prototype;

	_proto.pole_i = function () {
		var t = new eui.Image();
		this.pole = t;
		t.anchorOffsetY = 16;
		t.rotation = 0;
		t.source = "blade_rail_png";
		t.x = 25.5;
		t.y = 25.5;
		return t;
	};
	_proto.axle_i = function () {
		var t = new eui.Image();
		this.axle = t;
		t.source = "rail_hinge_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return SwingBladeSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/restart/ResetButtonSkin.exml'] = window.ResetButtonSkin = (function (_super) {
	__extends(ResetButtonSkin, _super);
	function ResetButtonSkin() {
		_super.call(this);
		this.skinParts = ["ima","text"];
		
		this.width = 126;
		this.elementsContent = [this._Rect1_i(),this.ima_i(),this.text_i()];
	}
	var _proto = ResetButtonSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.fillColor = 0x2b2b2b;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.ima_i = function () {
		var t = new eui.Image();
		this.ima = t;
		t.left = 10;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "tobu_icons_4_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.text_i = function () {
		var t = new eui.Label();
		this.text = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "NSimSun";
		t.text = "重试";
		t.verticalCenter = 0;
		t.width = 64.4;
		t.x = 58.6;
		return t;
	};
	return ResetButtonSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/restart/RestartGameSkin.exml'] = window.RestartGameSkin = (function (_super) {
	__extends(RestartGameSkin, _super);
	var RestartGameSkin$Skin4 = 	(function (_super) {
		__extends(RestartGameSkin$Skin4, _super);
		function RestartGameSkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RestartGameSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "tobu_icons_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RestartGameSkin$Skin4;
	})(eui.Skin);

	var RestartGameSkin$Skin5 = 	(function (_super) {
		__extends(RestartGameSkin$Skin5, _super);
		function RestartGameSkin$Skin5() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = RestartGameSkin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "tobu_icons_4_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return RestartGameSkin$Skin5;
	})(eui.Skin);

	function RestartGameSkin() {
		_super.call(this);
		this.skinParts = ["homeBtn","restartBtn","maskRect","nextBtn","home","restart"];
		
		this.currentState = "failed";
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Rect1_i(),this._Image1_i(),this.maskRect_i()];
		this._Image2_i();
		
		this._Image3_i();
		
		this.homeBtn_i();
		
		this.restartBtn_i();
		
		this._Image4_i();
		
		this.nextBtn_i();
		
		this._Label2_i();
		
		this.home_i();
		
		this._Label3_i();
		
		this.restart_i();
		
		this.states = [
			new eui.State ("pass",
				[
					new eui.AddItems("_Image4","nextBtn",0,""),
					new eui.AddItems("nextBtn","",1,""),
					new eui.AddItems("_Label2","home",1,""),
					new eui.AddItems("home","",1,""),
					new eui.AddItems("_Label3","restart",1,""),
					new eui.AddItems("restart","",1,""),
					new eui.SetProperty("_Rect1","fillAlpha",0),
					new eui.SetProperty("_Image1","width",216),
					new eui.SetProperty("_Image1","horizontalCenter",0),
					new eui.SetProperty("_Image1","height",240),
					new eui.SetProperty("_Image1","verticalCenter",0),
					new eui.SetProperty("maskRect","touchEnabled",false),
					new eui.SetProperty("maskRect","fillAlpha",1)
				])
			,
			new eui.State ("failed",
				[
					new eui.AddItems("_Image2","",2,"maskRect"),
					new eui.AddItems("_Image3","",2,"maskRect"),
					new eui.AddItems("homeBtn","",2,"maskRect"),
					new eui.AddItems("restartBtn","",2,"maskRect"),
					new eui.SetProperty("_Rect1","fillAlpha",0),
					new eui.SetProperty("_Image1","horizontalCenter",0),
					new eui.SetProperty("_Image1","y",503.79),
					new eui.SetProperty("maskRect","fillAlpha",1)
				])
		];
	}
	var _proto = RestartGameSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.bottom = 0;
		t.fillAlpha = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 146;
		t.scale9Grid = new egret.Rectangle(8,8,48,48);
		t.source = "restartbg_png";
		t.width = 144;
		t.x = 303;
		t.y = 594;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -50;
		t.source = "restartbg_png";
		t.verticalCenter = 85;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 50;
		t.source = "restartbg_png";
		t.verticalCenter = 85;
		return t;
	};
	_proto.homeBtn_i = function () {
		var t = new eui.Button();
		this.homeBtn = t;
		t.horizontalCenter = -49.5;
		t.label = "";
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.verticalCenter = 84;
		t.skinName = RestartGameSkin$Skin4;
		return t;
	};
	_proto.restartBtn_i = function () {
		var t = new eui.Button();
		this.restartBtn = t;
		t.horizontalCenter = 49.5;
		t.label = "";
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.verticalCenter = 84;
		t.skinName = RestartGameSkin$Skin5;
		return t;
	};
	_proto.maskRect_i = function () {
		var t = new eui.Rect();
		this.maskRect = t;
		t.alpha = 0;
		t.bottom = 0;
		t.fillAlpha = 1;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchEnabled = false;
		return t;
	};
	_proto.nextBtn_i = function () {
		var t = new eui.Group();
		this.nextBtn = t;
		t.anchorOffsetY = 0;
		t.height = 45;
		t.horizontalCenter = 0;
		t.width = 200;
		t.y = 578;
		t.elementsContent = [this._Label1_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "tobu_icons_2_png";
		t.verticalCenter = 0.5;
		t.x = 12;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.fontFamily = "KaiTi";
		t.text = "下一关";
		t.textAlign = "center";
		t.width = 133;
		t.x = 56;
		t.y = 9;
		return t;
	};
	_proto.home_i = function () {
		var t = new eui.Group();
		this.home = t;
		t.anchorOffsetY = 0;
		t.height = 45;
		t.width = 200;
		t.x = 276;
		t.y = 642;
		t.elementsContent = [this._Image5_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "tobu_icons_1_png";
		t.verticalCenter = 0;
		t.x = 9;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "KaiTi";
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "主菜单";
		t.textAlign = "center";
		t.width = 133;
		t.x = 56;
		t.y = 8;
		return t;
	};
	_proto.restart_i = function () {
		var t = new eui.Group();
		this.restart = t;
		t.anchorOffsetY = 0;
		t.height = 45;
		t.horizontalCenter = 0;
		t.width = 200;
		t.y = 708;
		t.elementsContent = [this._Image6_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "tobu_icons_4_png";
		t.verticalCenter = 0.5;
		t.x = 14;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		this._Label3 = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "KaiTi";
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "重新来";
		t.textAlign = "center";
		t.width = 133;
		t.x = 56;
		t.y = 8;
		return t;
	};
	return RestartGameSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/select/SelectItemSkin.exml'] = window.SelectItemSkin = (function (_super) {
	__extends(SelectItemSkin, _super);
	function SelectItemSkin() {
		_super.call(this);
		this.skinParts = ["icon","txt"];
		
		this.height = 200;
		this.width = 200;
		this.elementsContent = [this.icon_i(),this.txt_i()];
	}
	var _proto = SelectItemSkin.prototype;

	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.height = 100;
		t.horizontalCenter = 0;
		t.source = "ninja_weapon3_png";
		t.top = 0;
		t.width = 100;
		return t;
	};
	_proto.txt_i = function () {
		var t = new eui.Label();
		this.txt = t;
		t.fontFamily = "KaiTi";
		t.horizontalCenter = 0;
		t.size = 22;
		t.text = "多重射击";
		t.y = 135.34;
		return t;
	};
	return SelectItemSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/select/SelectSceneSkin.exml'] = window.SelectSceneSkin = (function (_super) {
	__extends(SelectSceneSkin, _super);
	function SelectSceneSkin() {
		_super.call(this);
		this.skinParts = ["titleText","weaponGroup","weaponScroller"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this._Group1_i()];
	}
	var _proto = SelectSceneSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.alpha = 0.5;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "bg-test_png";
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this.titleText_i(),this.weaponScroller_i()];
		return t;
	};
	_proto.titleText_i = function () {
		var t = new eui.Label();
		this.titleText = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "KaiTi";
		t.height = 48.18;
		t.horizontalCenter = 0.5;
		t.size = 42;
		t.text = "武器选择";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 246.73;
		t.y = 420.67;
		return t;
	};
	_proto.weaponScroller_i = function () {
		var t = new eui.Scroller();
		this.weaponScroller = t;
		t.bounces = false;
		t.height = 200;
		t.horizontalCenter = 0;
		t.scrollPolicyV = "off";
		t.touchChildren = true;
		t.touchEnabled = true;
		t.verticalCenter = -27;
		t.width = 600;
		t.viewport = this.weaponGroup_i();
		return t;
	};
	_proto.weaponGroup_i = function () {
		var t = new eui.Group();
		this.weaponGroup = t;
		t.touchChildren = true;
		t.touchEnabled = true;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnWidth = 200;
		t.horizontalAlign = "center";
		t.horizontalGap = 0;
		t.orientation = "rows";
		t.requestedRowCount = 1;
		t.rowAlign = "justifyUsingHeight";
		t.rowHeight = 200;
		t.verticalAlign = "middle";
		t.verticalGap = 0;
		return t;
	};
	return SelectSceneSkin;
})(eui.Skin);generateEUI.paths['resource/assets/skin/game_skins/select/WeaponSkin.exml'] = window.WeaponSkin = (function (_super) {
	__extends(WeaponSkin, _super);
	function WeaponSkin() {
		_super.call(this);
		this.skinParts = ["weapon"];
		
		this.height = 200;
		this.width = 100;
		this.elementsContent = [this.weapon_i()];
	}
	var _proto = WeaponSkin.prototype;

	_proto.weapon_i = function () {
		var t = new eui.Image();
		this.weapon = t;
		t.horizontalCenter = 0;
		t.source = "ninja_weapon5_png";
		t.verticalCenter = 0;
		return t;
	};
	return WeaponSkin;
})(eui.Skin);