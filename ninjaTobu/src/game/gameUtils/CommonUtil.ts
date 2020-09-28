/**
 * 常用的游戏内的工具类（不对应某个特定游戏）
 */
class CommonUtil {
    private static fadeRect: eui.Rect;
    //灰度滤镜
    public static greyColorFilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(
        [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ]);
    //调暗滤镜
    public static darkColorFilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(
        [
            0.95, 0, 0, 0, 0,
            0, 0.95, 0, 0, 0,
            0, 0, 0.95, 0, 0,
            0, 0, 0, 1, 0
        ]);


    //数字发生改变时，先消失，再渐现
    public static valueFadeTween(displayObj: egret.DisplayObject, bRemoveTween: boolean = true): void {
        if (bRemoveTween) {
            egret.Tween.removeTweens(displayObj);
        }
        displayObj.alpha = 0;
        egret.Tween.get(displayObj).to({ alpha: 1 }, 1000).call(function () {
            if (bRemoveTween) {
                egret.Tween.removeTweens(this);
            }
        }, displayObj);
    }

    //放大消失的动画(bAppear：出现还是消失)
    public static scaleFadeTween(displayObj: egret.DisplayObject, bAppear: boolean, bRemoveTween: boolean = true): void {
        if (bRemoveTween) {
            egret.Tween.removeTweens(displayObj);
        }
        var scaleCoefficient: number = displayObj.scaleX - 1;
        var startScale: number = 0.68 + scaleCoefficient;
        displayObj.scaleX = displayObj.scaleY = startScale;
    }



    //超过10万 会对值/1000 向上取整
    public static valueFormat1000(value: number): string {
        if (value >= 1000000) {
            return Math.ceil(value / 1000000) + "M";
        } else if (value >= 1000) {
            return Math.ceil(value / 1000) + "K";
        }
        else {
            return this.valueFormatDecimals(value, 2) + "";
        }
    }

    //保留小数点后两位（但如果保留后和整数一样，则返回整数，如：1.01返回1.01 ， 1.001返回1,而不是返回1.00, 1.10返回1.1）
    public static valueFormatDecimals(value: number, decimals: number): number {
        //因为编译后value有可能传进来的是string
        value = +value;
        if (!value) return value;
        if (decimals == 0) return +value.toFixed(0);
        var preNum: string = null;
        var nextNum: string = null;
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
    }

    public static loadTextureFromUrl(url: string, onLoadComplete: Function, thisObj: any, tag: string = ""): void {
        var loader: egret.URLLoader = new egret.URLLoader();
        loader["tag"] = tag;
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        loader.addEventListener(egret.Event.COMPLETE, onLoadComplete, thisObj);
        var request: egret.URLRequest = new egret.URLRequest(url);
        loader.load(request);
    }

    //获取url的参数
    public static getAllParam(key: string = null): any {
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
                } else {
                    theRequest[tmpStrs[0]] = tmpStrs[1];
                }
            }
        }
        if (key) {
            return theRequest[key];
        } else {
            return theRequest;
        }
    }

    //根据字符串获取相加后的unicode码
    public static getStringUnicode(str: string): number {
        var code: number = 0;
        for (var i = 0; i < str.length; i++) {
            code += str.charCodeAt(i);
        }
        return code;
    }

    //获得min和maxInclud之间的随机整数（包括minInclud，maxInclud）
    public static randomInteger(minInclude, maxInclude, bInteger: boolean = true): number {
        if (bInteger) {
            return parseInt(Math.random() * (maxInclude - minInclude + 1) + minInclude);
        } else {
            var Range = maxInclude - minInclude;
            var Rand = Math.random();
            var num = minInclude + Rand * Range;
            return num;
        }
    }

    //json to url
    public static json2url(json): string {
        var arr = [];
        for (var name in json) {
            arr.push(name + '=' + json[name]);
        }
        return arr.join('&');
    }

    //是否是数组
    public static isArray(obj): boolean {
        return Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Array]';
    }

    //是否是数字 
    public static isNumber(value) {
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除  
        if (value === "" || value == null) return false;
        value += ""; //转换为字符串,否则直接传number类型进来,indexOf会报错
        if (value.indexOf(" ") >= 0 || value.indexOf("+") >= 0 || value.indexOf("-") >= 0) return false;
        if (!isNaN(value)) {
            return true;
        } else {
            return false;
        }
    }

    //copy文本到系统剪贴板
    public static copy2Clipboard(text: string): void {
        var input = document.createElement("input");
        input.value = text;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length);
        document.execCommand('Copy');
        document.body.removeChild(input);
        window.alert(Game.getLanguage("copy2Clipboard succuss"));
    }

    //打印带时间的日志
    public static log(str: any, bTime: boolean = false): void {
        if (bTime) {
            var timeStr = (egret.getTimer() / 1000).toFixed(2);
            egret.log("日志时间：" + timeStr + "     " + str);
        } else {
            egret.log(str);
        }
    }

    //通过该工具类播放的动画(但还未通过该类释放)
    private static dynamicArmatureDisplay: {} = {};
    //动态创建动画,并添加到指定显示容器(即:使用时才加载资源到内存,并创建)
    public static createAnimation(animationName: string, completeFun: Function = null, funThisObj: any = null): dragonBones.EgretArmatureDisplay {
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
        var armature: dragonBones.EgretArmatureDisplay = dragonBones.EgretFactory.factory.buildArmatureDisplay(animationName);
        if (armature) {
            if (completeFun) {
                armature.addEventListener(dragonBones.EventObject.COMPLETE, completeFun, funThisObj);
            }
            var dynamicArmatureKey: string = animationName + "_" + armature.hashCode;
            CommonUtil.dynamicArmatureDisplay[dynamicArmatureKey] = new DynamicArmatureInfo(armature, completeFun, funThisObj);
        }
        return armature;
    }

    //释放动画资源
    public static disposeAnimationRes(armatureDisplay: dragonBones.EgretArmatureDisplay): void {
        if (!armatureDisplay) return;
        var dynamicArmatureKey: string = armatureDisplay.armature.name + "_" + armatureDisplay.hashCode;
        var dynamicArmatureInfo: DynamicArmatureInfo = CommonUtil.dynamicArmatureDisplay[dynamicArmatureKey];
        if (dynamicArmatureInfo) {
            armatureDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, dynamicArmatureInfo.completeFun, dynamicArmatureInfo.funThisObj);
            delete CommonUtil.dynamicArmatureDisplay[dynamicArmatureKey]
        } else {
            egret.warn("disposeAnimationRes! dynamicArmatureInfo is null, armatureName: " + dynamicArmatureKey)
        }
        dragonBones.EgretFactory.factory.removeDragonBonesData(armatureDisplay.armature.name, false);
        dragonBones.EgretFactory.factory.removeTextureAtlasData(armatureDisplay.armature.name, false);
        armatureDisplay.parent.removeChild(armatureDisplay);
        armatureDisplay.dispose();
    }

    //获得两点和水平位置
    public static getAngle(x1, y1, x2, y2): number {
        var x = x1 - x2,
            y = y1 - y2;
        if (!x && !y) {
            return 0;
        }
        var angle = (180 + Math.atan2(-y, -x) * 180 / Math.PI + 360) % 360;
        return angle + 270;
    }

    //获得两点之间距离
    public static getDistance(x1, y1, x2, y2): number {
        var jumpDisX = x1 - x2;
        var jumpDisY = y1 - y2;
        return Math.sqrt(Math.pow(Math.abs(jumpDisX), 2) + Math.pow(Math.abs(jumpDisY), 2));

    }
}

//通过CommonUtil类的createAnimation方法创建的骨骼动画,需要记录动画事件监听函数,用于释放时一并释放
class DynamicArmatureInfo {
    constructor(armature, completeFun, funThisObj) {
        this.armature = armature;
        this.completeFun = completeFun;
        this.funThisObj = funThisObj;
    }

    public armature: dragonBones.EgretArmatureDisplay;
    public completeFun: Function;
    public funThisObj: any;
}