// TypeScript file
class ResetButtonUI extends eui.Component {
    public ima: eui.Image;
    public text: eui.Label;

    public constructor(source, text) {
        super();
        this.skinName = "ResetButtonSkin";
        this.ima.source = source;
        this.text.text = text;
    }


}