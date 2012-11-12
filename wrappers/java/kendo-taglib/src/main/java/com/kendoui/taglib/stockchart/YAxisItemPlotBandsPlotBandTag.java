
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class YAxisItemPlotBandsPlotBandTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        YAxisItemPlotBandsTag parent = (YAxisItemPlotBandsTag)findParentWithClass(YAxisItemPlotBandsTag.class);

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
        return "stockChart-yAxisItem-plotBand";
    }

    public float getFrom() {
        return (float)getProperty("from");
    }

    public void setFrom(float value) {
        setProperty("from", value);
    }

    public float getTo() {
        return (float)getProperty("to");
    }

    public void setTo(float value) {
        setProperty("to", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

//<< Attributes

}
