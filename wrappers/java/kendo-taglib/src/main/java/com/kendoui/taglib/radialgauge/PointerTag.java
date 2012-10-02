
package com.kendoui.taglib.radialgauge;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PointerTag extends BaseTag /* interfaces */implements Cap/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Pointer parent = (Pointer)findParentWithClass(Pointer.class);

        parent.setPointer(this);

        return EVAL_PAGE;
    }

    @Override
    public void setCap(CapTag value) {
        setProperty("cap", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public int getValue() {
        return (int)getProperty("value");
    }

    public void setValue(int value) {
        setProperty("value", value);
    }

//<< Attributes
}
