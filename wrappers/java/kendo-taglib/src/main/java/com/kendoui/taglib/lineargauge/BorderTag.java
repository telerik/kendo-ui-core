
package com.kendoui.taglib.lineargauge;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class BorderTag extends BaseTag /* interfaces *//* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Border parent = (Border)findParentWithClass(Border.class);

        parent.setBorder(this);

        return super.doEndTag();
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public String getDashType() {
        return (String)getProperty("dashType");
    }

    public void setDashType(String value) {
        setProperty("dashType", value);
    }

    public int getWidth() {
        return (int)getProperty("width");
    }

    public void setWidth(int value) {
        setProperty("width", value);
    }

//<< Attributes
}
