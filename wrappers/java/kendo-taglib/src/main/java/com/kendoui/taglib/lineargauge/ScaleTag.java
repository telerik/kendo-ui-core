
package com.kendoui.taglib.lineargauge;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ScaleTag extends BaseTag /* interfaces */implements Labels, MajorTicks, MinorTicks/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Scale parent = (Scale)findParentWithClass(Scale.class);

        parent.setScale(this);

        return super.doEndTag();
    }

    @Override
    public void setLabels(LabelsTag value) {
        setProperty("labels", value.properties());
    }

    @Override
    public void setMajorTicks(MajorTicksTag value) {
        setProperty("majorticks", value.properties());
    }

    @Override
    public void setMinorTicks(MinorTicksTag value) {
        setProperty("minorticks", value.properties());
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

    public boolean getMirror() {
        return (boolean)getProperty("mirror");
    }

    public void setMirror(boolean value) {
        setProperty("mirror", value);
    }

    public boolean getReverse() {
        return (boolean)getProperty("reverse");
    }

    public void setReverse(boolean value) {
        setProperty("reverse", value);
    }

    public boolean getVertical() {
        return (boolean)getProperty("vertical");
    }

    public void setVertical(boolean value) {
        setProperty("vertical", value);
    }

//<< Attributes
}
