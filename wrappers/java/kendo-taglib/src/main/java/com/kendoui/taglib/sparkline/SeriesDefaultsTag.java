
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

    public Object getArea() {
        return (Object)getProperty("area");
    }

    public void setArea(Object value) {
        setProperty("area", value);
    }

    public Object getBar() {
        return (Object)getProperty("bar");
    }

    public void setBar(Object value) {
        setProperty("bar", value);
    }

    public Object getColumn() {
        return (Object)getProperty("column");
    }

    public void setColumn(Object value) {
        setProperty("column", value);
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
