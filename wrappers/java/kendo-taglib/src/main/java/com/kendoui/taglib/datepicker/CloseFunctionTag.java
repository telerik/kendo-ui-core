
package com.kendoui.taglib.datepicker;

import com.kendoui.taglib.FunctionTag;

import com.kendoui.taglib.DatePickerTag;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CloseFunctionTag extends FunctionTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DatePickerTag parent = (DatePickerTag)findParentWithClass(DatePickerTag.class);


        parent.setClose(this);

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
        return "datePicker-close";
    }

//<< Attributes

}
