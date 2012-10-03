
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ValueAxisTag extends BaseTag /* interfaces */implements Labels, Line, MajorGridLines, MajorTicks, MinorGridLines, MinorTicks, Title/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        ValueAxis parent = (ValueAxis)findParentWithClass(ValueAxis.class);

        parent.setValueAxis(this);

        return super.doEndTag();
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

    public int getAxisCrossingValue() {
        return (int)getProperty("axisCrossingValue");
    }

    public void setAxisCrossingValue(int value) {
        setProperty("axisCrossingValue", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public int getMajorUnit() {
        return (int)getProperty("majorUnit");
    }

    public void setMajorUnit(int value) {
        setProperty("majorUnit", value);
    }

    public int getMax() {
        return (int)getProperty("max");
    }

    public void setMax(int value) {
        setProperty("max", value);
    }

    public int getMin() {
        return (int)getProperty("min");
    }

    public void setMin(int value) {
        setProperty("min", value);
    }

    public int getMinorUnit() {
        return (int)getProperty("minorUnit");
    }

    public void setMinorUnit(int value) {
        setProperty("minorUnit", value);
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
