
package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LegendTag extends BaseTag /* interfaces */implements Border, Labels/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Legend parent = (Legend)findParentWithClass(Legend.class);

        parent.setLegend(this);

        return EVAL_PAGE;
    }

    @Override
    public void setBorder(BorderTag value) {
        setProperty("border", value);
    }

    @Override
    public void setLabels(LabelsTag value) {
        setProperty("labels", value);
    }

    public String getBackground() {
        return (String)getProperty("background");
    }

    public void setBackground(String value) {
        setProperty("background", value);
    }

    public int getOffsetX() {
        return (int)getProperty("offsetX");
    }

    public void setOffsetX(int value) {
        setProperty("offsetX", value);
    }

    public int getOffsetY() {
        return (int)getProperty("offsetY");
    }

    public void setOffsetY(int value) {
        setProperty("offsetY", value);
    }

    public String getPosition() {
        return (String)getProperty("position");
    }

    public void setPosition(String value) {
        setProperty("position", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

//<< Attributes
}
