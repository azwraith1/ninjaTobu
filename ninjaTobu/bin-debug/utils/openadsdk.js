var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var sdk = {
    RewardVideoAd: "RewardVideoAd",
    SplashAd: "SplashAd",
    FullScreenVideoAd: "FullScreenVideoAd",
    BannerExpressAd: "BannerExpressAd",
    InteractionAd: "InteractionAd",
};
var openadsdk = (function () {
    function openadsdk() {
    }
    openadsdk.RewardVideoAd = function (callBack, callObj, json) {
        openadsdk.addCallBack(sdk.RewardVideoAd, callBack, callObj, json);
    };
    openadsdk.SplashAd = function (callBack, callObj, json) {
        openadsdk.addCallBack(sdk.SplashAd, callBack, callObj, json);
    };
    openadsdk.FullScreenVideoAd = function (callBack, callObj, json) {
        openadsdk.addCallBack(sdk.FullScreenVideoAd, callBack, callObj, json);
    };
    openadsdk.BannerExpressAd = function (callBack, callObj, json) {
        openadsdk.addCallBack(sdk.BannerExpressAd, callBack, callObj, json);
    };
    openadsdk.InteractionAd = function (callBack, callObj, json) {
        openadsdk.addCallBack(sdk.InteractionAd, callBack, callObj, json);
    };
    openadsdk.addCallBack = function (type, callBack, callObj, json) {
        egret.ExternalInterface.addCallback("TT" + type + "-js", function (message) {
            if (callBack && callObj) {
                callBack.apply(callObj, [message]);
            }
        });
        egret.ExternalInterface.call("TT" + type, json);
    };
    return openadsdk;
}());
__reflect(openadsdk.prototype, "openadsdk");
//# sourceMappingURL=openadsdk.js.map