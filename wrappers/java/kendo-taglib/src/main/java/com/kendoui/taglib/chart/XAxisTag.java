
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class XAxisTag extends BaseTag /* interfaces */implements Labels/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        XAxis parent = (XAxis)findParentWithClass(XAxis.class);

        parent.setXAxis(this);

        return EVAL_PAGE;
    }

    @Override
    public void setLabels(LabelsTag value) {
        setProperty("labels", value);
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

    public int getMajorUnit() {
        return (int)getProperty("majorUnit");
    }

    public void setMajorUnit(int value) {
        setProperty("majorUnit", value);
    }

    public int getMinorUnit() {
        return (int)getProperty("minorUnit");
    }

    public void setMinorUnit(int value) {
        setProperty("minorUnit", value);
    }

    public int get() {
        return (int)getProperty("");
    }

    public void set(int value) {
        setProperty("", value);
    }

//<< Attributes
}
