package com.kendoui.taglib;

@SuppressWarnings("serial")
public class RadialGaugeTag extends WidgetTag {
    public RadialGaugeTag() {
        super("RadialGauge");
    }

    //>> Attributes

    public int getRangeSize() {
        return (int)getProperty("rangeSize");
    }

    public void setRangeSize(int value) {
        setProperty("rangeSize", value);
    }

    public int getRangeDistance() {
        return (int)getProperty("rangeDistance");
    }

    public void setRangeDistance(int value) {
        setProperty("rangeDistance", value);
    }

    public boolean getTransitions() {
        return (boolean)getProperty("transitions");
    }

    public void setTransitions(boolean value) {
        setProperty("transitions", value);
    }

//<< Attributes
}