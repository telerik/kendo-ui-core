
package com.kendoui.taglib.lineargauge;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TrackTag extends BaseTag /* interfaces */implements Border/* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Track parent = (Track)findParentWithClass(Track.class);

        parent.setTrack(this);

        return super.doEndTag();
    }

    @Override
    public void setBorder(BorderTag value) {
        setProperty("border", value.properties());
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public int getOpacity() {
        return (int)getProperty("opacity");
    }

    public void setOpacity(int value) {
        setProperty("opacity", value);
    }

    public int getSize() {
        return (int)getProperty("size");
    }

    public void setSize(int value) {
        setProperty("size", value);
    }

    public boolean getVisible() {
        return (boolean)getProperty("visible");
    }

    public void setVisible(boolean value) {
        setProperty("visible", value);
    }

//<< Attributes
}
