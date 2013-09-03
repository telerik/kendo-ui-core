
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ValueAxisItemTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ValueAxisTag parent = (ValueAxisTag)findParentWithClass(ValueAxisTag.class);

        parent.addValueAxisItem(this);

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
        return "chart-valueAxisItem";
    }

    public void setCrosshair(com.kendoui.taglib.chart.ValueAxisItemCrosshairTag value) {
        setProperty("crosshair", value);
    }

    public void setLabels(com.kendoui.taglib.chart.ValueAxisItemLabelsTag value) {
        setProperty("labels", value);
    }

    public void setLine(com.kendoui.taglib.chart.ValueAxisItemLineTag value) {
        setProperty("line", value);
    }

    public void setMajorGridLines(com.kendoui.taglib.chart.ValueAxisItemMajorGridLinesTag value) {
        setProperty("majorGridLines", value);
    }

    public void setMajorTicks(com.kendoui.taglib.chart.ValueAxisItemMajorTicksTag value) {
        setProperty("majorTicks", value);
    }

    public void setMinorGridLines(com.kendoui.taglib.chart.ValueAxisItemMinorGridLinesTag value) {
        setProperty("minorGridLines", value);
    }

    public void setMinorTicks(com.kendoui.taglib.chart.ValueAxisItemMinorTicksTag value) {
        setProperty("minorTicks", value);
    }

    public void setNotes(com.kendoui.taglib.chart.ValueAxisItemNotesTag value) {
        setProperty("notes", value);
    }

    public void setPlotBands(ValueAxisItemPlotBandsTag value) {

        setProperty("plotBands", value.plotBands());

    }

    public void setTitle(com.kendoui.taglib.chart.ValueAxisItemTitleTag value) {
        setProperty("title", value);
    }

    public java.lang.Object getAxisCrossingValue() {
        return (java.lang.Object)getProperty("axisCrossingValue");
    }

    public void setAxisCrossingValue(java.lang.Object value) {
        setProperty("axisCrossingValue", value);
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

    public float getMax() {
        return (float)getProperty("max");
    }

    public void setMax(float value) {
        setProperty("max", value);
    }

    public float getMin() {
        return (float)getProperty("min");
    }

    public void setMin(float value) {
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

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

//<< Attributes

}
