
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class OverlayTag extends BaseTag /* interfaces *//* interfaces */ {

//>> Attributes

    @Override
    public int doEndTag() throws JspException {
        Overlay parent = (Overlay)findParentWithClass(Overlay.class);

        parent.setOverlay(this);

        return super.doEndTag();
    }

    public String getGradient() {
        return (String)getProperty("gradient");
    }

    public void setGradient(String value) {
        setProperty("gradient", value);
    }

//<< Attributes
}
