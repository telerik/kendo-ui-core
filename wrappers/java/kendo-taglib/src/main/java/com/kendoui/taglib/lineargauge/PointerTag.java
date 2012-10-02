
package com.kendoui.taglib.lineargauge;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PointerTag extends BaseTag /* interfaces */implements Border, Track/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Pointer parent = (Pointer)findParentWithClass(Pointer.class);

        parent.setPointer(this);

        return EVAL_PAGE;
    }

    @Override
    public void setBorder(BorderTag value) {
        setProperty("border", value);
    }

    @Override
    public void setTrack(TrackTag value) {
        setProperty("track", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public int getMargin() {
        return (int)getProperty("margin");
    }

    public void setMargin(int value) {
        setProperty("margin", value);
    }

    public int getOpacity() {
        return (int)getProperty("opacity");
    }

    public void setOpacity(int value) {
        setProperty("opacity", value);
    }

    public String getShape() {
        return (String)getProperty("shape");
    }

    public void setShape(String value) {
        setProperty("shape", value);
    }

    public int getSize() {
        return (int)getProperty("size");
    }

    public void setSize(int value) {
        setProperty("size", value);
    }

    public int getValue() {
        return (int)getProperty("value");
    }

    public void setValue(int value) {
        setProperty("value", value);
    }

//<< Attributes
}
