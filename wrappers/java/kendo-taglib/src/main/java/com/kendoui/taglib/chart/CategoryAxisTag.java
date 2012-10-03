
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CategoryAxisTag extends BaseTag /* interfaces */implements Labels, Line, MajorGridLines, MajorTicks, MinorGridLines, MinorTicks, Title/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        CategoryAxis parent = (CategoryAxis)findParentWithClass(CategoryAxis.class);

        parent.setCategoryAxis(this);

        return EVAL_PAGE;
    }

    @Override
    public void setLabels(LabelsTag value) {
        setProperty("labels", value);
    }

    @Override
    public void setLine(LineTag value) {
        setProperty("line", value);
    }

    @Override
    public void setMajorGridLines(MajorGridLinesTag value) {
        setProperty("majorgridlines", value);
    }

    @Override
    public void setMajorTicks(MajorTicksTag value) {
        setProperty("majorticks", value);
    }

    @Override
    public void setMinorGridLines(MinorGridLinesTag value) {
        setProperty("minorgridlines", value);
    }

    @Override
    public void setMinorTicks(MinorTicksTag value) {
        setProperty("minorticks", value);
    }

    @Override
    public void setTitle(TitleTag value) {
        setProperty("title", value);
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

    public String getField() {
        return (String)getProperty("field");
    }

    public void setField(String value) {
        setProperty("field", value);
    }

    public boolean getJustified() {
        return (boolean)getProperty("justified");
    }

    public void setJustified(boolean value) {
        setProperty("justified", value);
    }

    public boolean getReverse() {
        return (boolean)getProperty("reverse");
    }

    public void setReverse(boolean value) {
        setProperty("reverse", value);
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

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

//<< Attributes
}
