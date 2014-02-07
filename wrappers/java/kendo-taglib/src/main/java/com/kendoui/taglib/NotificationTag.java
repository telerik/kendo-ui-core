
package com.kendoui.taglib;


import com.kendoui.taglib.notification.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class NotificationTag extends WidgetTag /* interfaces *//* interfaces */ {

    public NotificationTag() {
        super("Notification");
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
        return "notification";
    }

    public void setPosition(com.kendoui.taglib.notification.PositionTag value) {
        setProperty("position", value);
    }

    public void setHide(HideFunctionTag value) {
        setEvent("hide", value.getBody());
    }

    public void setShow(ShowFunctionTag value) {
        setEvent("show", value.getBody());
    }

    public float getAllowHideAfter() {
        return (float)getProperty("allowHideAfter");
    }

    public void setAllowHideAfter(float value) {
        setProperty("allowHideAfter", value);
    }

    public java.lang.Object getAnimation() {
        return (java.lang.Object)getProperty("animation");
    }

    public void setAnimation(java.lang.Object value) {
        setProperty("animation", value);
    }

    public java.lang.String getAppendTo() {
        return (java.lang.String)getProperty("appendTo");
    }

    public void setAppendTo(java.lang.String value) {
        setProperty("appendTo", value);
    }

    public float getAutoHideAfter() {
        return (float)getProperty("autoHideAfter");
    }

    public void setAutoHideAfter(float value) {
        setProperty("autoHideAfter", value);
    }

    public boolean getButton() {
        return (boolean)getProperty("button");
    }

    public void setButton(boolean value) {
        setProperty("button", value);
    }

    public java.lang.Object getHeight() {
        return (java.lang.Object)getProperty("height");
    }

    public void setHeight(java.lang.Object value) {
        setProperty("height", value);
    }

    public boolean getHideOnClick() {
        return (boolean)getProperty("hideOnClick");
    }

    public void setHideOnClick(boolean value) {
        setProperty("hideOnClick", value);
    }

    public java.lang.String getStacking() {
        return (java.lang.String)getProperty("stacking");
    }

    public void setStacking(java.lang.String value) {
        setProperty("stacking", value);
    }

    public java.lang.Object getTemplates() {
        return (java.lang.Object)getProperty("templates");
    }

    public void setTemplates(java.lang.Object value) {
        setProperty("templates", value);
    }

    public java.lang.Object getWidth() {
        return (java.lang.Object)getProperty("width");
    }

    public void setWidth(java.lang.Object value) {
        setProperty("width", value);
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
