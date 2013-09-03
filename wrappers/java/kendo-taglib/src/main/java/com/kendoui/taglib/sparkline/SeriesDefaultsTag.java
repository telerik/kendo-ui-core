
package com.kendoui.taglib.sparkline;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.SparklineTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesDefaultsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SparklineTag parent = (SparklineTag)findParentWithClass(SparklineTag.class);


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
        return "sparkline-seriesDefaults";
    }

    public void setBorder(com.kendoui.taglib.sparkline.SeriesDefaultsBorderTag value) {
        setProperty("border", value);
    }

    public void setLabels(com.kendoui.taglib.sparkline.SeriesDefaultsLabelsTag value) {
        setProperty("labels", value);
    }

    public void setTooltip(com.kendoui.taglib.sparkline.SeriesDefaultsTooltipTag value) {
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

//<< Attributes

}
