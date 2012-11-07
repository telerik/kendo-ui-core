
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.ChartTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesDefaultsTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
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

    public void setBorder(SeriesDefaultsBorderTag value) {
        setProperty("border", value);
    }

    public void setLabels(SeriesDefaultsLabelsTag value) {
        setProperty("labels", value);
    }

    public void setTooltip(SeriesDefaultsTooltipTag value) {
        setProperty("tooltip", value);
    }

    public Object getArea() {
        return (Object)getProperty("area");
    }

    public void setArea(Object value) {
        setProperty("area", value);
    }

    public Object getCandlestick() {
        return (Object)getProperty("candlestick");
    }

    public void setCandlestick(Object value) {
        setProperty("candlestick", value);
    }

    public Object getOhlc() {
        return (Object)getProperty("ohlc");
    }

    public void setOhlc(Object value) {
        setProperty("ohlc", value);
    }

    public Object getBar() {
        return (Object)getProperty("bar");
    }

    public void setBar(Object value) {
        setProperty("bar", value);
    }

    public Object getBubble() {
        return (Object)getProperty("bubble");
    }

    public void setBubble(Object value) {
        setProperty("bubble", value);
    }

    public Object getColumn() {
        return (Object)getProperty("column");
    }

    public void setColumn(Object value) {
        setProperty("column", value);
    }

    public Object getDonut() {
        return (Object)getProperty("donut");
    }

    public void setDonut(Object value) {
        setProperty("donut", value);
    }

    public float getGap() {
        return (float)getProperty("gap");
    }

    public void setGap(float value) {
        setProperty("gap", value);
    }

    public Object getLine() {
        return (Object)getProperty("line");
    }

    public void setLine(Object value) {
        setProperty("line", value);
    }

    public Object getOverlay() {
        return (Object)getProperty("overlay");
    }

    public void setOverlay(Object value) {
        setProperty("overlay", value);
    }

    public Object getPie() {
        return (Object)getProperty("pie");
    }

    public void setPie(Object value) {
        setProperty("pie", value);
    }

    public Object getScatter() {
        return (Object)getProperty("scatter");
    }

    public void setScatter(Object value) {
        setProperty("scatter", value);
    }

    public Object getScatterLine() {
        return (Object)getProperty("scatterLine");
    }

    public void setScatterLine(Object value) {
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

    public Object getVerticalArea() {
        return (Object)getProperty("verticalArea");
    }

    public void setVerticalArea(Object value) {
        setProperty("verticalArea", value);
    }

    public Object getVerticalLine() {
        return (Object)getProperty("verticalLine");
    }

    public void setVerticalLine(Object value) {
        setProperty("verticalLine", value);
    }

//<< Attributes

}
