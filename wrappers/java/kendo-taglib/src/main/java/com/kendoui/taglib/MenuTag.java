package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

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

    public String getOpen() {
        return ((Function)getProperty("open")).getBody();
    }

    public void setOpen(String open) {
        setProperty("open", new Function(open));
    }

    public String getClose() {
        return ((Function)getProperty("close")).getBody();
    }

    public void setClose(String close) {
        setProperty("close", new Function(close));
    }

    public String getSelect() {
        return ((Function)getProperty("select")).getBody();
    }

    public void setSelect(String select) {
        setProperty("select", new Function(select));
    }

    //<< Attributes
}
