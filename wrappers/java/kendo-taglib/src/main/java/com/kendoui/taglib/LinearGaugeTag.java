package com.kendoui.taglib;

@SuppressWarnings("serial")
public class LinearGaugeTag extends WidgetTag  /* interfaces */implements GaugeArea, Pointer, Scale/* interfaces */ {
    public LinearGaugeTag() {
        super("LinearGauge");
    }

    //>> Attributes

    @Override
    public void setGaugeArea(GaugeAreaTag value) {
        setProperty("gaugeArea", value);
    }

    @Override
    public void setPointer(PointerTag value) {
        setProperty("pointer", value);
    }

    @Override
    public void setScale(ScaleTag value) {
        setProperty("scale", value);
    }

    public boolean getTransitions() {
        return (boolean)getProperty("transitions");
    }

    public void setTransitions(boolean value) {
        setProperty("transitions", value);
    }

//<< Attributes
}