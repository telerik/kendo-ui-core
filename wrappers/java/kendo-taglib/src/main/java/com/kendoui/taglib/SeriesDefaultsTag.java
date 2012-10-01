
package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesDefaultsTag extends BaseTag /* interfaces */implements Border, Labels, Tooltip/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        SeriesDefaults parent = (SeriesDefaults)findParentWithClass(SeriesDefaults.class);

        parent.setSeriesDefaults(this);

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

    @Override
    public void setTooltip(TooltipTag value) {
        setProperty("tooltip", value);
    }

    public int getGap() {
        return (int)getProperty("gap");
    }

    public void setGap(int value) {
        setProperty("gap", value);
    }

    public int getSpacing() {
        return (int)getProperty("spacing");
    }

    public void setSpacing(int value) {
        setProperty("spacing", value);
    }

    public boolean getStack() {
        return (boolean)getProperty("stack");
    }

    public void setStack(boolean value) {
        setProperty("stack", value);
    }

//<< Attributes
}
