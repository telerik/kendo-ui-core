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

    public Function getOpen() {
        return (Function)getProperty("open");
    }

    public void setOpen(String open) {
        setProperty("open", new Function(open));
    }

    public Function getClose() {
        return (Function)getProperty("close");
    }

    public void setClose(String close) {
        setProperty("close", new Function(close));
    }

    public Function getSelect() {
        return (Function)getProperty("select");
    }

    public void setSelect(String select) {
        setProperty("select", new Function(select));
    }

    //<< Attributes
}
