class DisplayerToCanvas {
    public static add(canvas: egret.DisplayObjectContainer, tier: number, ...childs: eui.Component[]) {
        for (let ele of childs) {
            if (tier == null) {
                canvas.addChild(ele);
            } else {
                canvas.addChildAt(ele, tier);
            }
        }
    }
}