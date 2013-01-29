
package com.kendoui.taglib;


import com.kendoui.taglib.tooltip.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TooltipTag extends WidgetTag /* interfaces *//* interfaces */ {

    public TooltipTag() {
        super("Tooltip");
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
        return "tooltip";
    }

    public void setAnimation(com.kendoui.taglib.tooltip.AnimationTag value) {
        setProperty("animation", value);
    }

    public void setContent(com.kendoui.taglib.tooltip.ContentTag value) {
        setProperty("content", value);
    }

    public void setContentLoad(ContentLoadFunctionTag value) {
        setEvent("contentLoad", value.getBody());
    }

    public void setError(ErrorFunctionTag value) {
        setEvent("error", value.getBody());
    }

    public void setHide(HideFunctionTag value) {
        setEvent("hide", value.getBody());
    }

    public void setShow(ShowFunctionTag value) {
        setEvent("show", value.getBody());
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

    public String getContent() {
        return (String)getProperty("content");
    }

    public void setContent(String value) {
        setProperty("content", value);
    }

    public String getFilter() {
        return (String)getProperty("filter");
    }

    public void setFilter(String value) {
        setProperty("filter", value);
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

    public String getPosition() {
        return (String)getProperty("position");
    }

    public void setPosition(String value) {
        setProperty("position", value);
    }

    public float getShowAfter() {
        return (float)getProperty("showAfter");
    }

    public void setShowAfter(float value) {
        setProperty("showAfter", value);
    }

    public String getShowOn() {
        return (String)getProperty("showOn");
    }

    public void setShowOn(String value) {
        setProperty("showOn", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

    public String getContentLoad() {
        Function property = ((Function)getProperty("contentLoad"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setContentLoad(String value) {
        setProperty("contentLoad", new Function(value));
    }

    public String getError() {
        Function property = ((Function)getProperty("error"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setError(String value) {
        setProperty("error", new Function(value));
    }

    public String getHide() {
        Function property = ((Function)getProperty("hide"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setHide(String value) {
        setProperty("hide", new Function(value));
    }

    public String getShow() {
        Function property = ((Function)getProperty("show"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setShow(String value) {
        setProperty("show", new Function(value));
    }

//<< Attributes

}
