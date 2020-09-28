var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 常用的游戏内的工具类（不对应某个特定游戏）
 */
var CommonUtil = (function () {
    function CommonUtil() {
    }
    //数字发生改变时，先消失，再渐现
    CommonUtil.valueFadeTween = function (displayObj, bRemoveTween) {
        if (bRemoveTween === void 0) { bRemoveTween = true; }
        if (bRemoveTween) {
            egret.Tween.removeTweens(displayObj);
        }
        displayObj.alpha = 0;
        egret.Tween.get(displayObj).to({ alpha: 1 }, 1000).call(function () {
            if (bRemoveTween) {
                egret.Tween.removeTweens(this);
            }
        }, displayObj);
    };
    //放大消失的动画(bAppear：出现还是消失)
    CommonUtil.scaleFadeTween = function (displayObj, bAppear, bRemoveTween) {
        if (bRemoveTween === void 0) { bRemoveTween = true; }
        if (bRemoveTween) {
            egret.Tween.removeTweens(displayObj);
        }
        var scaleCoefficient = displayObj.scaleX - 1;
        var startScale = 0.68 + scaleCoefficient;
        displayObj.scaleX = displayObj.scaleY = startScale;
    };
    //超过10万 会对值/1000 向上取整
    CommonUtil.valueFormat1000 = function (value) {
        if (value >= 1000000) {
            return Math.ceil(value / 1000000) + "M";
        }
        else if (value >= 1000) {
            return Math.ceil(value / 1000) + "K";
        }
        else {
            return this.valueFormatDecimals(value, 2) + "";
        }
    };
    //保留小数点后两位（但如果保留后和整数一样，则返回整数，如：1.01返回1.01 ， 1.001返回1,而不是返回1.00, 1.10返回1.1）
    CommonUtil.valueFormatDecimals = function (value, decimals) {
        //因为编译后value有可能传进来的是string
        value = +value;
        if (!value)
            return value;
        if (decimals == 0)
            return +value.toFixed(0);
        var preNum = null;
        var nextNum = null;
        for (var i = decimals; i >= 0; i--) {
            nextNum = value.toFixed(i);
            if (!preNum) {
                preNum = nextNum;
                continue;
            }
            if (nextNum != preNum) {
                return +preNum;
            }
        }
        return value;
    };
    CommonUtil.loadTextureFromUrl = function (url, onLoadComplete, thisObj, tag) {
        if (tag === void 0) { tag = ""; }
        var loader = new egret.URLLoader();
        loader["tag"] = tag;
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        loader.addEventListener(egret.Event.COMPLETE, onLoadComplete, thisObj);
        var request = new egret.URLRequest(url);
        loader.load(request);
    };
    //获取url的参数
    CommonUtil.getAllParam = function (key) {
        if (key === void 0) { key = null; }
        if (egret.Capabilities.runtimeType != egret.RuntimeType.WEB)
            return {};
        var url = location.search;
        url = decodeURIComponent(url);
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                var tmpStrs = strs[i].split("=");
                if (tmpStrs.length > 2) {
                    var string = strs[i].split(tmpStrs[0] + "=");
                    theRequest[tmpStrs[0]] = string[1];
                }
                else {
                    theRequest[tmpStrs[0]] = tmpStrs[1];
                }
            }
        }
        if (key) {
            return theRequest[key];
        }
        else {
            return theRequest;
        }
    };
    //根据字符串获取相加后的unicode码
    CommonUtil.getStringUnicode = function (str) {
        var code = 0;
        for (var i = 0; i < str.length; i++) {
            code += str.charCodeAt(i);
        }
        return code;
    };
    //获得min和maxInclud之间的随机整数（包括minInclud，maxInclud）
    CommonUtil.randomInteger = function (minInclude, maxInclude, bInteger) {
        if (bInteger === void 0) { bInteger = true; }
        if (bInteger) {
            return parseInt(Math.random() * (maxInclude - minInclude + 1) + minInclude);
        }
        else {
            var Range = maxInclude - minInclude;
            var Rand = Math.random();
            var num = minInclude + Rand * Range;
            return num;
        }
    };
    //json to url
    CommonUtil.json2url = function (json) {
        var arr = [];
        for (var name in json) {
            arr.push(name + '=' + json[name]);
        }
        return arr.join('&');
    };
    //是否是数组
    CommonUtil.isArray = function (obj) {
        return Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Array]';
    };
    //是否是数字 
    CommonUtil.isNumber = function (value) {
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除  
        if (value === "" || value == null)
            return false;
        value += ""; //转换为字符串,否则直接传number类型进来,indexOf会报错
        if (value.indexOf(" ") >= 0 || value.indexOf("+") >= 0 || value.indexOf("-") >= 0)
            return false;
        if (!isNaN(value)) {
            return true;
        }
        else {
            return false;
        }
    };
    //copy文本到系统剪贴板
    CommonUtil.copy2Clipboard = function (text) {
        var input = document.createElement("input");
        input.value = text;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length);
        document.execCommand('Copy');
        document.body.removeChild(input);
        window.alert(Game.getLanguage("copy2Clipboard succuss"));
    };
    //打印带时间的日志
    CommonUtil.log = function (str, bTime) {
        if (bTime === void 0) { bTime = false; }
        if (bTime) {
            var timeStr = (egret.getTimer() / 1000).toFixed(2);
            egret.log("日志时间：" + timeStr + "     " + str);
        }
        else {
            egret.log(str);
        }
    };
    //动态创建动画,并添加到指定显示容器(即:使用时才加载资源到内存,并创建)
    CommonUtil.createAnimation = function (animationName, completeFun, funThisObj) {
        if (completeFun === void 0) { completeFun = null; }
        if (funThisObj === void 0) { funThisObj = null; }
        if (!dragonBones.EgretFactory.factory.getDragonBonesData(animationName)) {
            var dragonBonesData = RES.getRes(animationName + "_ske_json");
            if (!dragonBonesData) {
                egret.warn("createAnimation failure, dragonBonesData is null! animationName=" + animationName);
                return null;
            }
            dragonBones.EgretFactory.factory.parseDragonBonesData(dragonBonesData);
        }
        if (!dragonBones.EgretFactory.factory.getTextureAtlasData(animationName)) {
            var textureAtlasData = RES.getRes(animationName + "_tex_json");
            if (!textureAtlasData) {
                egret.warn("createAnimation failure, textureAtlasData is null! animationName=" + animationName);
                return null;
            }
            var textureData = RES.getRes(animationName + "_tex_png");
            if (!textureData) {
                egret.warn("createAnimation failure, textureData is null! animationName=" + animationName);
                return null;
            }
            dragonBones.EgretFactory.factory.parseTextureAtlasData(textureAtlasData, textureData);
        }
        var armature = dragonBones.EgretFactory.factory.buildArmatureDisplay(animationName);
        if (armature) {
            if (completeFun) {
                armature.addEventListener(dragonBones.EventObject.COMPLETE, completeFun, funThisObj);
            }
            var dynamicArmatureKey = animationName + "_" + armature.hashCode;
            CommonUtil.dynamicArmatureDisplay[dynamicArmatureKey] = new DynamicArmatureInfo(armature, completeFun, funThisObj);
        }
        return armature;
    };
    //释放动画资源
    CommonUtil.disposeAnimationRes = function (armatureDisplay) {
        if (!armatureDisplay)
            return;
        var dynamicArmatureKey = armatureDisplay.armature.name + "_" + armatureDisplay.hashCode;
        var dynamicArmatureInfo = CommonUtil.dynamicArmatureDisplay[dynamicArmatureKey];
        if (dynamicArmatureInfo) {
            armatureDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, dynamicArmatureInfo.completeFun, dynamicArmatureInfo.funThisObj);
            delete CommonUtil.dynamicArmatureDisplay[dynamicArmatureKey];
        }
        else {
            egret.warn("disposeAnimationRes! dynamicArmatureInfo is null, armatureName: " + dynamicArmatureKey);
        }
        dragonBones.EgretFactory.factory.removeDragonBonesData(armatureDisplay.armature.name, false);
        dragonBones.EgretFactory.factory.removeTextureAtlasData(armatureDisplay.armature.name, false);
        armatureDisplay.parent.removeChild(armatureDisplay);
        armatureDisplay.dispose();
    };
    //获得两点和水平位置
    CommonUtil.getAngle = function (x1, y1, x2, y2) {
        var x = x1 - x2, y = y1 - y2;
        if (!x && !y) {
            return 0;
        }
        var angle = (180 + Math.atan2(-y, -x) * 180 / Math.PI + 360) % 360;
        return angle + 270;
    };
    //获得两点之间距离
    CommonUtil.getDistance = function (x1, y1, x2, y2) {
        var jumpDisX = x1 - x2;
        var jumpDisY = y1 - y2;
        return Math.sqrt(Math.pow(Math.abs(jumpDisX), 2) + Math.pow(Math.abs(jumpDisY), 2));
    };
    //灰度滤镜
    CommonUtil.greyColorFilter = new egret.ColorMatrixFilter([
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0, 0, 0, 1, 0
    ]);
    //调暗滤镜
    CommonUtil.darkColorFilter = new egret.ColorMatrixFilter([
        0.95, 0, 0, 0, 0,
        0, 0.95, 0, 0, 0,
        0, 0, 0.95, 0, 0,
        0, 0, 0, 1, 0
    ]);
    //通过该工具类播放的动画(但还未通过该类释放)
    CommonUtil.dynamicArmatureDisplay = {};
    return CommonUtil;
}());
__reflect(CommonUtil.prototype, "CommonUtil");
//通过CommonUtil类的createAnimation方法创建的骨骼动画,需要记录动画事件监听函数,用于释放时一并释放
var DynamicArmatureInfo = (function () {
    function DynamicArmatureInfo(armature, completeFun, funThisObj) {
        this.armature = armature;
        this.completeFun = completeFun;
        this.funThisObj = funThisObj;
    }
    return DynamicArmatureInfo;
}());
__reflect(DynamicArmatureInfo.prototype, "DynamicArmatureInfo");
//# sourceMappingURL=CommonUtil.js.map