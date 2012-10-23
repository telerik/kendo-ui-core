
package com.kendoui.taglib.rangeslider;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.RangeSliderTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SlideFunctionTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        RangeSliderTag parent = (RangeSliderTag)findParentWithClass(RangeSliderTag.class);


        parent.setSlide(this);

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
        return "rangeSlider-slide";
    }

//<< Attributes

}
