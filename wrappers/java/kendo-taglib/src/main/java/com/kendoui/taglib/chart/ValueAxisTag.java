
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ValueAxisTag extends BaseTag /* interfaces */implements Labels, Line, MajorGridLines, MajorTicks, MinorGridLines, MinorTicks, Title/* interfaces */ {

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ValueAxis parent = (ValueAxis)findParentWithClass(ValueAxis.class);

        parent.setValueAxis(this);

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
        return "chart-valueAxis";
    }

    @Override
    public void setLabels(LabelsTag value) {
        setProperty("labels", value.properties());
    }

    @Override
    public void setLine(LineTag value) {
        setProperty("line", value.properties());
    }

    @Override
    public void setMajorGridLines(MajorGridLinesTag value) {
        setProperty("majorgridlines", value.properties());
    }

    @Override
    public void setMajorTicks(MajorTicksTag value) {
        setProperty("majorticks", value.properties());
    }

    @Override
    public void setMinorGridLines(MinorGridLinesTag value) {
        setProperty("minorgridlines", value.properties());
    }

    @Override
    public void setMinorTicks(MinorTicksTag value) {
        setProperty("minorticks", value.properties());
    }

    @Override
    public void setTitle(TitleTag value) {
        setProperty("title", value.properties());
    }

    public float getAxisCrossingValue() {
        return (float)getProperty("axisCrossingValue");
    }

    public void setAxisCrossingValue(float value) {
        setProperty("axisCrossingValue", value);
    }

    public Object getAxisCrossingValues() {
        return (Object)getProperty("axisCrossingValues");
    }

    public void setAxisCrossingValues(Object value) {
        setProperty("axisCrossingValues", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
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

    public Object getPlotBands() {
        return (Object)getProperty("plotBands");
    }

    public void setPlotBands(Object value) {
        setProperty("plotBands", value);
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
