
package com.kendoui.taglib;


import com.kendoui.taglib.radialgauge.*;



import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class RadialGaugeTag extends WidgetTag /* interfaces *//* interfaces */ {

    public RadialGaugeTag() {
        super("RadialGauge");
    }

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "radialGauge";
    }

    public void setGaugeArea(GaugeAreaTag value) {
        setProperty("gaugeArea", value);
    }

    public void setPointer(PointerTag value) {
        setProperty("pointer", value);
    }

    public void setScale(ScaleTag value) {
        setProperty("scale", value);
    }

    public float getRangeDistance() {
        return (float)getProperty("rangeDistance");
    }

    public void setRangeDistance(float value) {
        setProperty("rangeDistance", value);
    }

    public float getRangeSize() {
        return (float)getProperty("rangeSize");
    }

    public void setRangeSize(float value) {
        setProperty("rangeSize", value);
    }

    public boolean getTransitions() {
        return (boolean)getProperty("transitions");
    }

    public void setTransitions(boolean value) {
        setProperty("transitions", value);
    }

//<< Attributes

}
