
package com.kendoui.taglib.lineargauge;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PointerTag extends BaseTag /* interfaces */implements Border, Track/* interfaces */ {

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Pointer parent = (Pointer)findParentWithClass(Pointer.class);

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

    @Override
    public void setBorder(BorderTag value) {
        setProperty("border", value.properties());
    }

    @Override
    public void setTrack(TrackTag value) {
        setProperty("track", value.properties());
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public float getMargin() {
        return (float)getProperty("margin");
    }

    public void setMargin(float value) {
        setProperty("margin", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

    public String getShape() {
        return (String)getProperty("shape");
    }

    public void setShape(String value) {
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
