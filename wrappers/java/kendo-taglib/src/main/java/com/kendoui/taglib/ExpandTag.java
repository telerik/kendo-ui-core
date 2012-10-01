
package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ExpandTag extends BaseTag /* interfaces *//* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Expand parent = (Expand)findParentWithClass(Expand.class);

        parent.setExpand(this);

        return EVAL_PAGE;
    }

    public int getDuration() {
        return (int)getProperty("duration");
    }

    public void setDuration(int value) {
        setProperty("duration", value);
    }

    public String getEffects() {
        return (String)getProperty("effects");
    }

    public void setEffects(String value) {
        setProperty("effects", value);
    }

    public boolean getShow() {
        return (boolean)getProperty("show");
    }

    public void setShow(boolean value) {
        setProperty("show", value);
    }

//<< Attributes
}
