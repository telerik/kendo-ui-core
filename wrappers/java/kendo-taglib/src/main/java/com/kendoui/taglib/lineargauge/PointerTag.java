
package com.kendoui.taglib.lineargauge;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.LinearGaugeTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PointerTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LinearGaugeTag parent = (LinearGaugeTag)findParentWithClass(LinearGaugeTag.class);


        parent.setPointer(this);

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
        return "linearGauge-pointer";
    }

    public void setBorder(com.kendoui.taglib.lineargauge.PointerBorderTag value) {
        setProperty("border", value);
    }

    public void setTrack(com.kendoui.taglib.lineargauge.PointerTrackTag value) {
        setProperty("track", value);
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public java.lang.Object getMargin() {
        return (java.lang.Object)getProperty("margin");
    }

    public void setMargin(java.lang.Object value) {
        setProperty("margin", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

    public java.lang.String getShape() {
        return (java.lang.String)getProperty("shape");
    }

    public void setShape(java.lang.String value) {
        setProperty("shape", value);
    }

    public float getSize() {
        return (float)getProperty("size");
    }

    public void setSize(float value) {
        setProperty("size", value);
    }

    public float getValue() {
        return (float)getProperty("value");
    }

    public void setValue(float value) {
        setProperty("value", value);
    }

//<< Attributes

}
