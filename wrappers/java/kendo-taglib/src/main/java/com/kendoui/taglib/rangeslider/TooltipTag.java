
package com.kendoui.taglib.rangeslider;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.RangeSliderTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TooltipTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        RangeSliderTag parent = (RangeSliderTag)findParentWithClass(RangeSliderTag.class);


        parent.setTooltip(this);

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
        return "rangeSlider-tooltip";
    }

    public boolean getEnabled() {
        return (boolean)getProperty("enabled");
    }

    public void setEnabled(boolean value) {
        setProperty("enabled", value);
    }

    public java.lang.String getFormat() {
        return (java.lang.String)getProperty("format");
    }

    public void setFormat(java.lang.String value) {
        setProperty("format", value);
    }

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

//<< Attributes

}
