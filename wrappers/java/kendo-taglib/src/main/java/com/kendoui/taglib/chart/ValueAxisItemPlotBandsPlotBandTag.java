
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ValueAxisItemPlotBandsPlotBandTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ValueAxisItemPlotBandsTag parent = (ValueAxisItemPlotBandsTag)findParentWithClass(ValueAxisItemPlotBandsTag.class);

        parent.addPlotBand(this);

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
        return "chart-valueAxisItem-plotBand";
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public float getFrom() {
        return (float)getProperty("from");
    }

    public void setFrom(float value) {
        setProperty("from", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

    public float getTo() {
        return (float)getProperty("to");
    }

    public void setTo(float value) {
        setProperty("to", value);
    }

//<< Attributes

}
