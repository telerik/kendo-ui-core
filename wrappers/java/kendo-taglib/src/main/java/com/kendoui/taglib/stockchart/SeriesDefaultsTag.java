
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.StockChartTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesDefaultsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        StockChartTag parent = (StockChartTag)findParentWithClass(StockChartTag.class);


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
        return "stockChart-seriesDefaults";
    }

    public void setBorder(com.kendoui.taglib.stockchart.SeriesDefaultsBorderTag value) {
        setProperty("border", value);
    }

    public void setLabels(com.kendoui.taglib.stockchart.SeriesDefaultsLabelsTag value) {
        setProperty("labels", value);
    }

    public void setStack(com.kendoui.taglib.stockchart.SeriesDefaultsStackTag value) {
        setProperty("stack", value);
    }

    public void setTooltip(com.kendoui.taglib.stockchart.SeriesDefaultsTooltipTag value) {
        setProperty("tooltip", value);
    }

    public java.lang.Object getArea() {
        return (java.lang.Object)getProperty("area");
    }

    public void setArea(java.lang.Object value) {
        setProperty("area", value);
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

    public java.lang.Object getOverlay() {
        return (java.lang.Object)getProperty("overlay");
    }

    public void setOverlay(java.lang.Object value) {
        setProperty("overlay", value);
    }

    public java.lang.Object getPie() {
        return (java.lang.Object)getProperty("pie");
    }

    public void setPie(java.lang.Object value) {
        setProperty("pie", value);
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

//<< Attributes

}
