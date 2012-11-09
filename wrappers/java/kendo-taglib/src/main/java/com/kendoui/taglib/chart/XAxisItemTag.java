
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class XAxisItemTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        XAxisTag parent = (XAxisTag)findParentWithClass(XAxisTag.class);

        parent.addXAxisItem(this);

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
        return "chart-xAxisItem";
    }

    public void setLabels(XAxisItemLabelsTag value) {
        setProperty("labels", value);
    }

    public void setLine(XAxisItemLineTag value) {
        setProperty("line", value);
    }

    public void setMajorGridLines(XAxisItemMajorGridLinesTag value) {
        setProperty("majorGridLines", value);
    }

    public void setMajorTicks(XAxisItemMajorTicksTag value) {
        setProperty("majorTicks", value);
    }

    public void setPlotBands(XAxisItemPlotBandsTag value) {

        setProperty("plotBands", value.plotBands());

    }

    public void setTitle(XAxisItemTitleTag value) {
        setProperty("title", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

    public String getBaseUnit() {
        return (String)getProperty("baseUnit");
    }

    public void setBaseUnit(String value) {
        setProperty("baseUnit", value);
    }

    public float getMajorUnit() {
        return (float)getProperty("majorUnit");
    }

    public void setMajorUnit(float value) {
        setProperty("majorUnit", value);
    }

    public Object getMax() {
        return (Object)getProperty("max");
    }

    public void setMax(Object value) {
        setProperty("max", value);
    }

    public Object getMin() {
        return (Object)getProperty("min");
    }

    public void setMin(Object value) {
        setProperty("min", value);
    }

    public float getMinorUnit() {
        return (float)getProperty("minorUnit");
    }

    public void setMinorUnit(float value) {
        setProperty("minorUnit", value);
    }

    public Object getName() {
        return (Object)getProperty("name");
    }

    public void setName(Object value) {
        setProperty("name", value);
    }

    public boolean getReverse() {
        return (boolean)getProperty("reverse");
    }

    public void setReverse(boolean value) {
        setProperty("reverse", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

    public Object getAxisCrossingValue() {
        return (Object)getProperty("axisCrossingValue");
    }

    public void setAxisCrossingValue(Object value) {
        setProperty("axisCrossingValue", value);
    }

//<< Attributes

}
