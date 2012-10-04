
package com.kendoui.taglib.radialgauge;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GaugeAreaTag extends BaseTag /* interfaces */implements Border/* interfaces */ {

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        GaugeArea parent = (GaugeArea)findParentWithClass(GaugeArea.class);

        parent.setGaugeArea(this);

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
    public void setBorder(BorderTag value) {
        setProperty("border", value.properties());
    }

    public int getHeight() {
        return (int)getProperty("height");
    }

    public void setHeight(int value) {
        setProperty("height", value);
    }

    public int getMargin() {
        return (int)getProperty("margin");
    }

    public void setMargin(int value) {
        setProperty("margin", value);
    }

    public int getWidth() {
        return (int)getProperty("width");
    }

    public void setWidth(int value) {
        setProperty("width", value);
    }

//<< Attributes

}
