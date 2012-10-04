
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ConnectorsTag extends BaseTag /* interfaces *//* interfaces */ {

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Connectors parent = (Connectors)findParentWithClass(Connectors.class);

        parent.setConnectors(this);

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
