
package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConnectorsTag extends BaseTag /* interfaces *//* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Connectors parent = (Connectors)findParentWithClass(Connectors.class);

        parent.setConnectors(this);

        return EVAL_PAGE;
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public int getPadding() {
        return (int)getProperty("padding");
    }

    public void setPadding(int value) {
        setProperty("padding", value);
    }

    public int getWidth() {
        return (int)getProperty("width");
    }

    public void setWidth(int value) {
        setProperty("width", value);
    }

//<< Attributes
}
