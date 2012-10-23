
package com.kendoui.taglib.slider;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.SliderTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SlideFunctionTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SliderTag parent = (SliderTag)findParentWithClass(SliderTag.class);


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
        return "slider-slide";
    }

//<< Attributes

}
