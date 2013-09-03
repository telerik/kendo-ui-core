
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.ChartTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PlotAreaTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ChartTag parent = (ChartTag)findParentWithClass(ChartTag.class);


        parent.setPlotArea(this);

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
        return "chart-plotArea";
    }

    public void setBorder(com.kendoui.taglib.chart.PlotAreaBorderTag value) {
        setProperty("border", value);
    }

    public void setMargin(com.kendoui.taglib.chart.PlotAreaMarginTag value) {
        setProperty("margin", value);
    }

    public void setPadding(com.kendoui.taglib.chart.PlotAreaPaddingTag value) {
        setProperty("padding", value);
    }

    public java.lang.String getBackground() {
        return (java.lang.String)getProperty("background");
    }

    public void setBackground(java.lang.String value) {
        setProperty("background", value);
    }

    public float getMargin() {
        return (float)getProperty("margin");
    }

    public void setMargin(float value) {
        setProperty("margin", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

    public float getPadding() {
        return (float)getProperty("padding");
    }

    public void setPadding(float value) {
        setProperty("padding", value);
    }

//<< Attributes

}
