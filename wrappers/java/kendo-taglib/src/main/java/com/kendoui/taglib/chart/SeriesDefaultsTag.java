
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.ChartTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesDefaultsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ChartTag parent = (ChartTag)findParentWithClass(ChartTag.class);


        parent.setSeriesDefaults(this);

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
        return "chart-seriesDefaults";
    }

    public void setBorder(com.kendoui.taglib.chart.SeriesDefaultsBorderTag value) {
        setProperty("border", value);
    }

    public void setLabels(com.kendoui.taglib.chart.SeriesDefaultsLabelsTag value) {
        setProperty("labels", value);
    }

    public void setNotes(com.kendoui.taglib.chart.SeriesDefaultsNotesTag value) {
        setProperty("notes", value);
    }

    public void setOverlay(com.kendoui.taglib.chart.SeriesDefaultsOverlayTag value) {
        setProperty("overlay", value);
    }

    public void setStack(com.kendoui.taglib.chart.SeriesDefaultsStackTag value) {
        setProperty("stack", value);
    }

    public void setTooltip(com.kendoui.taglib.chart.SeriesDefaultsTooltipTag value) {
        setProperty("tooltip", value);
    }

    public java.lang.Object getArea() {
        return (java.lang.Object)getProperty("area");
    }

    public void setArea(java.lang.Object value) {
        setProperty("area", value);
    }

    public java.lang.Object getBar() {
        return (java.lang.Object)getProperty("bar");
    }

    public void setBar(java.lang.Object value) {
        setProperty("bar", value);
    }

    public java.lang.Object getBubble() {
        return (java.lang.Object)getProperty("bubble");
    }

    public void setBubble(java.lang.Object value) {
        setProperty("bubble", value);
    }

    public java.lang.Object getCandlestick() {
        return (java.lang.Object)getProperty("candlestick");
    }

    public void setCandlestick(java.lang.Object value) {
        setProperty("candlestick", value);
    }

    public java.lang.Object getColumn() {
        return (java.lang.Object)getProperty("column");
    }

    public void setColumn(java.lang.Object value) {
        setProperty("column", value);
    }

    public java.lang.Object getDonut() {
        return (java.lang.Object)getProperty("donut");
    }

    public void setDonut(java.lang.Object value) {
        setProperty("donut", value);
    }

    public float getGap() {
        return (float)getProperty("gap");
    }

    public void setGap(float value) {
        setProperty("gap", value);
    }

    public java.lang.Object getLine() {
        return (java.lang.Object)getProperty("line");
    }

    public void setLine(java.lang.Object value) {
        setProperty("line", value);
    }

    public java.lang.Object getOhlc() {
        return (java.lang.Object)getProperty("ohlc");
    }

    public void setOhlc(java.lang.Object value) {
        setProperty("ohlc", value);
    }

    public java.lang.Object getPie() {
        return (java.lang.Object)getProperty("pie");
    }

    public void setPie(java.lang.Object value) {
        setProperty("pie", value);
    }

    public java.lang.Object getScatter() {
        return (java.lang.Object)getProperty("scatter");
    }

    public void setScatter(java.lang.Object value) {
        setProperty("scatter", value);
    }

    public java.lang.Object getScatterLine() {
        return (java.lang.Object)getProperty("scatterLine");
    }

    public void setScatterLine(java.lang.Object value) {
        setProperty("scatterLine", value);
    }

    public float getSpacing() {
        return (float)getProperty("spacing");
    }

    public void setSpacing(float value) {
        setProperty("spacing", value);
    }

    public boolean getStack() {
        return (boolean)getProperty("stack");
    }

    public void setStack(boolean value) {
        setProperty("stack", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

    public java.lang.Object getVerticalArea() {
        return (java.lang.Object)getProperty("verticalArea");
    }

    public void setVerticalArea(java.lang.Object value) {
        setProperty("verticalArea", value);
    }

    public java.lang.Object getVerticalLine() {
        return (java.lang.Object)getProperty("verticalLine");
    }

    public void setVerticalLine(java.lang.Object value) {
        setProperty("verticalLine", value);
    }

//<< Attributes

}
