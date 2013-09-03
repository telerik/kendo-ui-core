
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

    public void setCrosshair(com.kendoui.taglib.chart.XAxisItemCrosshairTag value) {
        setProperty("crosshair", value);
    }

    public void setLabels(com.kendoui.taglib.chart.XAxisItemLabelsTag value) {
        setProperty("labels", value);
    }

    public void setLine(com.kendoui.taglib.chart.XAxisItemLineTag value) {
        setProperty("line", value);
    }

    public void setMajorGridLines(com.kendoui.taglib.chart.XAxisItemMajorGridLinesTag value) {
        setProperty("majorGridLines", value);
    }

    public void setMajorTicks(com.kendoui.taglib.chart.XAxisItemMajorTicksTag value) {
        setProperty("majorTicks", value);
    }

    public void setNotes(com.kendoui.taglib.chart.XAxisItemNotesTag value) {
        setProperty("notes", value);
    }

    public void setPlotBands(XAxisItemPlotBandsTag value) {

        setProperty("plotBands", value.plotBands());

    }

    public void setTitle(com.kendoui.taglib.chart.XAxisItemTitleTag value) {
        setProperty("title", value);
    }

    public java.lang.Object getAxisCrossingValue() {
        return (java.lang.Object)getProperty("axisCrossingValue");
    }

    public void setAxisCrossingValue(java.lang.Object value) {
        setProperty("axisCrossingValue", value);
    }

    public java.lang.String getBaseUnit() {
        return (java.lang.String)getProperty("baseUnit");
    }

    public void setBaseUnit(java.lang.String value) {
        setProperty("baseUnit", value);
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public float getMajorUnit() {
        return (float)getProperty("majorUnit");
    }

    public void setMajorUnit(float value) {
        setProperty("majorUnit", value);
    }

    public java.lang.Object getMax() {
        return (java.lang.Object)getProperty("max");
    }

    public void setMax(java.lang.Object value) {
        setProperty("max", value);
    }

    public java.lang.Object getMin() {
        return (java.lang.Object)getProperty("min");
    }

    public void setMin(java.lang.Object value) {
        setProperty("min", value);
    }

    public float getMinorUnit() {
        return (float)getProperty("minorUnit");
    }

    public void setMinorUnit(float value) {
        setProperty("minorUnit", value);
    }

    public java.lang.Object getName() {
        return (java.lang.Object)getProperty("name");
    }

    public void setName(java.lang.Object value) {
        setProperty("name", value);
    }

    public boolean getNarrowRange() {
        return (boolean)getProperty("narrowRange");
    }

    public void setNarrowRange(boolean value) {
        setProperty("narrowRange", value);
    }

    public java.lang.String getPane() {
        return (java.lang.String)getProperty("pane");
    }

    public void setPane(java.lang.String value) {
        setProperty("pane", value);
    }

    public boolean getReverse() {
        return (boolean)getProperty("reverse");
    }

    public void setReverse(boolean value) {
        setProperty("reverse", value);
    }

    public float getStartAngle() {
        return (float)getProperty("startAngle");
    }

    public void setStartAngle(float value) {
        setProperty("startAngle", value);
    }

    public java.lang.String getType() {
        return (java.lang.String)getProperty("type");
    }

    public void setType(java.lang.String value) {
        setProperty("type", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

//<< Attributes

}
