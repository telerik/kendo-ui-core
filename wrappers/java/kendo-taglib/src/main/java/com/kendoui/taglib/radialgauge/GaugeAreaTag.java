
package com.kendoui.taglib.radialgauge;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.RadialGaugeTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GaugeAreaTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        RadialGaugeTag parent = (RadialGaugeTag)findParentWithClass(RadialGaugeTag.class);


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
        return "radialGauge-gaugeArea";
    }

    public void setBorder(com.kendoui.taglib.radialgauge.GaugeAreaBorderTag value) {
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

    public Object getMargin() {
        return (Object)getProperty("margin");
    }

    public void setMargin(Object value) {
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
