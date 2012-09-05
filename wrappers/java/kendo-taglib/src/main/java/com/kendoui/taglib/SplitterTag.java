package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class SplitterTag extends WidgetTag {
    public SplitterTag() {
        super("Splitter");
    }

    //>> Attributes

    public String getOrientation() {
        return (String)getProperty("orientation");
    }

    public void setOrientation(String orientation) {
        setProperty("orientation", orientation);
    }

    public String getExpand() {
        return ((Function)getProperty("expand")).getBody();
    }

    public void setExpand(String expand) {
        setProperty("expand", new Function(expand));
    }

    public String getCollapse() {
        return ((Function)getProperty("collapse")).getBody();
    }

    public void setCollapse(String collapse) {
        setProperty("collapse", new Function(collapse));
    }

    public String getContentLoad() {
        return ((Function)getProperty("contentLoad")).getBody();
    }

    public void setContentLoad(String contentLoad) {
        setProperty("contentLoad", new Function(contentLoad));
    }

    public String getResize() {
        return ((Function)getProperty("resize")).getBody();
    }

    public void setResize(String resize) {
        setProperty("resize", new Function(resize));
    }

    public String getLayoutChange() {
        return ((Function)getProperty("layoutChange")).getBody();
    }

    public void setLayoutChange(String layoutChange) {
        setProperty("layoutChange", new Function(layoutChange));
    }

    //<< Attributes
}