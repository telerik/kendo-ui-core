package com.kendoui.taglib;

@SuppressWarnings("serial")
public class MenuTag extends WidgetTag {
    public MenuTag() {
        super("Menu");
    }

    //>> Attributes

    public String getOrientation() {
        return (String)getProperty("orientation");
    }

    public void setOrientation(String orientation) {
        setProperty("orientation", orientation);
    }

    public String getDirection() {
        return (String)getProperty("direction");
    }

    public void setDirection(String direction) {
        setProperty("direction", direction);
    }

    public boolean getOpenOnClick() {
        return (boolean)getProperty("openOnClick");
    }

    public void setOpenOnClick(boolean openOnClick) {
        setProperty("openOnClick", openOnClick);
    }

    public boolean getCloseOnClick() {
        return (boolean)getProperty("closeOnClick");
    }

    public void setCloseOnClick(boolean closeOnClick) {
        setProperty("closeOnClick", closeOnClick);
    }

    public int getHoverDelay() {
        return (int)getProperty("hoverDelay");
    }

    public void setHoverDelay(int hoverDelay) {
        setProperty("hoverDelay", hoverDelay);
    }

    //<< Attributes
}