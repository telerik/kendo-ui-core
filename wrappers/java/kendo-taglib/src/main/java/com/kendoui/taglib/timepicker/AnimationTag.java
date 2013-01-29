
package com.kendoui.taglib.timepicker;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.TimePickerTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        TimePickerTag parent = (TimePickerTag)findParentWithClass(TimePickerTag.class);


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
        return "timePicker-animation";
    }

    public void setClose(com.kendoui.taglib.timepicker.AnimationCloseTag value) {
        setProperty("close", value);
    }

    public void setOpen(com.kendoui.taglib.timepicker.AnimationOpenTag value) {
        setProperty("open", value);
    }

//<< Attributes

}
