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

    public Function getExpand() {
        return (Function)getProperty("expand");
    }

    public void setExpand(String expand) {
        setProperty("expand", new Function(expand));
    }

    public Function getCollapse() {
        return (Function)getProperty("collapse");
    }

    public void setCollapse(String collapse) {
        setProperty("collapse", new Function(collapse));
    }

    public Function getContentLoad() {
        return (Function)getProperty("contentLoad");
    }

    public void setContentLoad(String contentLoad) {
        setProperty("contentLoad", new Function(contentLoad));
    }

    public Function getResize() {
        return (Function)getProperty("resize");
    }

    public void setResize(String resize) {
        setProperty("resize", new Function(resize));
    }

    public Function getLayoutChange() {
        return (Function)getProperty("layoutChange");
    }

    public void setLayoutChange(String layoutChange) {
        setProperty("layoutChange", new Function(layoutChange));
    }

    //<< Attributes
}