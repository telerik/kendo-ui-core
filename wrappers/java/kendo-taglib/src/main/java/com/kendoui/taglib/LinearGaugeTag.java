package com.kendoui.taglib;

@SuppressWarnings("serial")
public class LinearGaugeTag extends WidgetTag {
    public LinearGaugeTag() {
        super("LinearGauge");
    }

    //>> Attributes

    public boolean getTransitions() {
        return (boolean)getProperty("transitions");
    }

    public void setTransitions(boolean value) {
        setProperty("transitions", value);
    }

//<< Attributes
}