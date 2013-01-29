
package com.kendoui.taglib;


import com.kendoui.taglib.menu.*;

import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Ul;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MenuTag extends WidgetWithItemsTag /* interfaces */implements Items/* interfaces */ {

    public MenuTag() {
        super("Menu");
    }

    @Override
    public Element<?> createElement() {
        Ul ul = new Ul();
        
        ul.html(body());
        
        return ul;
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
        return "menu";
    }

    public void setAnimation(com.kendoui.taglib.menu.AnimationTag value) {
        setProperty("animation", value);
    }

    public void setItems(ItemsTag value) {

        items = value.items();

    }

    public void setClose(CloseFunctionTag value) {
        setEvent("close", value.getBody());
    }

    public void setOpen(OpenFunctionTag value) {
        setEvent("open", value.getBody());
    }

    public void setSelect(SelectFunctionTag value) {
        setEvent("select", value.getBody());
    }

    public boolean getCloseOnClick() {
        return (boolean)getProperty("closeOnClick");
    }

    public void setCloseOnClick(boolean value) {
        setProperty("closeOnClick", value);
    }

    public String getDirection() {
        return (String)getProperty("direction");
    }

    public void setDirection(String value) {
        setProperty("direction", value);
    }

    public float getHoverDelay() {
        return (float)getProperty("hoverDelay");
    }

    public void setHoverDelay(float value) {
        setProperty("hoverDelay", value);
    }

    public boolean getOpenOnClick() {
        return (boolean)getProperty("openOnClick");
    }

    public void setOpenOnClick(boolean value) {
        setProperty("openOnClick", value);
    }

    public String getOrientation() {
        return (String)getProperty("orientation");
    }

    public void setOrientation(String value) {
        setProperty("orientation", value);
    }

    public String getPopupCollision() {
        return (String)getProperty("popupCollision");
    }

    public void setPopupCollision(String value) {
        setProperty("popupCollision", value);
    }

    public String getClose() {
        Function property = ((Function)getProperty("close"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setClose(String value) {
        setProperty("close", new Function(value));
    }

    public String getOpen() {
        Function property = ((Function)getProperty("open"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setOpen(String value) {
        setProperty("open", new Function(value));
    }

    public String getSelect() {
        Function property = ((Function)getProperty("select"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

//<< Attributes

}
