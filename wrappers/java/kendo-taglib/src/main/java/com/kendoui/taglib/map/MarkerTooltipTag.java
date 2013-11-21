
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MarkerTooltipTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MarkerTag parent = (MarkerTag)findParentWithClass(MarkerTag.class);


        parent.setTooltip(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "map-marker-tooltip";
    }

    public void setAnimation(com.kendoui.taglib.map.MarkerTooltipAnimationTag value) {
        setProperty("animation", value);
    }

    public boolean getAutoHide() {
        return (boolean)getProperty("autoHide");
    }

    public void setAutoHide(boolean value) {
        setProperty("autoHide", value);
    }

    public boolean getCallout() {
        return (boolean)getProperty("callout");
    }

    public void setCallout(boolean value) {
        setProperty("callout", value);
    }

    public float getHeight() {
        return (float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
    }

    public boolean getIframe() {
        return (boolean)getProperty("iframe");
    }

    public void setIframe(boolean value) {
        setProperty("iframe", value);
    }

    public java.lang.String getPosition() {
        return (java.lang.String)getProperty("position");
    }

    public void setPosition(java.lang.String value) {
        setProperty("position", value);
    }

    public float getShowAfter() {
        return (float)getProperty("showAfter");
    }

    public void setShowAfter(float value) {
        setProperty("showAfter", value);
    }

    public java.lang.String getShowOn() {
        return (java.lang.String)getProperty("showOn");
    }

    public void setShowOn(java.lang.String value) {
        setProperty("showOn", value);
    }

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

//<< Attributes

}
