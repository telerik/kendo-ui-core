package com.kendoui.taglib;

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

    //<< Attributes
}