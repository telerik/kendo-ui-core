
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class XAxisTag extends BaseTag /* interfaces */implements Labels/* interfaces */ {

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        XAxis parent = (XAxis)findParentWithClass(XAxis.class);

        parent.setXAxis(this);

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

    @Override
    public void setLabels(LabelsTag value) {
        setProperty("labels", value.properties());
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
