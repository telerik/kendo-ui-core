
package com.kendoui.taglib;


import com.kendoui.taglib.menu.*;


import com.kendoui.taglib.json.Function;


@SuppressWarnings("serial")
public class MenuTag extends WidgetTag /* interfaces */implements Animation/* interfaces */ {

    public MenuTag() {
        super("Menu");
    }

//>> Attributes

    @Override
    public void setAnimation(AnimationTag value) {
        setProperty("animation", value);
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

    public int getHoverDelay() {
        return (int)getProperty("hoverDelay");
    }

    public void setHoverDelay(int value) {
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
        return ((Function)getProperty("close")).getBody();
    }

    public void setClose(String value) {
        setProperty("close", new Function(value));
    }

    public String getOpen() {
        return ((Function)getProperty("open")).getBody();
    }

    public void setOpen(String value) {
        setProperty("open", new Function(value));
    }

    public String getSelect() {
        return ((Function)getProperty("select")).getBody();
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

//<< Attributes
}
