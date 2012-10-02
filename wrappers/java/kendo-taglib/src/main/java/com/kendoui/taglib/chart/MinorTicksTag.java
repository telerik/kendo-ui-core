
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MinorTicksTag extends BaseTag /* interfaces *//* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        MinorTicks parent = (MinorTicks)findParentWithClass(MinorTicks.class);

        parent.setMinorTicks(this);

        return EVAL_PAGE;
    }

    public int getSize() {
        return (int)getProperty("size");
    }

    public void setSize(int value) {
        setProperty("size", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

//<< Attributes
}
