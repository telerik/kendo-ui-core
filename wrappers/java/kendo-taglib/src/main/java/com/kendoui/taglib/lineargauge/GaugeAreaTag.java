
package com.kendoui.taglib.lineargauge;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.LinearGaugeTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GaugeAreaTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LinearGaugeTag parent = (LinearGaugeTag)findParentWithClass(LinearGaugeTag.class);


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

    public static String tagName() {
        return "linearGauge-gaugeArea";
    }

    public void setBorder(BorderTag value) {
        setProperty("border", value);
    }

    public Object getBackground() {
        return (Object)getProperty("background");
    }

    public void setBackground(Object value) {
        setProperty("background", value);
    }

    public float getHeight() {
        return (float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
    }

    public float getMargin() {
        return (float)getProperty("margin");
    }

    public void setMargin(float value) {
        setProperty("margin", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

//<< Attributes

}
