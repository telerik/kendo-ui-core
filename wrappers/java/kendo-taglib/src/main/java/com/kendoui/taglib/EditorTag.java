package com.kendoui.taglib;

@SuppressWarnings("serial")
public class EditorTag extends WidgetTag {
    public EditorTag() {
        super("Editor");
    }

    //>> Attributes

    public boolean getEncoded() {
        return (boolean)getProperty("encoded");
    }

    public void setEncoded(boolean encoded) {
        setProperty("encoded", encoded);
    }

    //<< Attributes
}