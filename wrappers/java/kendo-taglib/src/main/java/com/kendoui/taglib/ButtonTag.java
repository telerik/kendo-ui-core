package com.kendoui.taglib;

import com.kendoui.taglib.button.ClickFunctionTag;

import com.kendoui.taglib.html.Button;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.GenericElement;
import com.kendoui.taglib.json.Function;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ButtonTag extends WidgetTag /* interfaces *//* interfaces */ {

    public ButtonTag() {
        super("Button");
    }

    @Override
    protected Element<?> createElement() {
        Element<?> wrapper;
        
        String tag = getTag();

        if (tag.isEmpty()) {
            wrapper = new Button();
        } else {
            wrapper = new GenericElement(tag);
        }

        wrapper.html(body());
               
        return wrapper;
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
        return "button";
    }

    public void setClick(ClickFunctionTag value) {
        setEvent("click", value.getBody());
    }

    public java.lang.Object getContent() {
        return (java.lang.Object)getProperty("content");
    }

    public void setContent(java.lang.Object value) {
        setProperty("content", value);
    }

    public boolean getEnable() {
        return (boolean)getProperty("enable");
    }

    public void setEnable(boolean value) {
        setProperty("enable", value);
    }

    public java.lang.String getIcon() {
        return (java.lang.String)getProperty("icon");
    }

    public void setIcon(java.lang.String value) {
        setProperty("icon", value);
    }

    public java.lang.String getImageUrl() {
        return (java.lang.String)getProperty("imageUrl");
    }

    public void setImageUrl(java.lang.String value) {
        setProperty("imageUrl", value);
    }

    public java.lang.String getSpriteCssClass() {
        return (java.lang.String)getProperty("spriteCssClass");
    }

    public void setSpriteCssClass(java.lang.String value) {
        setProperty("spriteCssClass", value);
    }

    public String getClick() {
        Function property = ((Function)getProperty("click"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setClick(String value) {
        setProperty("click", new Function(value));
    }

//<< Attributes

    public java.lang.String getTag() {
        return (java.lang.String)getProperty("tag");
    }

    public void setTag(java.lang.String value) {
        setProperty("tag", value);
    }

}
