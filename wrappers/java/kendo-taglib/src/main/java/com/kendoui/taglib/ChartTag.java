package com.kendoui.taglib;

@SuppressWarnings("serial")
public class ChartTag extends WidgetTag {
    public ChartTag() {
        super("Chart");
    }

    //>> Attributes

    public String getTheme() {
        return (String)getProperty("theme");
    }

    public void setTheme(String theme) {
        setProperty("theme", theme);
    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean autoBind) {
        setProperty("autoBind", autoBind);
    }

    public boolean getTransitions() {
        return (boolean)getProperty("transitions");
    }

    public void setTransitions(boolean transitions) {
        setProperty("transitions", transitions);
    }

    //<< Attributes
}