var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.bgRect = new eui.Rect();
        _this.logo = null;
        _this.progressBG = null;
        _this.progress = null;
        _this.progressText = new egret.TextField();
        _this.loadCount = 3;
        _this.bgRect.fillColor = 0x000000;
        _this.bgRect.left = _this.bgRect.right = _this.bgRect.top = _this.bgRect.bottom = 0;
        _this.addChild(_this.bgRect);
        var group = new eui.Group();
        var loadComplete = function (event) {
            var loader = event.target;
            var texture = loader.data;
            if (loader["tag"] == "logo") {
                this.logo = new egret.Bitmap(texture);
            }
            else if (loader["tag"] == "progressBG") {
                this.progressBG = new egret.Bitmap(texture);
            }
            else if (loader["tag"] == "progress") {
                this.progress = new egret.Bitmap(texture);
            }
            this.loadCount--;
            if (this.loadCount == 0) {
                this.logo.x = this.width / 2 - this.logo.width / 2 + 10;
                this.logo.y = this.height / 2 - this.logo.height / 2 - 25;
                this.progressBG.x = this.width / 2 - this.progressBG.width / 2;
                this.progressBG.y = this.height / 2 - this.progressBG.height / 2 + 50;
                this.progress.fillMode = egret.BitmapFillMode.CLIP;
                this.progress.x = this.width / 2 - this.progress.width / 2;
                this.progress.y = this.height / 2 - this.progress.height / 2 + 50;
                this.progress.width = 0;
                egret.Tween.get(this.progress, { loop: true }).to({ alpha: 0.4 }, 400).to({ alpha: 1 }, 400);
                this.progressText.size = 19;
                this.progressText.textColor = 0xC1AA86;
                this.progressText.x = this.width / 2 - this.logo.width / 2 + 3;
                this.progressText.y = this.height / 2 - this.logo.height / 2 + 125;
                group.width = egret.MainContext.instance.stage.stageWidth;
                group.height = egret.MainContext.instance.stage.stageHeight;
                group.horizontalCenter = 0;
                group.verticalCenter = 0;
                this.addChild(group);
                group.addChild(this.logo);
                group.addChild(this.progressBG);
                group.addChild(this.progress);
                group.addChild(this.progressText);
            }
        };
        CommonUtil.loadTextureFromUrl(LoadingUI.logoBase64, loadComplete, _this, "logo");
        CommonUtil.loadTextureFromUrl(LoadingUI.progressBGBase64, loadComplete, _this, "progressBG");
        CommonUtil.loadTextureFromUrl(LoadingUI.progressBase64, loadComplete, _this, "progress");
        return _this;
    }
    LoadingUI.prototype.setProgress = function (current, total) {
        if (!this.progress)
            return;
        this.progress.width = this.progress.texture.textureWidth * (current / total);
        // this.progressText.text = Game.getLoadingLanguage("loadingText") + Math.ceil((current / total) * 100) + "%";
    };
    //Logo图片
    LoadingUI.logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjMWUxN2NhNS1hNTVkLTA4NGItOTE1YS1mZDAzMDgzNWJiNzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjA5RjkxNDRGOTUzMTFFOTg5NjU5MkZCOUQwQjE1Q0UiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjA5RjkxNDNGOTUzMTFFOTg5NjU5MkZCOUQwQjE1Q0UiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEM3Q0VEMzNGOTUzMTFFOTlBMDdCMDRBRDQyRENEMDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEM3Q0VEMzRGOTUzMTFFOTlBMDdCMDRBRDQyRENEMDAiLz4gPC9yZGY6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";
    //进度条背景
    LoadingUI.progressBGBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQsAAAAeCAMAAAAM58v8AAAAjVBMVEUAAAAFBQUFBQUCAgEBAQAAAAACAgEDAwMDAwMCAgEAAAAKCggLCwlDQzoiIh1wcGEGBgUSExJfX19vb28CAgIODgwZGRUHBwYbGxgwMCwoKSU9PTVgYFM4ODEeHhsWFhNWVktERD0fHx8sLCdSUlJGR0dubl9TU0hHRz48PDwkJCE1NTNNTUVoaFpoaGiwi9i6AAAACnRSTlMA7Op8HRhzwcB0DNe1CQAAAZ1JREFUWMPtmQluqzAQhumW99oxKaYe79isSYA09z9e60SQSlVPMHxH+KTZ/sneNhY2F79cCCEKBQCMFgCgCiHETxeiAORRh7CnRQg6coRC3F0IhTFYU7mcGq4yNkRUYnEhFGpbnWr/eTi8U+Jw+PT1qbL6JiNLBYK6y48uAkWiO+adxkLcXDDZNQ0bLx8UKWfWNJ1kVxei4JOrsf+4lDRpWO0mXojkAqQ5uvFS9v0YEEiBYez73rqjkXB1gfvc87Lsh+nh6TkjxfPTwzQMI3q3x+Si4PZ8MknFv4wg/6dh1qez5UVyEU1tmn4wjxlJHs3cfhuIyYWSlZfDuZGvGUl2cm6lr6RKLnTlcRhG9pKR5IUZjb7Sq4txnOm6sHJ1kWpkng3fZSTZ8ZZfa2TpndZ0LdXeGTR2qXcuM1VaayPNmRpbDteZuuxarP2GU9y1eOAAPt/jfQfnWretRAakYCg1B7jt4OttBshpgkrBcpstN3tK/kiiYL3Z71mOBIrIJcvZMr4149uy3zX73X4C609g+xWtv6Lth7j9U//mCwhtMZ80lChGAAAAAElFTkSuQmCC";
    //进度条
    LoadingUI.progressBase64 = "data:image/png;base64,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";
    return LoadingUI;
}(eui.Component));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map