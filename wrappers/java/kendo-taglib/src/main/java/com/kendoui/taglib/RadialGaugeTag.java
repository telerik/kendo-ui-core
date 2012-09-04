package com.kendoui.taglib;

@SuppressWarnings("serial")
public class RadialGaugeTag extends WidgetTag {
    public RadialGaugeTag() {
        super("RadialGauge");
    }

    //>> Attributes

    public String getTheme() {
        return (String)getProperty("theme");
    }

    public void setTheme(String theme) {
        setProperty("theme", theme);
    }

    public boolean getTransitions() {
        return (boolean)getProperty("transitions");
    }

    public void setTransitions(boolean transitions) {
        setProperty("transitions", transitions);
    }

    //<< Attributes
}