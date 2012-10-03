
package com.kendoui.taglib;


import com.kendoui.taglib.radialgauge.*;



@SuppressWarnings("serial")
public class RadialGaugeTag extends WidgetTag /* interfaces */implements GaugeArea, Pointer, Scale/* interfaces */ {

    public RadialGaugeTag() {
        super("RadialGauge");
    }

//>> Attributes

    @Override
    public void setGaugeArea(GaugeAreaTag value) {
        setProperty("gaugearea", value);
    }

    @Override
    public void setPointer(PointerTag value) {
        setProperty("pointer", value);
    }

    @Override
    public void setScale(ScaleTag value) {
        setProperty("scale", value);
    }

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
