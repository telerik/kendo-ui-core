
package com.kendoui.taglib.datepicker;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.DatePickerTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DatePickerTag parent = (DatePickerTag)findParentWithClass(DatePickerTag.class);


        parent.setAnimation(this);

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
        return "datePicker-animation";
    }

    public void setClose(com.kendoui.taglib.datepicker.AnimationCloseTag value) {
        setProperty("close", value);
    }

    public void setOpen(com.kendoui.taglib.datepicker.AnimationOpenTag value) {
        setProperty("open", value);
    }

//<< Attributes

}
